import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA2e16SWt6tM3q76M8deUWiEz3cNqHCc7A",
  authDomain: "namaz-schedule.firebaseapp.com",
  databaseURL: "https://namaz-schedule-default-rtdb.firebaseio.com",
  projectId: "namaz-schedule",
  storageBucket: "namaz-schedule.appspot.com",
  messagingSenderId: "242449317130",
  appId: "1:242449317130:web:c6945e81f906909a258ef3",
  measurementId: "G-7N0EZFMTTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

let isAdmin = false;
let dataLoaded = false;

window.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    const logoutBtn = document.getElementById('logoutBtn');
    const inputs = document.querySelectorAll("input[type=time]");

    // Initially Public mode
    inputs.forEach(i => i.readOnly = true);
    logoutBtn.style.display = 'none';

    // Listen auth state
    onAuthStateChanged(auth, user => {
        if(user){
            isAdmin = true;
            inputs.forEach(i => i.readOnly = false);
            loginForm.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            isAdmin = false;
            inputs.forEach(i => i.readOnly = true);
            loginForm.style.display = 'block';
            logoutBtn.style.display = 'none';
        }
    });

    // Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailInput.value, passInput.value)
            .catch(err => alert(err.message));
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        signOut(auth);
    });

    // Load saved times from Firebase
    const dbRef = ref(database);
    get(child(dbRef, 'namazTimes')).then(snapshot => {
        if(snapshot.exists()){
            const t = snapshot.val();
            inputs.forEach(i => {
                if(t[i.id]) i.value = t[i.id];
            });
        }
        dataLoaded = true;
    }).catch(console.error);

    // Auto-save on input change
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if(!dataLoaded || !isAdmin) return;
            const times = {};
            inputs.forEach(i => times[i.id] = i.value || "");
            set(ref(database, 'namazTimes'), times).catch(console.error);
        });
    });
});
