function saveOnClick() {
	var exampleInputex = document.getElementById('exampleInputex');
	var Operand1 = document.getElementById('Operand1');
	var Answer = document.getElementById('Answer');
	var Operand2 = document.getElementById('Operand2');
	var Choice1 = document.getElementById('Choice1').value;
	var Choice2 = document.getElementById('Choice2').value;
	var Choice3 = document.getElementById('Choice3').value;

	var level = document.getElementById('level').value;
	insertData(exampleInputex.value, Operand1.value, Answer.value, Operand2.value, Choice1, Choice2, Choice3, level);
}
window.onload = function() {
	showData();
};
function showData() {
	var firebaseRef = firebase.database().ref('exercise');
	firebaseRef.once('value').then(function(dataSnapshot) {
		dataSnapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			console.log(childKey);
		});
	});
}

function insertData(exampleInputex, Operand1, Answer, Operand2, Choice1, Choice2, Choice3, level) {
	var firebaseRef = firebase.database().ref('exercise/compare/multiplechoice').child(level);
	firebaseRef.push({
		exampleInputex: exampleInputex,
		Question: {
			Operand1: Operand1,
			Answer: Answer,
			Operand2: Operand2
		},
		Choice: [ Choice1, Choice2, Choice3 ]
	});
	console.log('insert success');
}
