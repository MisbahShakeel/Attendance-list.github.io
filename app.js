// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {getStorage } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";


// Initialize Firebase
//  const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();
const storage = getStorage();


// Show Password

const showPass = document.getElementById('showPassword');
const showPassword = () => {
	let pass = document.getElementById('password');
	pass.type = 'text';
};
showPass && showPass.addEventListener('click', showPassword);

// Loader

const spiner = document.getElementById('spiner');

function showLoader() {
	spiner.style.display = 'flex';
}
function hideLoader() {
	spiner.style.display = 'none';
}

// Sign Button

const signupBtn = document.getElementById('signupBtn');

const signup = () => {
	let fullName = document.getElementById('fullName');
	let email = document.getElementById('email');
	let phone = document.getElementById('phone');
	let Password = document.getElementById('password');

	const user = {
		fullName: fullName.value,
		email: email.value,
		phone: phone.value,
		Password: Password.value,
	};
	if ((!user.fullName, !user.email, !user.phone, !user.Password)) {
		alert('Please fill out  all fields');
		return;
	}
	showLoader();

	createUserWithEmailAndPassword(auth, user.email, user.Password)
		.then((res) => {
			const user = res.user;
			console.log(user);
			hideLoader();
			alert({
				position: 'center',
				icon: 'success',
				title: 'User has been created',
				showConfirmButton: false,
				timer: 1500,
			});
			window.location.href = "./signIn.html"
		})
		
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			hideLoader();
			let errorText = errorMessage;
			switch (errorMessage) {
				case 'Firebase: Error (auth/invalid-email).':
					errorText = 'Invalid Email';
					break;
				case 'Firebase: Error (auth/email-already-in-use).':
					errorText = 'This email is already in use. Try different';
					break;
				default:
					errorText = 'Something went wrong';
			}
			alert({
				icon: 'error',
				title: 'Oops...',
				text: errorText,
			});
		});
};
signupBtn && signupBtn.addEventListener('click', signup);

// Sign IN

const signinBtn = document.getElementById('signInBtn');

const signIn = () => {
	console.log('hello');
	let email = document.getElementById('email');
	let password = document.getElementById('password');
	if ((!email.value, !password.value)) {
		alert('Please fill out  all fields');
		return;
	}
	showLoader();
	signInWithEmailAndPassword(auth, email.value, password.value)
		.then((res) => {
			const user = res.user;
			console.log(user);
			hideLoader();
			hideLoader();
			alert({
				position: 'center',
				icon: 'success',
				title: 'Loggined In',
				showConfirmButton: false,
				timer: 1500,
			});
			window.location.href = "./signout.html"
		})
		
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			hideLoader();
			let errorText = errorMessage;
			switch (errorMessage) {
				case 'Firebase: Error (auth/wrong-password).':
					errorText = 'Invalid Password';
					break;
				case 'Firebase: Error (auth/user-not-found).':
					errorText = 'Email is not correct';
					break;
				default:
					errorText = 'Something went wrong';
			}
			alert({
				icon: 'error',
				title: 'Oops...',
				text: errorText,
			});
		});
};
signinBtn && signinBtn.addEventListener('click', signIn);

 function addStudent() {
    const name = document.getElementById('name').value;
    const fatherName = document.getElementById('fatherName').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const cnic = document.getElementById('cnic').value;
    const courseName = document.getElementById('courseName').value;
    const className = document.getElementById('className').value;
    const picture = document.getElementById('picture').value; // Handle file upload

    // Push student data to the database
    const studentRef = firebase.database().ref('/students').push(addStudent, markAttendance);
    studentRef.set({
        name,
        fatherName,
        rollNumber,
        contactNumber,
        cnic,
        courseName,
        className,
        picture
    });
}

// Function to mark attendance for a student
function markAttendance() {
    const rollNumberInput = document.getElementById('rollNumberInput').value;
    const attendanceStatus = document.getElementById('attendanceStatus').value;

    // Update attendance status in the database based on roll number
    firebase.database().ref('/students').orderByChild('rollNumber').equalTo(rollNumberInput).once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const studentKey = childSnapshot.key;
            const studentRef = firebase.database().ref(`/students/${studentKey}`);
            studentRef.update({ attendanceStatus });
        });
    });
}


// Real-time database listener to display student details
const studentDetailsDiv = document.getElementById('studentDetails');

firebase.database().ref('/students').on('child_added', (snapshot) => {
    const student = snapshot.val();
    const studentDetails = `
        <div>
            <h2>${student.name}</h2>
            <p>Father's Name: ${student.fatherName}</p>
            <p>Roll Number: ${student.rollNumber}</p>
            <p>Contact Number: ${student.contactNumber}</p>
            <p>CNIC Number: ${student.cnic}</p>
            <p>Course Name: ${student.courseName}</p>
            <p>Class Name: ${student.className}</p>
            <p>Attendance Status: ${student.attendanceStatus}</p>
            <!-- Display the student's picture here -->
        </div>
    `;
    studentDetailsDiv.innerHTML += studentDetails;
});

const imagesRef = ref(storage, 'images');
const sparkyRef = ref(storage, 'images/sparky.jpg');

uploadBytes(imagesRef, file).then((snapshot) => {
	console.log('Uploaded a blob or file!');
  });
  
  const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
uploadBytes(imagesRef, bytes).then((snapshot) => {
  console.log('Uploaded an array!');
});

// Raw string is the default if no format is provided
const rowString = 'This is my message.';
uplodString(sparkyRef, raw_string).then((snapshot) => {
  console.log('Uploaded a raw string!');
});

// Base64 formatted string
const basedString = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uplodString(sparkyRef, 'base64_string').then((snapshot) => {
  console.log('Uploaded a base64 string!');
});

// Base64url formatted string
const base64urlString = '5b6p5Y-344GX44G-44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uplodString(sparkyRef, 'base64url_string').then((snapshot) => {
  console.log('Uploaded a base64url string!');
});

// Data URL string
const dataUrlString = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uplodString(sparkyRef, 'data_url_string').then((snapshot) => {
  console.log('Uploaded a data_url string!');
});

uploadBytes();
uplodString();


// Sign Out

const logoutBtn = document.getElementById('Logout');
const signoutUser = () => {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
		});
};

 logoutBtn && logoutBtn.addEventListener('click', signoutUser);
		
     