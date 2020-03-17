function saveOnClick() {
	var exampleInputex = document.getElementById('exampleInputex');

	var patternchoice = document.getElementById('patternchoice');

	var uploader = document.getElementById('uploader');
	var uploader1 = document.getElementById('uploader1');
	var uploader2 = document.getElementById('uploader2');
	var fileEx = document.getElementById('fileEx');
	var fileChoice1 = document.getElementById('fileChoice1');
	var fileChoice2 = document.getElementById('fileChoice2');

	fileEx.addEventListener('change');
	var fileEx = e.target.files[0];
	//create a storage ref
	var storageRef = firebase.storage().ref('folder_name/' + file.name).put(fileEx);
	//upload file
	storageRef.on(
		'state_changed',
		function progress(snapshot) {
			var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
			uploader.value = percentage;
		},
		function error(err) {},
		function complete() {}
	);
	var downloadURL = storageRef.snapshot.downloadURL;
	fileChoice1.addEventListener('change');
	var fileChoice1 = e.target.files[0];
	//create a storage ref
	var storageRef1 = firebase.storage().ref('folder_name/' + file.name).put(fileChoice1);
	//upload file
	storageRef1.on(
		'state_changed',
		function progress(snapshot) {
			var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
			uploader1.value = percentage;
		},
		function error(err) {},
		function complete() {}
	);
	var downloadURL1 = storageRef1.snapshot.downloadURL;
	fileChoice2.addEventListener('change');
	var fileChoice2 = e.target.files[0];
	//create a storage ref
	var storageRef2 = firebase.storage().ref('folder_name/' + file.name).put(fileChoice2);

	//update progress bar
	storageRef2.on(
		'state_changed',
		function progress(snapshot) {
			var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
			uploader2.value = percentage;
		},
		function error(err) {},
		function complete() {}
	);
	var downloadURL2 = storageRef2.snapshot.downloadURL;
	insertData(
		storageRef,
		storageRef1,
		storageRef2,
		patternchoice,
		exampleInputex,
		downloadURL,
		downloadURL1,
		downloadURL2
	);
}

// window.onload = function() {
// 	showData();
// };

function insertData(
	storageRef,
	storageRef1,
	storageRef2,
	patternchoice,
	exampleInputex,
	downloadURL,
	downloadURL1,
	downloadURL2
) {
	storageRef.snapshot.ref.getDownloadURL().then(function(downloadURL) {
		storageRef1.snapshot.ref.getDownloadURL().then(function(downloadURL1) {
			storageRef2.snapshot.ref.getDownloadURL().then(function(downloadURL2) {
				firebase.database().ref('exercise/pattern').push({
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
			});
		});
	});

	// console.log('File available at', downloadURL);
	console.log('Upload Successful!');
	console.log('insert success');
}
