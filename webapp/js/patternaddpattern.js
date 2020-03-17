var selectedFile;
var selectedFile1;
var selectedFile2;

$('#fileEx').on('change', function(event) {
	selectedFile = event.target.files[0];
	//$("#uploadButton").show();
});
$('#fileChoice1').on('change', function(event) {
	selectedFile1 = event.target.files[0];
	//$("#uploadButton").show();
});
$('#fileChoice2').on('change', function(event) {
	selectedFile2 = event.target.files[0];
	//$("#uploadButton").show();
});

function handleFileSelect(event) {
	//$(".upload-group").show();
	selectedFile = event.target.files[0];
	selectedFile1 = event.target.files[0];
	selectedFile2 = event.target.files[0];
}

//$('#uploadButton').click(() =>
$('#uploadButton').click(() => {
	event.preventDefault();
	// Create a root reference
	var filename = selectedFile.name;
	var filename1 = selectedFile1.name;
	var filename2 = selectedFile2.name;
	var storageRef = firebase.storage().ref('/Images/' + filename);
	var storageRef1 = firebase.storage().ref('/Images/' + filename1);
	var storageRef2 = firebase.storage().ref('/Images/' + filename2);
	var fileRef = storageRef.child(filename);
	var uploadTask = storageRef.put(selectedFile);
	var uploadTask1 = storageRef1.put(selectedFile1);
	var uploadTask2 = storageRef2.put(selectedFile2);

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
			uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				uploadTask1.snapshot.ref.getDownloadURL().then(function(downloadURL1) {
					uploadTask2.snapshot.ref.getDownloadURL().then(function(downloadURL2) {
						firebase.database().ref('exercise/pattern').push({
							exampleInputex: $('#exampleInputex').val(),
							fileEx: downloadURL,
							Choice: [ downloadURL1, downloadURL2 ],
							patternchoice: $('#patternchoice').val()
						});
					});
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
