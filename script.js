function saveTimes() {
    let times = {
        fajr: document.getElementById("fajr").value,
        fajr_j: document.getElementById("fajr_j").value,
        zuhr: document.getElementById("zuhr").value,
        zuhr_j: document.getElementById("zuhr_j").value,
        asr: document.getElementById("asr").value,
        asr_j: document.getElementById("asr_j").value,
        maghrib: document.getElementById("maghrib").value,
        maghrib_j: document.getElementById("maghrib_j").value,
        isha: document.getElementById("isha").value,
        isha_j: document.getElementById("isha_j").value
    };

    localStorage.setItem("namazTimes", JSON.stringify(times));
    alert("সময়গুলো সংরক্ষণ করা হয়েছে!");
}

window.onload = function () {
    let saved = localStorage.getItem("namazTimes");
    if (saved) {
        let t = JSON.parse(saved);

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
    }
};
