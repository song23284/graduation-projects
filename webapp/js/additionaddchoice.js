function saveOnClick() {
	var exampleInputex = document.getElementById('exampleInputex');
	var Operand1 = document.getElementById('Operand1');
	var Operandadd = document.getElementById('Operandadd');
	var Operand2 = document.getElementById('Operand2');
	var Answer = document.getElementById('Answer');
	var Choice1 = document.getElementById('Choice1');
	var Choice2 = document.getElementById('Choice2');
	var Choice3 = document.getElementById('Choice3');
	var Choice4 = document.getElementById('Choice4');

	var level = document.getElementById('level').value;

	insertData(
		exampleInputex.value,
		Operand1.value,
		Operandadd.value,
		Operand2.value,
		Answer.value,
		Choice1.value,
		Choice2.value,
		Choice3.value,
		Choice4.value,
		level
	);

	// var firebaseRef=firebase.database().ref();
	// firebaseRef.child("admin").set("ROOT"); //crete chile
	// firebaseRef.child("admin2/fname").set("ROOT");
}
window.onload = function() {
	showData();
};
function showData() {
	var firebaseRef = firebase.database().ref('exercise');
	firebaseRef.once('value').then(function(dataSnapshot) {
		dataSnapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			//var childData = childSnapshot.val();
			//console.log(childKey);
			console.log(childKey);
		});
		//console.log(dataSnapshot.val());
	});

	var rootRef = firebase.database().ref('exercise/additionchoice').child('add1');
	rootRef.on('child_added', (snap) => {
		var exampleInputex = snap.child('exampleInputex').val();
		var Operand1 = snap.child('Operand1').val();
		var Operandadd = snap.child('Operandadd').val();
		var Operand2 = snap.child('Operand2').val();
		var Answer = snap.child('Answer').val();
		var Choice1 = snap.child('Choice1').val();
		var Choice2 = snap.child('Choice2').val();
		var Choice3 = snap.child('Choice3').val();
		var Choice4 = snap.child('Choice4').val();

		$('#list_data').append(
			'<button type="button" class="list-group-item list-group-item-action">' +
				+'<div class="row">' +
				'<div class="col">' +
				+'<div id="3">' +
				exampleInputex +
				Operand1 +
				Operandadd +
				Operand2 +
				Answer +
				Choice1 +
				Choice2 +
				Choice3 +
				Choice4 +
				'</div>' +
				'</div>' +
				'<div class="col-md-auto">' +
				'</div>' +
				'<div class="col col-lg-2" style=" text-align: right; ">' +
				'<i class="material-icons ">' +
				edit +
				'</i>' +
				'</div>' +
				'</div>' +
				'</button>'
		);
	});

	/*
<button type="button" class="list-group-item list-group-item-action">
              
                <div class="row">
                    <div class="col">
                        <div id="3">
                         //แสดงข้อมูล
                              </div>
                    </div>
                    <div class="col-md-auto">
                    
                    </div>
                    <div class="col col-lg-2" style=" text-align: right; ">
                        <i class="material-icons ">
                            edit
                            </i>
                    </div>
                  </div>
            </button>

 */

	/*
                                firebaseRef.on = ("child_additionchoice", snap => {
                                    var Answer = snap.child("Answer").val();
                                    var Choice1 = snap.child("Choice1").val();
                                    $("#table_text").append("<tr><td>" + Answer + "</tr><td>" + Choice1 +
                                    "</td></td></td></tr>");
                                });
                                */
}

function insertData(exampleInputex, Operand1, Operandadd, Operand2, Answer, Choice1, Choice2, Choice3, Choice4, level) {
	var firebaseRef = firebase.database().ref('exercise/addition/multiplechoice').child(level);
	firebaseRef.push({
		exampleInputex: exampleInputex,
		Question: {
			Operand1: Operand1,
			Operandadd: '+',
			Operand2: Operand2
		},
		Answer: Answer,
		Choice: [ Choice1, Choice2, Choice3, Choice4 ]
	});
	console.log('insert success');
}

/*
function() {
    const Level = $("#disabledSelect").val();
    const Unit = $("#selunit").val();
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        firebase.database().ref('Vocabulary').child(Level).child(Unit).push({
            Vocab: $("#Addvocab").val(),
            url: downloadURL,
            Meaning: $("#Addmeaning").val()
        });
    console.log('File available at', downloadURL);
    console.log("Upload Successful!");
    });
}*/
