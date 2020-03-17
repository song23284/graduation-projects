const db = firebase.firestore();
const table = document.querySelector('#tbresult');
const form = document.querySelector('#addForm');
var loop =[]

db.collection('user').get().then((snapshot) => {
  snapshot.forEach(doc => {
    // console.log(doc.data())
    // showdata(doc);//ดึงข้อมูลมาเเล้วส่งไปที่ฟังชั่น showdata
  });
});

window.onload = function () {
  //  var firebaseRef=firebase.database().ref("users");
  //  firebaseRef.once('value').then(function(dataSnapshot){
  // console.log(dataSnapshot.val())
  // showdata(dataSnapshot);
  //  });
  var query = firebase.database().ref("user").orderByChild('status').equalTo('student');
  query.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childSnapshot.val())
        loop.push([childSnapshot.val()]);
        console.log(loop)

        showdata(childSnapshot);
      });
    });
}










form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('user').add({
    name: form.name.value,
    age: form.age.value,
    city: form.city.value
  });
  form.name.value = '';
  form.age.value = '';
  form.city.value = '';

  setTimeout('Redirect()', 500);
});

//ฟังชั้นเอาข้อมูลไปโชว์บนตาราง
function showdata(childSnapshot) {
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = childSnapshot.val().name;
  // cell4.innerHTML=childSnapshot.val().phonenumber;
  // cell3.innerHTML=childSnapshot.val().level;
  cell2.innerHTML = childSnapshot.val().email;
  let btn = document.createElement('button');

  btn.textContent = 'ลบสมาชิก';
  btn.setAttribute('class', 'btn btn-danger');
  btn.setAttribute('data-id', childSnapshot.key);
  cell5.appendChild(btn);

  btn.addEventListener('click', (e) => {
    var firebaseRef = firebase.database().ref("users/-L_SdYKNKcZ4xwPZUrve/users");
    var uid = childSnapshot.key;
    firebaseRef.child(uid).remove()
      .then(res => {
        console.log('Deleted', res);
      })
      .catch(err => console.error(err));
  })

  let btn2 = document.createElement('button');
  btn2.textContent = 'ดูคะเเนน';
  btn2.setAttribute('class', 'btn btn-info');
  btn2.setAttribute('data-toggle', 'modal');
  btn2.setAttribute('data-target', '.bd-example-modal-lg');
  btn2.setAttribute('data-id', childSnapshot.val().name);
  cell4.appendChild(btn2);

  btn2.addEventListener('click', (e) => {
    console.log(childSnapshot.val().name)
    var uid = childSnapshot.val().name
    var addition = firebase.database().ref("score/level1/addition").orderByChild('user').equalTo(uid);
    var compare = firebase.database().ref("score/level1/compare").orderByChild('user').equalTo(uid);
    var counter = firebase.database().ref("score/level1/counter").orderByChild('user').equalTo(uid);
    var divide = firebase.database().ref("score/level1/divide").orderByChild('user').equalTo(uid);
    var minus = firebase.database().ref("score/level1/minus").orderByChild('user').equalTo(uid);
    var multiplies = firebase.database().ref("score/level1/multiplies").orderByChild('user').equalTo(uid);
    var problem = firebase.database().ref("score/level1/problem").orderByChild('user').equalTo(uid);
    var relation = firebase.database().ref("score/level1/relation").orderByChild('user').equalTo(uid);
    add()
    function add() {

      var addition = firebase.database().ref("score/level1/addition").orderByChild('user').equalTo(uid);
      addition.once("value").then(function (snapshot4) {
        snapshot4.forEach(function (childSnapshot5) {
          document.getElementById("addition").innerHTML = childSnapshot5.val().score;

          addition1 = childSnapshot5.val().score;

        });
      });

    }


    compare.once("value").then(function (snapshot4) {
      snapshot4.forEach(function (childSnapshot5) {
        document.getElementById("compare").innerHTML = childSnapshot5.val().score;
        compare1 = childSnapshot5.val().score;

      });
    });

    counter.once("value").then(function (snapshot4) {
      snapshot4.forEach(function (childSnapshot5) {
        document.getElementById("counter").innerHTML = childSnapshot5.val().score;
        counter1 = childSnapshot5.val().score;

      });
    });
    divide.once("value").then(function (snapshot4) {
      snapshot4.forEach(function (childSnapshot5) {
        document.getElementById("divide").innerHTML = childSnapshot5.val().score;
        divide1 = childSnapshot5.val().score;
      });
    });
    minus.once("value").then(function (snapshot4) {
      snapshot4.forEach(function (childSnapshot5) {
        document.getElementById("minus").innerHTML = childSnapshot5.val().score;
        minus1 = childSnapshot5.val().score;

      });
    });
    multiplies.once("value").then(function (snapshot4) {
      snapshot4.forEach(function (childSnapshot5) {
        document.getElementById("multiplies").innerHTML = childSnapshot5.val().score;
        multiplies1 = childSnapshot5.val().score;

      });
    });

    problem.once("value").then(function (snapshot4) {
      snapshot4.forEach(function (childSnapshot5) {
        document.getElementById("problem").innerHTML = childSnapshot5.val().score;
        problem1 = childSnapshot5.val().score;

      });
    });
    relation.once("value").then(function (snapshot4) {
      snapshot4.forEach(function (childSnapshot5) {
        document.getElementById("relation").innerHTML = childSnapshot5.val().score;
        var relation1 = childSnapshot5.val().score
        drawChart(relation1)
      });
    });
    google.charts.load('current', { packages: ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart(relation1) {
      console.log(addition1)

      var item = [['ประเภทเเบบฝึกหัด', 'จำนวนคะเเนน']]
      item.push(['relation', relation1],

        ['addition', addition1],
        ['compare', compare1],
        ['counter', counter1],
        ['divide', divide1],
        ['minus', minus1],
        ['multiplies', multiplies1],
        ['problem', problem1]
      );

      var data = google.visualization.arrayToDataTable(item);
      var options = {
        chart: {
          title: 'Score',
          subtitle: 'Score',
        }
      };
      var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
      chart.draw(data, google.charts.Bar.convertOptions(options));


    }


  });






}





$(function () {
  var d = new Date(),
    h = d.getHours(),
    m = d.getMinutes();
  if (h < 10) h = '0' + h;
  if (m < 10) m = '0' + m;
  $('input[type="time"][value="now"]').each(function () {
    $(this).attr({ 'value': h + ':' + m });
  });
});


function Redirect() {
  window.location = "index.html";
}

function add1(){
  console.log("asd")
}

