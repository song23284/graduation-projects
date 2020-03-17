


var loop = []

window.onload = function () {

  var queryadd = firebase.database().ref("averageScore/select/addition").limitToLast(1);
  var querycouter = firebase.database().ref("averageScore/select/couter").limitToLast(1);
  var querymultiplication = firebase.database().ref("averageScore/select/multiplication").limitToLast(1);
  var querysubtraction = firebase.database().ref("averageScore/select/subtraction").limitToLast(1);
  var querycompare = firebase.database().ref("averageScore/select/compare").limitToLast(1);
  var querydivide = firebase.database().ref("averageScore/select/divide").limitToLast(1);
  var querypattern = firebase.database().ref("averageScore/select/pattern").limitToLast(1);
  var queryproblem = firebase.database().ref("averageScore/select/problem").limitToLast(1);



  queryadd.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val().avrscore)
        addition = childSnapshot.val().avrscore;
       
      });
    });
    querycouter.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val().avrscore)
        couter = childSnapshot.val().avrscore;
      });
    });
    querymultiplication.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val().avrscore)
        multiplication = childSnapshot.val().avrscore;
      });
    });
    querysubtraction.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val().avrscore)
        subtraction = childSnapshot.val().avrscore;
      });
    });
    querycompare.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val().avrscore)
        compare = childSnapshot.val().avrscore;
      });
    });
    querydivide.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val().avrscore)
        divide = childSnapshot.val().avrscore;
      });
    });

    querypattern.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val().avrscore)
        pattern = childSnapshot.val().avrscore;
      });
    });

    queryproblem.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val().avrscore)
        problem = childSnapshot.val().avrscore;
        google.charts.load("current", { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
      });
  
    });
    














}








function drawChart() {


  console.log("sdasd")
  var data = google.visualization.arrayToDataTable([
    ["Element", "", { role: "style" }],
    ['การนับ', couter, 'red'],
    ['การบวก', addition, 'gold'],
    ['การลบ', subtraction, 'green'],
    ['การคูณ', multiplication, 'blue'],
    ['การหาร', divide, 'black'],
    ['การเปรียบเทียบ', compare, 'pink'],
    ['ความสัมพันธ์', pattern, 'magenta'],
    ['โจทย์ปัญหา', problem, 'sliver']
  ]);

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
    {
      calc: "stringify",
      sourceColumn: 1,
      type: "string",
      role: "annotation"
    },
    2]);

  var options = {
    title: 'คะเเนนเฉลี่ย',
    subtitle: 'คะเเนนเฉลี่ย',


  };
  var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
  chart.draw(view, options);

  google.visualization.events.addListener(chart, 'select', selectHandler);
  function selectHandler(e) {
    var selection = chart.getSelection();
    var item = selection[0].row
    console.log(item)


    if (item == 0) {
      window.location = "stucouter.html";
    } else if (item == 1) {
      window.location = "stuadd.html";
    } else if (item == 2) {
      window.location = "stusub.html";
    } else if (item == 3) {
      window.location = "stumul.html";
    } else if (item == 4) {
      window.location = "studiv.html";
    } else if (item == 5) {
      window.location = "stucom.html";
    } else if (item == 6) {
      window.location = "stupatt.html";
    } else if (item == 7) {
      window.location = "stupro.html";
    }
  }

}

