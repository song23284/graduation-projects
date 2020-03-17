const db=firebase.firestore();
const table=document.querySelector('#tbresult');
const form=document.querySelector('#addForm');



function sd(){
  const level = $('#level').val();
  console.log(level)

  document.querySelector('#tbresult').innerHTML=(`    <table class="table table-dark" id="tbresult">
  <tbody id="tbody" >
 <tr class="gogo">
    <th></th>
    <th>Operand1</th>
    <th>Operandadd</th>
    <th>Operand2</th>
    <th>equal</th>
    <th>Answer</th>
    <th></th>
  </tr>
  </tbody>

</table>
  `
  );


var query = firebase.database().ref("exercise/subtraction/compare").child(level).orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      // clearTable(childSnapshot)
      console.log(childData)
      showdata(childSnapshot);
  });
});

}

function showdata(childSnapshot){


var row=table.insertRow(1);      
var cell1=row.insertCell(0);
var cell2=row.insertCell(1);
var cell3=row.insertCell(2);
var cell4=row.insertCell(3);
var cell5=row.insertCell(4);
var cell6=row.insertCell(5);
var cell7=row.insertCell(6);

var sd=JSON.stringify(childSnapshot.val().Question);
 
 row.setAttribute('class', 'jojo');
 cell2.innerHTML=childSnapshot.val().Question.Operand1;
 cell4.innerHTML=childSnapshot.val().Question.Operand2;
 cell3.innerHTML=childSnapshot.val().Question.Operansubtation;

cell5.innerHTML=childSnapshot.val().Question.equal;
cell6.innerHTML=childSnapshot.val().Answer;
let btn=document.createElement('button');
btn.textContent='ลบ';
btn.setAttribute('class','btn btn-danger');
btn.setAttribute('data-id',childSnapshot.key);
cell7.appendChild(btn);

btn.addEventListener('click',(e)=>{
  const level = $('#level').val();

  var firebaseRef = firebase.database().ref("exercise/subtraction/compare").child(level);
  console.log(childSnapshot.key)
  var uid = childSnapshot.key ;
 
  firebaseRef.child(uid).remove()
  .then(res => {
      self.location.reload();

      console.log('Deleted', res);
  })
  .catch(err => console.error(err));
})
}

// function clearTable(childSnapshot)
// { 
//   document.getElementsByClassName('jojo').innerHTML="";
  
//   setTimeout( showdata(childSnapshot), 500);
 
// }
