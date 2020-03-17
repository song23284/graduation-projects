var selectedFile;

$('#fileEx').on('change', function(event) {
	selectedFile = event.target.files[0];
	//$("#uploadButton").show();
});

function handleFileSelect(event) {
	//$(".upload-group").show();
	selectedFile = event.target.files[0];
}

//$('#uploadButton').click(() =>
$('#uploadButton').click(() => {
	event.preventDefault();
	// Create a root reference
	var filename = selectedFile.name;
	var storageRef = firebase.storage().ref('/Images/' + filename);
	var fileRef = storageRef.child(filename);
	var uploadTask = storageRef.put(selectedFile);

	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on(
		'state_changed',
		function(snapshot) {
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused');
					break;
				case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running');
					break;
			}
		},
		function(error) {
			// Handle unsuccessful uploads
		},
		function() {
			const level = $('#level').val();
			uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				firebase.database().ref('exercise/couter/multiplechoice').child(level).push({
					exampleInputex: $('#exampleInputex').val(),
					Choice: [ $('#Choice1').val(), $('#Choice2').val(), $('#Choice3').val(), $('#Choice4').val() ],
					answer: $('#answer').val(),
					url: downloadURL
				});
				console.log('File available at', downloadURL);
				console.log('Upload Successful!');
			});
		}
	);
});

// window.onload = function() {
// 	showData();
// };

/*function insertData(patternchoice, exampleInputex, downloadURL, downloadURL1, downloadURL2) {
	var firebaseRef = firebase.database().ref('exercise/pattern');
	firebaseRef.push({
		exampleInputex: exampleInputex,
		Question: {
			fileEx: downloadURL
		},
		Answer: patternchoice,
		choice: {
			fileChoice1: downloadURL1,
			fileChoice2: downloadURL2
		}
	});

	// console.log('File available at', downloadURL);
	console.log('Upload Successful!');
	console.log('insert success');
}*/
