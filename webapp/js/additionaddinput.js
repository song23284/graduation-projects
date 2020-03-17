function saveOnClick() {
	var exampleInputex = document.getElementById('exampleInputex');
	var Operand1 = document.getElementById('Operand1');
	var Operandadd = document.getElementById('Operandadd');
	var Operand2 = document.getElementById('Operand2');
	var Answer = document.getElementById('Answer');

	var level = document.getElementById('level').value;

	insertData(exampleInputex.value, Operand1.value, Operandadd.value, Operand2.value, Answer.value, level);
}
window.onload = function() {
	showData();
};

function insertData(exampleInputex, Operand1, Operandadd, Operand2, Answer, level) {
	var firebaseRef = firebase.database().ref('exercise/addition/input').child(level);
	firebaseRef.push({
		exampleInputex: exampleInputex,
		Question: {
			Operand1: Operand1,
			Operandadd: '+',
			Operand2: Operand2
		},
		Answer: Answer
	});
	console.log('insert success');
}

window.onload = function() {
	showData();
};
function showData() {
	var firebaseRef = firebase.database().ref('exercise');
	firebaseRef.once('value').then(function(dataSnapshot) {
		dataSnapshot.forEach(function(childSnapshot) {
			//var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			//console.log(childKey);
			console.log(childData);
		});
		//console.log(dataSnapshot.val());
	});
}
