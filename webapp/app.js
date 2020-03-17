const db = firebase.firestore();
const table = document.querySelector('#tbresult');
const table1 = document.querySelector('#tbresult1');
const table2 = document.querySelector('#tbresult2');

const form = document.querySelector('#addForm');
const modal = document.querySelector('#modal1');

window.onload = function() {
	var query = firebase.database().ref('comment').orderByKey();
	query.once('value').then(function(datasnapshot) {
		datasnapshot.forEach(function(datachildSnapshot) {
			var key = datachildSnapshot.key;
			var childData = datachildSnapshot.val();
			console.log(datachildSnapshot.val())
		

   
			showdata(datachildSnapshot); //ดึงข้อมูลมาเเล้วส่งไปที่ฟังชั่น showdata


		});
	});
};

//ปุ่มส่งcomment
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   db.collection('user').add({
//     name: form.name.value,

//   });
//   form.name.value = '';

//   setTimeout('Redirect()', 500);
// });

//ฟังชั้นเอาข้อมูลไปโชว์บนตาราง
function showdata(datachildSnapshot) {
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);

	cell1.innerHTML = datachildSnapshot.val().sender;
	cell2.innerHTML = datachildSnapshot.val().comment;
	cell3.innerHTML = datachildSnapshot.val().time+' '+datachildSnapshot.val().Date;
	let btn = document.createElement('button');

	btn.textContent = 'ตอบกลับ';
	btn.setAttribute('class', 'btn btn-danger');
	btn.setAttribute('data-toggle', 'modal');
	btn.setAttribute('data-target', '.bd-example-modal-lg');
	btn.setAttribute('data-id', datachildSnapshot.key);
	cell4.appendChild(btn);
	// let div1 = document.createElement('div')
	// div1.setAttribute('class',"modal fade bd-example-modal-lg");
	// div1.setAttribute('tabindex',"-1");
	// div1.setAttribute('role',"dialog");
	// div1.setAttribute('aria-labelledby',"myLargeModalLabel");
	// div1.setAttribute('aria-hidden',"modal fade bd-example-modal-lg");

	btn.addEventListener('click', (e) => {
		var uid = datachildSnapshot.key;
		
		showdata1(uid);
		showdata3(uid);
		
	});
}

function showdata1(uid) {
	var uid1 = uid;
	var firebaseRef = firebase.database().ref('comment').child(uid);
	firebaseRef.once('value').then(function(datadataSnapshot) {
		showdata2(datadataSnapshot);
		function showdata2(datachildSnapshot) {
			var row = table1.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			cell2.innerHTML = datachildSnapshot.val().comment;
			cell1.innerHTML = datachildSnapshot.val().sender;
		//   cell3.innerHTML = datachildSnapshot.val().time+datachildSnapshot.val().Date;

			var time = new Date();
			var time1=("0" + time.getHours()).slice(-2)   + ":" + 
			("0" + time.getMinutes()).slice(-2) + ":" + 
			("0" + time.getSeconds()).slice(-2);
			// var row = table2.insertRow(-1);
			// var cell1 = row.insertCell(0);
			// cell1.innerHTML = childSnapshot.val().reply.childData;
			let btn = document.createElement('button');
			btn.textContent = 'ส่ง';
			btn.setAttribute('class', 'btn btn-danger');
			btn.setAttribute('data-toggle', 'modal');
			btn.setAttribute('data-target', '.bd-example-modal-lg');
			btn.setAttribute('data-id', datachildSnapshot.key);
			document.getElementById('bbtn').appendChild(btn);
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				// console.log(user.key)
				
				var firebaseRef = firebase.database().ref('comment');
				console.log(datachildSnapshot.key);
				var uid = datachildSnapshot.key;
				var time = new Date();
				var time1 = ("0" + time.getHours()).slice(-2)   + ":" + 
    ("0" + time.getMinutes()).slice(-2) + ":" + 
    ("0" + time.getSeconds()).slice(-2);
				console.log(time1)
				firebaseRef
					.child(uid)
					.child('reply')
					.push({
						name: form.name.value,
						data:form.data.value,
						time:time1
					})
					.then((res) => {
						form.name.value = '';
						// self.location.reload();
					})
					.catch((err) => console.error(err));
			});
		}
	});
}

function showdata3(uid) {
	var uid = uid;
	var query = firebase.database().ref('comment').child(uid).child('reply').orderByKey();
	query.once('value').then(function(datasnapshot) {
		datasnapshot.forEach(function(datachildSnapshot) {
			// key will be "ada" the first time and "alan" the second time
			var key = datachildSnapshot.key;
			// childData will be the actual contents of the child
			var childData = datachildSnapshot.val();
			console.log(datachildSnapshot.val());
			showdata4(datachildSnapshot); //ดึงข้อมูลมาเเล้วส่งไปที่ฟังชั่น showdata
		});
	});
	function showdata4(datachildSnapshot) {
		var row = table2.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		cell1.innerHTML = datachildSnapshot.val().name;

		cell2.innerHTML = datachildSnapshot.val().data;
		// cell3.innerHTML = datachildSnapshot.val().time+' PM';

		resetTable(row);
	}
}

// $(function () {
//   var d = new Date(),
//     h = d.getHours(),
//     m = d.getMinutes();
//   if (h < 10) h = '0' + h;
//   if (m < 10) m = '0' + m;
//   $('input[type="time"][value="now"]').each(function () {
//     $(this).attr({ 'value': h + ':' + m });
//   });
// });

// function Redirect() {
//   window.location = "index.html";
// }
function resetTable() {
	// table1.innerHTML = originalHTML;
	// table2.innerHTML = originalHTML;
}
