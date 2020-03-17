function saveOnClick() {
	var exampleInputex = document.getElementById('exampleInputex');
	var Operand1 = document.getElementById('Operand1');
	var Operanddivide = document.getElementById('Operanddivide');
	var Operand2 = document.getElementById('Operand2');
	var Answer = document.getElementById('Answer');

	var level = document.getElementById('level').value;
	var status = document.getElementById('status');

	insertData(
		exampleInputex.value,
		Operand1.value,
		Operanddivide.value,
		Operand2.value,
		Answer.value,
		level,
		status.value
	);
}
window.onload = function() {
	showData();
};

function insertData(exampleInputex, Operand1, Operanddivide, Operand2, Answer, level, status) {
	var firebaseRef = firebase.database().ref('exercise/divide/compare').child(level);
	firebaseRef.push({
		exampleInputex: exampleInputex,
		Question: {
			Operand1: Operand1,
			Operanddivide: '÷',
			Operand2: Operand2,
			equal: Answer
		},
		Answer: status
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
