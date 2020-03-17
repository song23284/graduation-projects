function saveOnClick() {
	var exampleInputex = document.getElementById('exampleInputex');
	var Operand1 = document.getElementById('Operand1');
	var Operand = document.getElementById('Operand');
	var Operand2 = document.getElementById('Operand2');
	var status = document.getElementById('status');

	var level = document.getElementById('level').value;
	insertData(exampleInputex.value, Operand1.value, Operand.value, Operand2.value, status.value, level);
}
function insertData(exampleInputex, Operand1, Operand, Operand2, status, level) {
	var firebaseRef = firebase.database().ref('exercise/compare/compare').child(level);
	firebaseRef.push({
		exampleInputex: exampleInputex,
		Question: {
			Operand1: Operand1,
			Operand: Operand,
			Operand2: Operand2
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
