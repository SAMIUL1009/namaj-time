function saveTime() {
    const times = {
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

    localStorage.setItem("prayerTimes", JSON.stringify(times));
    showTimes();
}

function showTimes() {
    const data = JSON.parse(localStorage.getItem("prayerTimes"));

    if (!data) return;

    document.getElementById("output").innerHTML = `
        <p>Fajr: ${data.fajr} | জামাত: ${data.fajr_j}</p>
        <p>Zuhr: ${data.zuhr} | জামাত: ${data.zuhr_j}</p>
        <p>Asr: ${data.asr} | জামাত: ${data.asr_j}</p>
        <p>Maghrib: ${data.maghrib} | জামাত: ${data.maghrib_j}</p>
        <p>Isha: ${data.isha} | জামাত: ${data.isha_j}</p>
    `;
}

showTimes();
