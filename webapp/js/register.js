function saveData(){
    console.log("insert Success 0.1");
    
    var firstname = document.getElementById('fname');
    var email = document.getElementById('email');
    // var phonenumber = document.getElementById('tel');
    // var level = document.getElementById('level');
    var password = document.getElementById('pass');
    // var confirmpassword = document.getElementById('conpass');
    
    signup();
    insertData(firstname.value,email.value,
        password.value)
       
    
 setTimeout('Redirect()', 1000);
        
};

function insertData(fname,email,pass){
 
    var firebaseRef = firebase.database().ref("user");
    firebaseRef.push({
        name : fname,
        email : email,
        password : pass,
        status : "teacher"
    });
    console.log("insert Success");
   
    
   
    // initApp();
    console.log("done");
};




function signup(){
    console.log("insert Success 0.999");
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
        
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password'){
            alert('The password is too weak');
        }else{ 
            alert(errorMessage);
            return;
        }
        console.log(error);
    });
};

 
     
 function Redirect()
 {
    window.location="index.html";
 }
 
 
    
    
     
   

 