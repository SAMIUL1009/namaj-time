// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA2e16SWt6tM3q76M8deUWiEz3cNqHCc7A",
  authDomain: "namaz-schedule.firebaseapp.com",
  projectId: "namaz-schedule",
  databaseURL: "https://namaz-schedule-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// --------- LOGIN ----------
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById("loginBox").style.display = "none";
            document.getElementById("scheduleBox").style.display = "block";
            loadTimes();
        })
        .catch(() => alert("ভুল Email বা Password!"));
}

// --------- LOAD TIMES ----------
function loadTimes() {
    db.ref("times").on("value", snap => {
        let t = snap.val();

        document.getElementById("fajr").value = t.fajr;
        document.getElementById("fajr_j").value = t.fajr_j;
        document.getElementById("zuhr").value = t.zuhr;
        document.getElementById("zuhr_j").value = t.zuhr_j;
        document.getElementById("asr").value = t.asr;
        document.getElementById("asr_j").value = t.asr_j;
        document.getElementById("maghrib").value = t.maghrib;
        document.getElementById("maghrib_j").value = t.maghrib_j;
        document.getElementById("isha").value = t.isha;
        document.getElementById("isha_j").value = t.isha_j;
    });
}

// --------- AUTO SAVE ----------
function autoSave(id) {
    let value = document.getElementById(id).value;
    db.ref("times/" + id).set(value);
}

["fajr","fajr_j","zuhr","zuhr_j","asr","asr_j","maghrib","maghrib_j","isha","isha_j"]
.forEach(id => {
    document.getElementById(id).addEventListener("change", () => autoSave(id));
});
