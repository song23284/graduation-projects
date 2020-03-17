google.charts.load('current', { packages: [ 'bar' ] });
google.charts.setOnLoadCallback(drawChart);
var item = [ [ 'การเปรียบเทียบ', 'score' ] ];
function drawChart() {
	const id = $('#id').val();
	console.log(id)
	var query = firebase.database().ref('score/level1').child(id).orderByKey();
	query.once('value').then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.val().score;
			var score = childSnapshot.val().user;
			var childData = childSnapshot.val();
			//   console.log(childSnapshot.val().score )
			//   console.log(childSnapshot)
			item.push( [ score, key ] );
			console.log(item);
			drawChart1(key, score, childSnapshot);
		});
	});
	function drawChart1() {
		
		// var item =[ ['Element','Percent',{role:'annotation'},{role:'style'}]]

		
		var data = google.visualization.arrayToDataTable(item);

		var options = {
			chart: {
				title: 'Score',
				subtitle: 'Score'
			}
		};

		var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

		chart.draw(data, google.charts.Bar.convertOptions(options));
	}
}

// function drawChart() {

//     var firebaseRef = firebase.database().ref("score/level1/addition").orderByKey();
// 	firebaseRef.once('value').then(function(datadataSnapshot) {

//         console.log(datadataSnapshot.val() )
//         // console.log(datadataSnapshot)
//         drawChart1(datadataSnapshot)

//     }

// );
// function drawChart1(datadataSnapshot) {
// var item =[ ]
// // var item =[ ['Element','Percent',{role:'annotation'},{role:'style'}]]

// item.push([ datadataSnapshot.val()])

//  console.log(item)
//   var data = google.visualization.arrayToDataTable(item);

//   var options = {
//     chart: {
//       title: 'Score',
//       subtitle: 'Score',
//     }
//   };

//   var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

//   chart.draw(data, google.charts.Bar.convertOptions(options));
// }}
