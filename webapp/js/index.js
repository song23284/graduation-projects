


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;
    if (user != null) {
      var email = user.email;
      console.log(email)
      showdata(email)
    }

  } else {
    console.log("No user");
    window.location="index.html";

  }
});




function showdata(email) {
  const emailuser = email
  console.log(emailuser)

  var firebaseRef = firebase.database().ref("user").orderByChild('email').equalTo(emailuser);
  // firebaseRef.once('value').then(function (dataSnapshot) {

  //   console.log(dataSnapshot.val().email)


  // showdata2(dataSnapshot);


  // })

  var query = firebase.database().ref("comment").orderByKey();
  firebaseRef.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // console.log(childSnapshot.key)

        var childData = childSnapshot.val();
        // console.log(childSnapshot.val())
        showprofile(childSnapshot); //ดึงข้อมูลมาเเล้วส่งไปที่ฟังชั่น showdata
    

      });
    });


}

function showprofile(childSnapshot) {
  console.log(childSnapshot.val())
  
  //  var pro=pro.value;
  //  pro.innerHTML = childSnapshot.val();

  // document.getElementById("name0").innerHTML = childSnapshot.val().firstname;
  document.getElementById("name2").innerHTML = childSnapshot.val().name;

  // document.getElementById("email0").innerHTML = childSnapshot.val().email;
  // document.getElementById("tel0").innerHTML = childSnapshot.val().phonenumber;

  document.getElementById('name').value=childSnapshot.val().name;
  document.getElementById('tel').value=childSnapshot.val().phonenumber;
  document.getElementById('email').value=childSnapshot.val().email;
  document.getElementById('password').value=childSnapshot.val().password;
  document.getElementById('add').value=childSnapshot.val().Address;
  document.getElementById('school').value=childSnapshot.val().school;
  document.getElementById('class').value=childSnapshot.val().class;
  document.getElementById('room').value=childSnapshot.val().room;


  let btn=document.createElement('button');
btn.textContent='อัพเดทข้อมูล';
btn.setAttribute('class','btn btn-danger');
btn.setAttribute('data-id',childSnapshot.key);
bbtn.appendChild(btn);

btn.addEventListener('click',(e)=>{
    // db.collection('user').add({
    //     name:form.name.value,
    //     age:form.age.value,
    //     city:form.city.value
    // });
    const form=document.querySelector('#addForm');

    var keyuser = childSnapshot.key
    console.log(keyuser)
    var firebaseRef = firebase.database().ref("user");
    firebaseRef.child(keyuser).update({
        name : form.name.value,
    
        email : form.email.value,
        phonenumber : form.tel.value,
        password : form.pass.value,
        Address : form.add.value,
        school : form.school.value,
        class : form.select.value,
        room : form.room.value



        
       
    });
    
    console.log("done");
    self.location.reload();
   


})


  update(childSnapshot)



  
};

function update(childSnapshot){
  event.preventDefault();
  console.log(childSnapshot.key)
  const keyuser = childSnapshot.key
  

  

}




function logout() {

  event.preventDefault();
  firebase.auth().signOut().then(function () {
    window.location = 'index.html';
  }).catch(function (error) {
    console.log(error);
  });

}


