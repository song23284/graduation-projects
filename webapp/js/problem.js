function saveOnClick() {
	var exampleInputex = document.getElementById('exampleInputex');
	var Answer = document.getElementById('Answer');

	var level = document.getElementById('level').value;

	insertData(exampleInputex.value, Answer.value, level);
}
window.onload = function() {
	showData();
};

function insertData(exampleInputex, Answer, level) {
	var firebaseRef = firebase.database().ref('exercise/problem/input').child(level);
	firebaseRef.push({
		Question: exampleInputex,
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
