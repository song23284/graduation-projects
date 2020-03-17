const db=firebase.firestore();
const table=document.querySelector('#tbresult');
const form=document.querySelector('#addForm');
db.collection('user').get().then((snapshot)=>{
 snapshot.forEach(doc=>{
    
 });
});

window.onload=function(){

var query = firebase.database().ref("exercise/pattern/multiplechoice/level1").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childData)
      showdata(childSnapshot);
  });
});

}



function showdata(childSnapshot){
var row=table.insertRow(-1);      
var cell1=row.insertCell(0);
var cell2=row.insertCell(1);
var cell3=row.insertCell(2);
var cell4=row.insertCell(3);
var cell5=row.insertCell(4);
var cell6=row.insertCell(5);
var cell7=row.insertCell(6);

var sd=JSON.stringify(childSnapshot.val().Question);
var x=childSnapshot.val().Choice
console.log(x[1])

cell1.innerHTML=   "<img src="  +  childSnapshot.val().fileEx+   "  width=300 height=250    >  "   ;
//  cell2.innerHTML=childSnapshot.val().Question.Operand1;
//  cell4.innerHTML=childSnapshot.val().fileEx;
// cell3.setAttribute('style','width:50%');
// cell4.setAttribute('style','width:50%');

 cell3.innerHTML=    "  <img src="  +  x[1] +   "     width=100 height=80 > "  ;
 cell2.innerHTML=    "  <img src="  +  x[0] +   "     width=100 height=80 > "  ;

 

 cell6.innerHTML=childSnapshot.val().patternchoice;
// cell6.innerHTML=childSnapshot.val().fileEx;
let btn=document.createElement('button');
btn.textContent='ลบ';
btn.setAttribute('class','btn btn-danger');
btn.setAttribute('data-id',childSnapshot.key);
cell7.appendChild(btn);

btn.addEventListener('click',(e)=>{
  var firebaseRef = firebase.database().ref("exercise/pattern/multiplechoice/level1");
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
