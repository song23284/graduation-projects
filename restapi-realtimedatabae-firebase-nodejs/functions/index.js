const functions = require('firebase-functions');

// set up ========================


var express = require('express');
var app = express();                              // create our app w/ express
var Firebase = require('firebase');
var morgan = require('morgan');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override');
var multer = require('multer');
var fs = require("fs");
app.use(function (req, res, next) { //allow cross origin requests
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header("Access-Control-Max-Age", "3600");
	res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	next();
});
Firebase.initializeApp({
	databaseURL: "https://mathapp-128.firebaseio.com/",
	serviceAccount: {
		"type": "service_account",
		"project_id": "mathapp-128",
		"private_key_id": "f6a3bf3f6ac39f1e7f10194477d23adec324475f",
		"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOb469zVXs5MXT\nt1AqaBbaLd0EXAaL+Dhc400ywZBJdklBrI78OSAVbCVwBTsxUBjJ2Vth5AhTzUzh\nPFQBD/bvfr7xcu+xIuLzaL7xkXQ2ofjQ6b3OGyl07Np25f2+C7/q74EwixSlreDk\n18rxAWaCLHaGaCFWV7y4pfHOneo+u4VL1j0PhIUeEUVdSKhr2q7oLu7KgSytYrKJ\nqM238rY0NRyrC+3t1wub2ZHynLFbUFRGuLNnSFZARruQfJ8PEUWsvl0dfJzCBn1g\n0BwL3Sddlmmi9zTWO7SlwEyARUSOqAnkWKbbjyyA/mwrVNWcXGJ4yntTLGFLRaOm\nrm+YjX1LAgMBAAECggEAUpjUNiEoViaa+MEJ9E29hwJ+wjXH8M0aUCAqTTqhbqND\nYGGYvFZm/etNd2rAalSv9mNfauWAZ3dnYV9wBRTMKrs9zwG74dYhlF6+t40JQKrC\nEWTUqti3V69FIfmX8yhkW64EtNWRJ1FRAH9PFesHhuIfclvLqu5j9kV/YLpSdVJ+\nRqc6fqTcDycndOoLSGcglFvfefUN+NcGckGKXYyZh0JZcViBAljb6aUn63K7C2cU\nXNiYguN9OgzwPAZKWvF7x/yYb2AKoXsmLp6/i5FSeNpec7cqZOdG5JVazxmyQzYc\ngMCKjqMnTC8Vi0InQWag/S7OKa9zI460k9/KPtbvoQKBgQDuhmrOY0AydBTL14b4\n6fDNff6McHuK+DJglOg0t4lzNdxiFSq1EsTetPv1krbYp9tsTmg4o4JzYh4y1+db\nqX232mndFovIpwWje5uKFhQbXxcl4WZaUafF1VyxqA7QOd1ueHQDUmka7QZnCPrv\nuXszQL5dlULqu5kRPOjf52NKQwKBgQDdj0ywFbscFwFZovPETEDWgUiJ+IGKsCkz\nRNOwB/pJiTa6WqjAKOa6ehkDDcRQ9TK3eBmZccj4WbbzcEFRrW6fwFLlF4NoNjRh\n6a/pZIGpMWRifRLkl6hWzwUWYOgLvkjXxEF4X2fj2wTK3dG9tPnhaUr5tlv+ABqd\n6Hg9IbfkWQKBgQDlhzHWQ0nugyfT9CWs96nChMDjsgYgd7A6onBE8mzxEd5uAAJl\n1pbd3HktGi6blAOhWF4QSr/oen2m3X6EBTi2KBaBKwX+Y0MYy4SkP5S/tiSXTixp\nM3Rn+mZFivweQeCkQoMZAz+jKn1jvw+CihFVA7NsaIrJSRcFsIBDne088wKBgQCy\nwOnDa1Tx3dG2CxWXO1pYdigbQMbrKSOkfJQ6AsW5TJ4+DeT2XEmDC/1gDFxmYN2R\nTrGArl/RlzhXAiuBBWcqNlXrBWR80LbEhHDr4a4G3pW6LGTwzzb/Crl1C6xLxTMp\n+epEftzn5g3gysRsxTWR2oymGa3wqQ7Qdf2EfM7LyQKBgDfv+tbWRffNI+AINOpD\n6q8z/wwTwgHyqEcJ9iOvI5BoEVs7XugdDZCK3RGsQjYRw/LkJxyA9vEzKNS2LObq\nZddw1lvBh9gEqmtCo9JVSGflUfE/56af21d8nw8eZgxLP6CFMotGojhBCKUSnq3Q\ngN1K9URn+dSWzQJo3/kamGtS\n-----END PRIVATE KEY-----\n",
		"client_email": "firebase-adminsdk-65ohn@mathapp-128.iam.gserviceaccount.com",
		"client_id": "115397890901172064024",
		"auth_uri": "https://accounts.google.com/o/oauth2/auth",
		"token_uri": "https://oauth2.googleapis.com/token",
		"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
		"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-65ohn%40mathapp-128.iam.gserviceaccount.com"
	}

	, //this is file that I downloaded from Firebase Console
});
var db = Firebase.database();
var usersRef = db.ref();

//var FirebaseRef = new Firebase("https://testaut-ca5fc.firebaseio.com/");
// configuration
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.get('/', function (req, res) {
	res.send(`
	<link href="https://fonts.googleapis.com/css?family=Quicksand:700" rel="stylesheet">
	<div style="display: flex;flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: 'Quicksand', san-serif;">
  <h1>API สำหรับติดต่อฐานข้อมูล</h1>
  <p> ใส่/get ตามด้วย node ชื่อ nodeที่จะดู เช่น /get/user </p>
  <p> ใส่/post ตามด้วย node ชื่อ nodeที่จะใส่ข้อมูล เช่น /post/user </p>

 
</div>
`)
})


// create user

app.post('/api/createUser', function (req, res) {
	// var userEmail = req.body.user_email;
	var uid = "-LaxTCxO2BNTu1y5CzMS";
	var data = req.body;
	usersRef.child(uid).push(data, function (err) {
		if (err) {
			res.send(err)
		} else {
			// var key = Object.keys(snapshot.val())[0];
			// console.log(key);
			res.json({ message: "Success: User Save.", result: true });
		}
	});
});


app.post('/api/createUser2', function (req, res) {
	// var userEmail = req.body.user_email;
	var data = req.body;
	usersRef.push(data, function (err) {
		if (err) {
			res.send(err)
		} else {
			// var key = Object.keys(snapshot.val())[0];
			// console.log(key);
			res.json({ message: "Success: User Save.", result: true });
		}
	});
});




// update user
app.put('/api/updateUser', function (req, res) {
	var uid = "-LYjg0x4Xpx9-lePriAV";
	var data = req.body;
	usersRef.child(uid).update(data, function (err) {
		if (err) {
			res.send(err);
		} else {
			usersRef.child("uid").once("value", function (snapshot) {
				if (snapshot.val() == null) {
					res.json({ "message": "successfully update data", "result": true, "data": snapshot.val() });
				} else {
					res.json({ "message": "successfully update data", "result": true, "data": snapshot.val() });
				}
			});
		}
	});

});

// delete user
app.delete('/api/removeUser', function (req, res) {
	var uid = "-LZ8DwMDrIHRyU8HqKRN";

	usersRef.child(uid).remove(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: "Success: User deleted.", result: true, });
		}
	})
});

// get users .child(uid) .equalTo(req.params.id).
app.get('/api/getUsers/:id', function (req, res) {

	if (err) {
		res.send(err);
	} else {
		usersRef.orderByChild('ID').equalTo(req.params.id).once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});





// login



//api เรียงตาม node 


//comment ดูcomment กับสร้าง comment



app.get('/get/comment', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('comment').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.post('/post/comment', function (req, res) {
	// var userEmail = req.body.user_email;
	var data = req.body;
	usersRef.child('comment').push(data, function (err) {
		if (err) {
			res.send(err)
		} else {
			// var key = Object.keys(snapshot.val())[0];
			// console.log(key);
			res.json({ message: "Success: User Save.", result: true });
		}
	});
});


//exercise

//add 


app.get('/get/exercise/addition/input/level1', function (req, res, err) {
	usersRef.child('exercise/addition/input/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/input/level2', function (req, res, err) {
	usersRef.child('exercise/addition/input/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/input/level3', function (req, res, err) {
	usersRef.child('exercise/addition/input/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/input/level4', function (req, res, err) {
	usersRef.child('exercise/addition/input/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/input/level5', function (req, res, err) {
	usersRef.child('exercise/addition/input/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/input/level6', function (req, res, err) {
	usersRef.child('exercise/addition/input/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/input/level7', function (req, res, err) {
	usersRef.child('exercise/addition/input/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});



app.get('/get/exercise/addition/compare/level1', function (req, res, err) {
	usersRef.child('exercise/addition/compare/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/compare/level2', function (req, res, err) {
	usersRef.child('exercise/addition/compare/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/compare/level3', function (req, res, err) {
	usersRef.child('exercise/addition/compare/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/compare/level4', function (req, res, err) {
	usersRef.child('exercise/addition/compare/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/compare/level5', function (req, res, err) {
	usersRef.child('exercise/addition/compare/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/compare/level6', function (req, res, err) {
	usersRef.child('exercise/addition/compare/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/compare/level7', function (req, res, err) {
	usersRef.child('exercise/addition/compare/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/addition/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/addition/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/addition/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/addition/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/addition/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/addition/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/addition/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/addition/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});



//couter


app.get('/get/exercise/couter/input/level1', function (req, res, err) {
	usersRef.child('exercise/couter/input/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/input/level2', function (req, res, err) {
	usersRef.child('exercise/couter/input/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/input/level3', function (req, res, err) {
	usersRef.child('exercise/couter/input/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/input/level4', function (req, res, err) {
	usersRef.child('exercise/couter/input/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/input/level5', function (req, res, err) {
	usersRef.child('exercise/couter/input/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/input/level6', function (req, res, err) {
	usersRef.child('exercise/couter/input/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/input/level7', function (req, res, err) {
	usersRef.child('exercise/couter/input/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/couter/compare/level1', function (req, res, err) {
	usersRef.child('exercise/couter/compare/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/compare/level2', function (req, res, err) {
	usersRef.child('exercise/couter/compare/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/compare/level3', function (req, res, err) {
	usersRef.child('exercise/couter/compare/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/compare/level4', function (req, res, err) {
	usersRef.child('exercise/couter/compare/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/compare/level5', function (req, res, err) {
	usersRef.child('exercise/couter/compare/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/compare/level6', function (req, res, err) {
	usersRef.child('exercise/couter/compare/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/compare/level7', function (req, res, err) {
	usersRef.child('exercise/couter/compare/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/couter/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/couter/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/couter/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/couter/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/couter/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/couter/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/couter/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/couter/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




//divide


app.get('/get/exercise/divide/compare/level1', function (req, res, err) {
	usersRef.child('exercise/divide/compare/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/compare/level2', function (req, res, err) {
	usersRef.child('exercise/divide/compare/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/compare/level3', function (req, res, err) {
	usersRef.child('exercise/divide/compare/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/compare/level4', function (req, res, err) {
	usersRef.child('exercise/divide/compare/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/compare/level5', function (req, res, err) {
	usersRef.child('exercise/divide/compare/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/compare/level6', function (req, res, err) {
	usersRef.child('exercise/divide/compare/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/compare/level7', function (req, res, err) {
	usersRef.child('exercise/divide/compare/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/divide/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/divide/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/divide/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/divide/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/divide/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/divide/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/divide/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});



app.get('/get/exercise/divide/input/level1', function (req, res, err) {
	usersRef.child('exercise/divide/input/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/input/level2', function (req, res, err) {
	usersRef.child('exercise/divide/input/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/input/level3', function (req, res, err) {
	usersRef.child('exercise/divide/input/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/input/level4', function (req, res, err) {
	usersRef.child('exercise/divide/input/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/input/level5', function (req, res, err) {
	usersRef.child('exercise/divide/input/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/input/level6', function (req, res, err) {
	usersRef.child('exercise/divide/input/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/divide/input/level7', function (req, res, err) {
	usersRef.child('exercise/divide/input/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});





//multiplication


app.get('/get/exercise/multiplication/compare/level1', function (req, res, err) {
	usersRef.child('exercise/multiplication/compare/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/compare/level2', function (req, res, err) {
	usersRef.child('exercise/multiplication/compare/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/compare/level3', function (req, res, err) {
	usersRef.child('exercise/multiplication/compare/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/compare/level4', function (req, res, err) {
	usersRef.child('exercise/multiplication/compare/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/compare/level5', function (req, res, err) {
	usersRef.child('exercise/multiplication/compare/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/compare/level6', function (req, res, err) {
	usersRef.child('exercise/multiplication/compare/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/compare/level7', function (req, res, err) {
	usersRef.child('exercise/multiplication/compare/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/multiplication/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/multiplication/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/multiplication/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/multiplication/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/multiplication/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/multiplication/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/multiplication/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/multiplication/input/level1', function (req, res, err) {
	usersRef.child('exercise/multiplication/input/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/input/level2', function (req, res, err) {
	usersRef.child('exercise/multiplication/input/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/input/level3', function (req, res, err) {
	usersRef.child('exercise/multiplication/input/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/input/level4', function (req, res, err) {
	usersRef.child('exercise/multiplication/input/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/input/level5', function (req, res, err) {
	usersRef.child('exercise/multiplication/input/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/input/level6', function (req, res, err) {
	usersRef.child('exercise/multiplication/input/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/multiplication/input/level7', function (req, res, err) {
	usersRef.child('exercise/multiplication/input/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});









//pattern


app.get('/get/exercise/pattern/compare/level1', function (req, res, err) {
	usersRef.child('exercise/pattern/compare/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/compare/level2', function (req, res, err) {
	usersRef.child('exercise/pattern/compare/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/compare/level3', function (req, res, err) {
	usersRef.child('exercise/pattern/compare/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/compare/level4', function (req, res, err) {
	usersRef.child('exercise/pattern/compare/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/compare/level5', function (req, res, err) {
	usersRef.child('exercise/pattern/compare/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/compare/level6', function (req, res, err) {
	usersRef.child('exercise/pattern/compare/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/compare/level7', function (req, res, err) {
	usersRef.child('exercise/pattern/compare/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/pattern/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/pattern/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/pattern/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/pattern/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/pattern/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/pattern/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/pattern/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});



app.get('/get/exercise/pattern/input/level1', function (req, res, err) {
	usersRef.child('exercise/pattern/input/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/input/level2', function (req, res, err) {
	usersRef.child('exercise/pattern/input/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/input/level3', function (req, res, err) {
	usersRef.child('exercise/pattern/input/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/input/level4', function (req, res, err) {
	usersRef.child('exercise/pattern/input/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/input/level5', function (req, res, err) {
	usersRef.child('exercise/pattern/input/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/input/level6', function (req, res, err) {
	usersRef.child('exercise/pattern/input/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/pattern/input/level7', function (req, res, err) {
	usersRef.child('exercise/pattern/input/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




//problem


app.get('/get/exercise/problem/compare/level1', function (req, res, err) {
	usersRef.child('exercise/problem/compare/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/compare/level2', function (req, res, err) {
	usersRef.child('exercise/problem/compare/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/compare/level3', function (req, res, err) {
	usersRef.child('exercise/problem/compare/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/compare/level4', function (req, res, err) {
	usersRef.child('exercise/problem/compare/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/compare/level5', function (req, res, err) {
	usersRef.child('exercise/problem/compare/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/compare/level6', function (req, res, err) {
	usersRef.child('exercise/problem/compare/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/compare/level7', function (req, res, err) {
	usersRef.child('exercise/problem/compare/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/problem/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/problem/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/problem/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/problem/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/problem/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/problem/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/problem/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});



app.get('/get/exercise/problem/input/level1', function (req, res, err) {
	usersRef.child('exercise/problem/input/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/input/level2', function (req, res, err) {
	usersRef.child('exercise/problem/input/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/input/level3', function (req, res, err) {
	usersRef.child('exercise/problem/input/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/input/level4', function (req, res, err) {
	usersRef.child('exercise/problem/input/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/input/level5', function (req, res, err) {
	usersRef.child('exercise/problem/input/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/input/level6', function (req, res, err) {
	usersRef.child('exercise/problem/input/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/problem/input/level7', function (req, res, err) {
	usersRef.child('exercise/problem/input/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




//relation


app.get('/get/exercise/relation/compare/level1', function (req, res, err) {
	usersRef.child('exercise/relation/compare/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/compare/level2', function (req, res, err) {
	usersRef.child('exercise/relation/compare/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/compare/level3', function (req, res, err) {
	usersRef.child('exercise/relation/compare/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/compare/level4', function (req, res, err) {
	usersRef.child('exercise/relation/compare/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/compare/level5', function (req, res, err) {
	usersRef.child('exercise/relation/compare/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/compare/level6', function (req, res, err) {
	usersRef.child('exercise/relation/compare/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/compare/level7', function (req, res, err) {
	usersRef.child('exercise/relation/compare/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/relation/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/relation/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/relation/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/relation/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/relation/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/relation/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/relation/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});



app.get('/get/exercise/relation/input/level1', function (req, res, err) {
	usersRef.child('exercise/relation/input/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/input/level2', function (req, res, err) {
	usersRef.child('exercise/relation/input/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/input/level3', function (req, res, err) {
	usersRef.child('exercise/relation/input/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/input/level4', function (req, res, err) {
	usersRef.child('exercise/relation/input/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/input/level5', function (req, res, err) {
	usersRef.child('exercise/relation/input/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/input/level6', function (req, res, err) {
	usersRef.child('exercise/relation/input/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/relation/input/level7', function (req, res, err) {
	usersRef.child('exercise/relation/input/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




//subtraction


app.get('/get/exercise/subtraction/compare/level1', function (req, res, err) {
	usersRef.child('exercise/subtraction/compare/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/compare/level2', function (req, res, err) {
	usersRef.child('exercise/subtraction/compare/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/compare/level3', function (req, res, err) {
	usersRef.child('exercise/subtraction/compare/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/compare/level4', function (req, res, err) {
	usersRef.child('exercise/subtraction/compare/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/compare/level5', function (req, res, err) {
	usersRef.child('exercise/subtraction/compare/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/compare/level6', function (req, res, err) {
	usersRef.child('exercise/subtraction/compare/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/compare/level7', function (req, res, err) {
	usersRef.child('exercise/subtraction/compare/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/subtraction/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/subtraction/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/subtraction/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/subtraction/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/subtraction/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/subtraction/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/subtraction/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});



app.get('/get/exercise/subtraction/input/level1', function (req, res, err) {
	usersRef.child('exercise/subtraction/input/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/input/level2', function (req, res, err) {
	usersRef.child('exercise/subtraction/input/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/input/level3', function (req, res, err) {
	usersRef.child('exercise/subtraction/input/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/input/level4', function (req, res, err) {
	usersRef.child('exercise/subtraction/input/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/input/level5', function (req, res, err) {
	usersRef.child('exercise/subtraction/input/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/input/level6', function (req, res, err) {
	usersRef.child('exercise/subtraction/input/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/subtraction/input/level7', function (req, res, err) {
	usersRef.child('exercise/subtraction/input/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});





// score

app.get('/get/score/level1/addition', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level1/addition').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});


app.get('/get/score/level1/compare', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level1/compare').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level1/counter', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level1/counter').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level1/divide', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level1/divide').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level1/minus', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level1/minus').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level1/multiplies', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level1/multiplies').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level1/relation', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level1/relation').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

//level2 

app.get('/get/score/level2/addition', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level2/addition').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});


app.get('/get/score/level2/compare', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level2/compare').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level2/counter', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level2/counter').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level2/divide', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level2/divide').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level2/minus', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level2/minus').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level2/multiplies', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level2/multiplies').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level2/relation', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level2/relation').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});
 //level 3

 app.get('/get/score/level3/addition', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level3/addition').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});


app.get('/get/score/level3/compare', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level3/compare').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level3/counter', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level3/counter').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level3/divide', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level3/divide').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level3/minus', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level3/minus').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level3/multiplies', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level3/multiplies').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.get('/get/score/level3/relation', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('score/level3/relation').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

//ใส่ score 

//level1
app.post('/post/score/level1/addition', function (req, res) {
	var data = req.body;
	usersRef.child('score/level1/addition').push(data, function (err) {
		
			res.json("succesc")
			// res.json({ message: "Success: User Save.", result: true });

		
	});
});

app.post('/post/score/level1/compare', function (req, res) {
	var data = req.body;
	usersRef.child('score/level1/compare').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level1/counter', function (req, res) {
	var data = req.body;
	usersRef.child('score/level1/counter').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level1/divide', function (req, res) {
	var data = req.body;
	usersRef.child('score/level1/divide').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level1/minus', function (req, res) {
	var data = req.body;
	usersRef.child('score/level1/minus').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level1/multiplies', function (req, res) {
	var data = req.body;
	usersRef.child('score/level1/multiplies').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level1/relation', function (req, res) {
	var data = req.body;
	usersRef.child('score/level1/relation').push(data, function (err) {
		
			res.send(err)
		
	});
});

//level2

app.post('/post/score/level2/addition', function (req, res) {
	var data = req.body;
	usersRef.child('score/level2/addition').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level2/compare', function (req, res) {
	var data = req.body;
	usersRef.child('score/level2/compare').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level2/counter', function (req, res) {
	var data = req.body;
	usersRef.child('score/level2/counter').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level2/divide', function (req, res) {
	var data = req.body;
	usersRef.child('score/level2/divide').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level2/minus', function (req, res) {
	var data = req.body;
	usersRef.child('score/level2/minus').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level2/multiplies', function (req, res) {
	var data = req.body;
	usersRef.child('score/level2/multiplies').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level2/relation', function (req, res) {
	var data = req.body;
	usersRef.child('score/level2/relation').push(data, function (err) {
		
			res.send(err)
		
	});
});



//level3


app.post('/post/score/level3/addition', function (req, res) {
	var data = req.body;
	usersRef.child('score/level3/addition').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level3/compare', function (req, res) {
	var data = req.body;
	usersRef.child('score/level3/compare').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level3/counter', function (req, res) {
	var data = req.body;
	usersRef.child('score/level3/counter').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level3/divide', function (req, res) {
	var data = req.body;
	usersRef.child('score/level3/divide').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level3/minus', function (req, res) {
	var data = req.body;
	usersRef.child('score/level3/minus').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level3/multiplies', function (req, res) {
	var data = req.body;
	usersRef.child('score/level3/multiplies').push(data, function (err) {
		
			res.send(err)
		
	});
});

app.post('/post/score/level3/relation', function (req, res) {
	var data = req.body;
	usersRef.child('score/level3/relation').push(data, function (err) {
		
			res.send(err)
		
	});
});














//user
app.get('/get/user', function (req, res, err) {
	var uid = "-LZj54S1LfKYwNYhrzLA";
	if (uid.length != 20) {
		res.json({ message: "Error: uid must be 20 characters long." });
	} else {
		usersRef.child('user').once("value", function (snapshot) {
			if (snapshot.val() == null) {
				res.json({ message: "Error: No user found", "result": false });
			} else {
				res.json(snapshot.val());
			}
		});
	}
});

app.post('/post/user', function (req, res) {
	// var userEmail = req.body.user_email;
	var uid = "-LaxTCxO2BNTu1y5CzMS";
	var data = req.body;
	usersRef.child('user').push(data, function (err) {
		if (err) {
			res.send(err)
		} else {
			// var key = Object.keys(snapshot.val())[0];
			// console.log(key);
			res.json({ message: "Success: User Save.", result: true });
		}
	});
});

///////////////////////


// app.get('/get/exercise/subtraction/input/level3', function (req, res, err) {
// 	usersRef.child('exercise/subtraction/input/level3')
// 	.once("value", function (snapshot) {
// 		res.json(snapshot.val());
// 	});
// });


// app.get('/get/exercise/subtraction/input/level3', function (req, res, err) {
// 	usersRef.child('exercise/subtraction/input/level3')
// 	.once("value", function (snapshot) {
// 		res.json(snapshot.val());
// 	});
// });


// app.get('/get/exercise/subtraction/input/level3', function (req, res, err) {
// 	usersRef.child('exercise/subtraction/input/level3')
// 	.once("value", function (snapshot) {
// 		res.json(snapshot.val());
// 	});
// });


// app.get('/get/exercise/subtraction/input/level4', function (req, res, err) {
// 	usersRef.child('exercise/subtraction/input/level4')
// 	.once("value", function (snapshot) {
// 		res.json(snapshot.val());
// 	});
// });


// app.get('/get/exercise/subtraction/input/level5', function (req, res, err) {
// 	usersRef.child('exercise/subtraction/input/level5')
// 	.once("value", function (snapshot) {
// 		res.json(snapshot.val());
// 	});
// });


// app.get('/get/exercise/subtraction/input/level6', function (req, res, err) {
// 	usersRef.child('exercise/subtraction/input/level6')
// 	.once("value", function (snapshot) {
// 		res.json(snapshot.val());
// 	});
// });


// app.get('/get/exercise/subtraction/input/level7', function (req, res, err) {
// 	usersRef.child('exercise/subtraction/input/level7')
// 	.once("value", function (snapshot) {
// 		res.json(snapshot.val());
// 	});
// });


// app.post('/post/score/level3/compare', function (req, res) {
// 	var data = req.body;
// 	usersRef.child('score/level3/compare').push(data, function (err) {
		
// 			res.send(err)
		
// 	});
// });

// app.post('/post/score/level3/compare', function (req, res) {
// 	var data = req.body;
// 	usersRef.child('score/level3/compare').push(data, function (err) {
		
// 			res.send(err)
		
// 	});
// });

// app.post('/post/score/level3/counter', function (req, res) {
// 	var data = req.body;
// 	usersRef.child('score/level3/counter').push(data, function (err) {
		
// 			res.send(err)
		
// 	});
// });

// app.post('/post/score/level3/divide', function (req, res) {
// 	var data = req.body;
// 	usersRef.child('score/level3/divide').push(data, function (err) {
		
// 			res.send(err)
		
// 	});
// });

// app.post('/post/score/level3/minus', function (req, res) {
// 	var data = req.body;
// 	usersRef.child('score/level3/minus').push(data, function (err) {
		
// 			res.send(err)
		
// 	});
// });

// app.post('/post/score/level3/multiplies', function (req, res) {
// 	var data = req.body;
// 	usersRef.child('score/level3/multiplies').push(data, function (err) {
		
// 			res.send(err)
		
// 	});
// });

// app.post('/post/score/level3/relation', function (req, res) {
// 	var data = req.body;
// 	usersRef.child('score/level3/relation').push(data, function (err) {
		
// 			res.send(err)
		
// 	});
// });


app.get('/get/exercise/compare/input/level1', function (req, res, err) {
	usersRef.child('exercise/compare/input/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/input/level2', function (req, res, err) {
	usersRef.child('exercise/compare/input/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/input/level3', function (req, res, err) {
	usersRef.child('exercise/compare/input/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/input/level4', function (req, res, err) {
	usersRef.child('exercise/compare/input/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/input/level5', function (req, res, err) {
	usersRef.child('exercise/compare/input/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/input/level6', function (req, res, err) {
	usersRef.child('exercise/compare/input/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/input/level7', function (req, res, err) {
	usersRef.child('exercise/compare/input/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});



app.get('/get/exercise/compare/compare/level1', function (req, res, err) {
	usersRef.child('exercise/compare/compare/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/compare/level2', function (req, res, err) {
	usersRef.child('exercise/compare/compare/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/compare/level3', function (req, res, err) {
	usersRef.child('exercise/compare/compare/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/compare/level4', function (req, res, err) {
	usersRef.child('exercise/compare/compare/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/compare/level5', function (req, res, err) {
	usersRef.child('exercise/compare/compare/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/compare/level6', function (req, res, err) {
	usersRef.child('exercise/compare/compare/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/compare/level7', function (req, res, err) {
	usersRef.child('exercise/compare/compare/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});




app.get('/get/exercise/compare/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/multiplechoice/level1', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level1')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/compare/multiplechoice/level2', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level2')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/compare/multiplechoice/level3', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level3')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/compare/multiplechoice/level4', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level4')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/compare/multiplechoice/level5', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level5')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise/compare/multiplechoice/level6', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level6')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/exercise/compare/multiplechoice/level7', function (req, res, err) {
	usersRef.child('exercise/compare/multiplechoice/level7')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

//////////////////////////////////////////////////////////////////////////////


app.get('/get/Score/level1/daily/addition', function (req, res, err) {
	usersRef.child('Score/level1/daily/addition')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/daily/addition', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/daily/addition').push(data, function (err) {
			res.send(err)
	});
});
app.get('/get/Score/level1/daily/compare', function (req, res, err) {
	usersRef.child('Score/level1/daily/compare')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/daily/compare', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/daily/compare').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level1/daily/counter', function (req, res, err) {
	usersRef.child('Score/level1/daily/counter')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/daily/counter', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/daily/counter').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level1/daily/divide', function (req, res, err) {
	usersRef.child('Score/level1/daily/divide')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/daily/divide', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/daily/divide').push(data, function (err) {
		
			res.send(err)	
	});
});

app.get('/get/Score/level1/daily/multiplication', function (req, res, err) {
	usersRef.child('Score/level1/daily/multiplication')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/daily/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/daily/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level1/daily/pattern', function (req, res, err) {
	usersRef.child('Score/level1/daily/pattern')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/daily/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/daily/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level1/daily/problem', function (req, res, err) {
	usersRef.child('Score/level1/daily/problem')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/daily/problem', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/daily/problem').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level1/daily/subtraction', function (req, res, err) {
	usersRef.child('Score/level1/daily/subtraction')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/daily/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/daily/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});


////////////////////////////////////////////////////////////////////


app.get('/get/Score/level1/select/addition', function (req, res, err) {
	usersRef.child('Score/level1/select/addition')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/select/addition', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/select/addition').push(data, function (err) {
			res.send(err)
	});
});
app.get('/get/Score/level1/select/compare', function (req, res, err) {
	usersRef.child('Score/level1/select/compare')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/select/compare', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/select/compare').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level1/select/counter', function (req, res, err) {
	usersRef.child('Score/level1/select/counter')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/select/counter', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/select/counter').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level1/select/divide', function (req, res, err) {
	usersRef.child('Score/level1/select/divide')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/select/divide', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/select/divide').push(data, function (err) {
		
			res.send(err)	
	});
});

app.get('/get/Score/level1/select/multiplication', function (req, res, err) {
	usersRef.child('Score/level1/select/multiplication')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/select/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/select/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level1/select/pattern', function (req, res, err) {
	usersRef.child('Score/level1/select/pattern')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/select/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/select/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level1/select/problem', function (req, res, err) {
	usersRef.child('Score/level1/select/problem')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/select/problem', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/select/problem').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level1/select/subtraction', function (req, res, err) {
	usersRef.child('Score/level1/select/subtraction')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/select/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/select/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});
///////////////////////////////////////////////////////////////////////



app.get('/get/Score/level1/test/addition', function (req, res, err) {
	usersRef.child('Score/level1/test/addition')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/test/addition', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/test/addition').push(data, function (err) {
			res.send(err)
	});
});
app.get('/get/Score/level1/test/compare', function (req, res, err) {
	usersRef.child('Score/level1/test/compare')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/test/compare', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/test/compare').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level1/test/counter', function (req, res, err) {
	usersRef.child('Score/level1/test/counter')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/test/counter', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/test/counter').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level1/test/divide', function (req, res, err) {
	usersRef.child('Score/level1/test/divide')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/test/divide', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/test/divide').push(data, function (err) {
		
			res.send(err)	
	});
});

app.get('/get/Score/level1/test/multiplication', function (req, res, err) {
	usersRef.child('Score/level1/test/multiplication')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/test/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/test/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level1/test/pattern', function (req, res, err) {
	usersRef.child('Score/level1/test/pattern')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/test/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/test/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level1/test/problem', function (req, res, err) {
	usersRef.child('Score/level1/test/problem')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/test/problem', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/test/problem').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level1/test/subtraction', function (req, res, err) {
	usersRef.child('Score/level1/test/subtraction')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level1/test/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level1/test/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});

////////////////////////////////////////////////////


app.get('/get/Score/level2/daily/addition', function (req, res, err) {
	usersRef.child('Score/level2/daily/addition')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/daily/addition', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/daily/addition').push(data, function (err) {
			res.send(err)
	});
});
app.get('/get/Score/level2/daily/compare', function (req, res, err) {
	usersRef.child('Score/level2/daily/compare')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/daily/compare', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/daily/compare').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level2/daily/counter', function (req, res, err) {
	usersRef.child('Score/level2/daily/counter')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/daily/counter', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/daily/counter').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level2/daily/divide', function (req, res, err) {
	usersRef.child('Score/level2/daily/divide')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/daily/divide', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/daily/divide').push(data, function (err) {
		
			res.send(err)	
	});
});

app.get('/get/Score/level2/daily/multiplication', function (req, res, err) {
	usersRef.child('Score/level2/daily/multiplication')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/daily/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/daily/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level2/daily/pattern', function (req, res, err) {
	usersRef.child('Score/level2/daily/pattern')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/daily/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/daily/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level2/daily/problem', function (req, res, err) {
	usersRef.child('Score/level2/daily/problem')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/daily/problem', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/daily/problem').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level2/daily/subtraction', function (req, res, err) {
	usersRef.child('Score/level2/daily/subtraction')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/daily/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/daily/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});


////////////////////////////////////////////////////////////////////


app.get('/get/Score/level2/select/addition', function (req, res, err) {
	usersRef.child('Score/level2/select/addition')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/select/addition', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/select/addition').push(data, function (err) {
			res.send(err)
	});
});
app.get('/get/Score/level2/select/compare', function (req, res, err) {
	usersRef.child('Score/level2/select/compare')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/select/compare', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/select/compare').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level2/select/counter', function (req, res, err) {
	usersRef.child('Score/level2/select/counter')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/select/counter', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/select/counter').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level2/select/divide', function (req, res, err) {
	usersRef.child('Score/level2/select/divide')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/select/divide', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/select/divide').push(data, function (err) {
		
			res.send(err)	
	});
});

app.get('/get/Score/level2/select/multiplication', function (req, res, err) {
	usersRef.child('Score/level2/select/multiplication')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/select/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/select/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level2/select/pattern', function (req, res, err) {
	usersRef.child('Score/level2/select/pattern')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/select/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/select/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level2/select/problem', function (req, res, err) {
	usersRef.child('Score/level2/select/problem')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/select/problem', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/select/problem').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level2/select/subtraction', function (req, res, err) {
	usersRef.child('Score/level2/select/subtraction')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/select/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/select/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});
///////////////////////////////////////////////////////////////////////



app.get('/get/Score/level2/test/addition', function (req, res, err) {
	usersRef.child('Score/level2/test/addition')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/test/addition', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/test/addition').push(data, function (err) {
			res.send(err)
	});
});
app.get('/get/Score/level2/test/compare', function (req, res, err) {
	usersRef.child('Score/level2/test/compare')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/test/compare', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/test/compare').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level2/test/counter', function (req, res, err) {
	usersRef.child('Score/level2/test/counter')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/test/counter', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/test/counter').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level2/test/divide', function (req, res, err) {
	usersRef.child('Score/level2/test/divide')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/test/divide', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/test/divide').push(data, function (err) {
		
			res.send(err)	
	});
});

app.get('/get/Score/level2/test/multiplication', function (req, res, err) {
	usersRef.child('Score/level2/test/multiplication')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/test/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/test/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level2/test/pattern', function (req, res, err) {
	usersRef.child('Score/level2/test/pattern')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/test/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/test/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level2/test/problem', function (req, res, err) {
	usersRef.child('Score/level2/test/problem')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/test/problem', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/test/problem').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level2/test/subtraction', function (req, res, err) {
	usersRef.child('Score/level2/test/subtraction')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level2/test/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level2/test/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});

////////////////////////////////////////////////////

app.get('/get/Score/level3/daily/addition', function (req, res, err) {
	usersRef.child('Score/level3/daily/addition')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/daily/addition', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/daily/addition').push(data, function (err) {
			res.send(err)
	});
});
app.get('/get/Score/level3/daily/compare', function (req, res, err) {
	usersRef.child('Score/level3/daily/compare')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/daily/compare', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/daily/compare').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level3/daily/counter', function (req, res, err) {
	usersRef.child('Score/level3/daily/counter')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/daily/counter', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/daily/counter').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level3/daily/divide', function (req, res, err) {
	usersRef.child('Score/level3/daily/divide')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/daily/divide', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/daily/divide').push(data, function (err) {
		
			res.send(err)	
	});
});

app.get('/get/Score/level3/daily/multiplication', function (req, res, err) {
	usersRef.child('Score/level3/daily/multiplication')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/daily/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/daily/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level3/daily/pattern', function (req, res, err) {
	usersRef.child('Score/level3/daily/pattern')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/daily/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/daily/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level3/daily/problem', function (req, res, err) {
	usersRef.child('Score/level3/daily/problem')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/daily/problem', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/daily/problem').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level3/daily/subtraction', function (req, res, err) {
	usersRef.child('Score/level3/daily/subtraction')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/daily/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/daily/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});


////////////////////////////////////////////////////////////////////


app.get('/get/Score/level3/select/addition', function (req, res, err) {
	usersRef.child('Score/level3/select/addition')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/select/addition', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/select/addition').push(data, function (err) {
			res.send(err)
	});
});
app.get('/get/Score/level3/select/compare', function (req, res, err) {
	usersRef.child('Score/level3/select/compare')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/select/compare', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/select/compare').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level3/select/counter', function (req, res, err) {
	usersRef.child('Score/level3/select/counter')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/select/counter', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/select/counter').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level3/select/divide', function (req, res, err) {
	usersRef.child('Score/level3/select/divide')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/select/divide', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/select/divide').push(data, function (err) {
		
			res.send(err)	
	});
});

app.get('/get/Score/level3/select/multiplication', function (req, res, err) {
	usersRef.child('Score/level3/select/multiplication')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/select/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/select/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level3/select/pattern', function (req, res, err) {
	usersRef.child('Score/level3/select/pattern')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/select/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/select/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level3/select/problem', function (req, res, err) {
	usersRef.child('Score/level3/select/problem')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/select/problem', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/select/problem').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level3/select/subtraction', function (req, res, err) {
	usersRef.child('Score/level3/select/subtraction')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/select/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/select/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});
///////////////////////////////////////////////////////////////////////



app.get('/get/Score/level3/test/addition', function (req, res, err) {
	usersRef.child('Score/level3/test/addition')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/test/addition', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/test/addition').push(data, function (err) {
			res.send(err)
	});
});
app.get('/get/Score/level3/test/compare', function (req, res, err) {
	usersRef.child('Score/level3/test/compare')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/test/compare', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/test/compare').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level3/test/counter', function (req, res, err) {
	usersRef.child('Score/level3/test/counter')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/test/counter', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/test/counter').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level3/test/divide', function (req, res, err) {
	usersRef.child('Score/level3/test/divide')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/test/divide', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/test/divide').push(data, function (err) {
		
			res.send(err)	
	});
});

app.get('/get/Score/level3/test/multiplication', function (req, res, err) {
	usersRef.child('Score/level3/test/multiplication')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/test/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/test/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});
app.get('/get/Score/level3/test/pattern', function (req, res, err) {
	usersRef.child('Score/level3/test/pattern')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/test/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/test/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level3/test/problem', function (req, res, err) {
	usersRef.child('Score/level3/test/problem')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/test/problem', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/test/problem').push(data, function (err) {
		
			res.send(err)	
	});
});


app.get('/get/Score/level3/test/subtraction', function (req, res, err) {
	usersRef.child('Score/level3/test/subtraction')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});
app.post('/post/Score/level3/test/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('Score/level3/test/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});

////////////////////////////////////////////////////


app.post('/post/averageScore/select/addition', function (req, res) {
	var data = req.body;
	usersRef.child('averageScore/select/addition').push(data, function (err) {
		
			res.send(err)	
	});
});


app.post('/post/averageScore/select/compare', function (req, res) {
	var data = req.body;
	usersRef.child('averageScore/select/compare').push(data, function (err) {
		
			res.send(err)	
	});
});



app.post('/post/averageScore/select/couter', function (req, res) {
	var data = req.body;
	usersRef.child('averageScore/select/couter').push(data, function (err) {
		
			res.send(err)	
	});
});



app.post('/post/averageScore/select/divide', function (req, res) {
	var data = req.body;
	usersRef.child('averageScore/select/divide').push(data, function (err) {
		
			res.send(err)	
	});
});



app.post('/post/averageScore/select/multiplication', function (req, res) {
	var data = req.body;
	usersRef.child('averageScore/select/multiplication').push(data, function (err) {
		
			res.send(err)	
	});
});



app.post('/post/averageScore/select/pattern', function (req, res) {
	var data = req.body;
	usersRef.child('averageScore/select/pattern').push(data, function (err) {
		
			res.send(err)	
	});
});



app.post('/post/averageScore/select/problem', function (req, res) {
	var data = req.body;
	usersRef.child('averageScore/select/problem').push(data, function (err) {
		
			res.send(err)	
	});
});



app.post('/post/averageScore/select/subtraction', function (req, res) {
	var data = req.body;
	usersRef.child('averageScore/select/subtraction').push(data, function (err) {
		
			res.send(err)	
	});
});





app.get('/get/Score', function (req, res, err) {
	usersRef.child('Score')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


app.get('/get/averageScore', function (req, res, err) {
	usersRef.child('averageScore')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});

app.get('/get/exercise', function (req, res, err) {
	usersRef.child('exercise')
	.once("value", function (snapshot) {
		res.json(snapshot.val());
	});
});


/////////////////////////

exports.app = functions.https.onRequest(app);
app.listen(3000);
console.log("port is 3000");