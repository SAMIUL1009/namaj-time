/* Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyA2e16SWt6tM3q76M8deUWiEz3cNqHCc7A",
  authDomain: "namaz-schedule.firebaseapp.com",
  databaseURL: "https://namaz-schedule-default-rtdb.firebaseio.com",
  projectId: "namaz-schedule"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

/* ADMIN EMAIL */
const adminEmail = "samiulsk527@gmail.com";  // আপনার admin email দিন

/* -------- LOGIN -------- */
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById("loginBox").style.display = "none";
            document.getElementById("scheduleBox").style.display = "block";

            if (email === adminEmail) {
                enableInputs(true);
            } else {
                enableInputs(false);
            }

            loadTimes();
        })
        .catch(() => alert("ভুল Email বা Password!"));
}

/* -------- ENABLE / DISABLE INPUTS -------- */
function enableInputs(status) {
    document.querySelectorAll("input[type='time']").forEach(inp => {
        inp.disabled = !status;
    });
}

/* -------- LOAD SAVED TIMES -------- */
function loadTimes() {
    db.ref("times").on("value", snap => {
        let t = snap.val();
        if (!t) return;

        for (let key in t) {
            let field = document.getElementById(key);
            if (field) field.value = t[key];
        }
    });
}

/* -------- AUTO SAVE -------- */
function autoSave(id) {
    db.ref("times/" + id).set(document.getElementById(id).value);
}

["fajr","fajr_j","zuhr","zuhr_j","asr","asr_j",
 "maghrib","maghrib_j","isha","isha_j"]
.forEach(id => {
    document.getElementById(id).addEventListener("change", () => autoSave(id));
});

