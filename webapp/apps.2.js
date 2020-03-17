
const table = document.querySelector('#tbresult');
const form = document.querySelector('#addForm');
var loop =[]


window.onload = function () {
  
  var query = firebase.database().ref("user").orderByChild('status').equalTo('student');
  query.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childSnapshot.val())
        loop.push([childSnapshot.val()]);
        console.log(loop)

        showdata(childSnapshot);
      });
    });
}





//ฟังชั้นเอาข้อมูลไปโชว์บนตาราง
function showdata(childSnapshot) {
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = childSnapshot.val().name;

  cell2.innerHTML = childSnapshot.val().email;
  let btn = document.createElement('button');

  btn.textContent = 'ลบสมาชิก';
  btn.setAttribute('class', 'btn btn-danger');
  btn.setAttribute('data-id', childSnapshot.key);
  cell5.appendChild(btn);

  btn.addEventListener('click', (e) => {
    var firebaseRef = firebase.database().ref("users/-L_SdYKNKcZ4xwPZUrve/users");
    var uid = childSnapshot.key;
    firebaseRef.child(uid).remove()
      .then(res => {
        console.log('Deleted', res);
      })
      .catch(err => console.error(err));
  })

  let btn2 = document.createElement('button');
  btn2.textContent = 'ดูคะเเนน';
  btn2.setAttribute('class', 'btn btn-info');
  btn2.setAttribute('data-toggle', 'modal');
  btn2.setAttribute('data-target', '.bd-example-modal-lg');
  btn2.setAttribute('data-id', childSnapshot.val().name);
  cell4.appendChild(btn2);

  btn2.addEventListener('click', (e) => {
    console.log(childSnapshot.val().name)
     uid = childSnapshot.val().name
    
    add()
    function add() {
      const ex = $('#ex').val();
        item = [ [ 'การเปรียบเทียบ', 'score' ] ];

      var addition = firebase.database().ref("Score/level1/select").child(ex).orderByChild('user').equalTo(uid);
      addition.once("value").then(function (snapshot4) {
        snapshot4.forEach(function (childSnapshot5) {

          score = childSnapshot5.val().score;
          time = childSnapshot5.val().Date+' '+childSnapshot5.val().time;

          item.push( [ time, score ] );
          google.charts.load("visualization", "1", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);

    
        });
      });

    }


    
    
    function drawChart() {
      console.log(item)


      var data = google.visualization.arrayToDataTable(item);
      var options = {
        chart: {
          title: 'Score',
          subtitle: 'Score',
        }
      };
    
      var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_material'));
      chart.draw(data, options);

   


    }


  });






}





$(function () {
  var d = new Date(),
    h = d.getHours(),
    m = d.getMinutes();
  if (h < 10) h = '0' + h;
  if (m < 10) m = '0' + m;
  $('input[type="time"][value="now"]').each(function () {
    $(this).attr({ 'value': h + ':' + m });
  });
});


function Redirect() {
  window.location = "index.html";
}


function add1(){
  document.querySelector('#columnchart_material').innerHTML=(`   
  <div id="columnchart_material" style="width:100%; height: 500px;"></div>
   
  `
  
  );
   item = [ [ 'การเปรียบเทียบ', 'score' ] ];
   const level = $('#level').val();
   const ex = $('#ex').val();

   console.log(level)
   console.log(ex)


      var addition = firebase.database().ref("Score").child(level).child("select").child(ex).orderByChild('user').equalTo(uid);
      addition.once("value").then(function (snapshot4) {
        snapshot4.forEach(function (childSnapshot5) {

          score = childSnapshot5.val().score;
          time = childSnapshot5.val().Date+' '+childSnapshot5.val().time;

          item.push( [ time, score ] );
          google.charts.load("visualization", "1", {packages:["corechart"]});
          google.charts.setOnLoadCallback(drawChart);
      
        });
      });
      function drawChart() {
        console.log(item)
  
        
        var data = google.visualization.arrayToDataTable(item);
        var options = {
          chart: {
            title: 'Score',
            subtitle: 'Score',
          }
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_material'));
      chart.draw(data, options);
  
  
      }
}

