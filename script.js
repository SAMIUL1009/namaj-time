const storageKey = 'prayerTimesWithJamaat';

const defaultTimes = {
  Fajr:     { azan: "05:00", jamaat: "05:30" },
  Zuhr:     { azan: "12:30", jamaat: "13:00" },
  Asr:      { azan: "15:30", jamaat: "16:00" },
  Maghrib:  { azan: "18:00", jamaat: "18:10" },
  Isha:     { azan: "19:30", jamaat: "20:00" }
};

const prayers = ["Fajr","Zuhr","Asr","Maghrib","Isha"];

document.getElementById("todayDate").textContent =
  new Date().toLocaleDateString('bn-BD', { day:'numeric', month:'long', year:'numeric' });

function loadTimes(){
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : defaultTimes;
}

function saveTimes(times){
  localStorage.setItem(storageKey, JSON.stringify(times));
}

function renderTable(){
  const tbody = document.getElementById("prayerTable");
  tbody.innerHTML = "";
  const t = loadTimes();

  prayers.forEach(p=>{
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p}</td>
      <td><input type="time" class="time-input azan" data-p="${p}" value="${t[p].azan}"></td>
      <td><input type="time" class="time-input jamaat" data-p="${p}" value="${t[p].jamaat}"></td>
      <td id="status-${p}">—</td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll(".time-input").forEach(i=>{
    i.addEventListener("change", updateStatus);
  });

  updateStatus();
}

function buildTime(str){
  const [h,m] = str.split(":").map(Number);
  const d = new Date();
  d.setHours(h,m,0,0);
  return d;
}

function updateStatus(){
  const t = loadTimes();
  const now = new Date();

  prayers.forEach(p=>{
    const azan = buildTime(t[p].azan);
    const jamaat = buildTime(t[p].jamaat);

    const cell = document.getElementById("status-"+p);

    if(now < azan){
      cell.textContent = "আজান বাকি";
    } else if(now >= azan && now < jamaat){
      cell.textContent = "জামাত বাকি";
    } else {
      cell.textContent = "হয়ে গেছে";
    }
  });
}

function findNext(){
  const t = loadTimes();
  const now = new Date();
  let nextName = null;
  let nextTime = null;

  prayers.forEach(p=>{
    const az = buildTime(t[p].azan);
    const jm = buildTime(t[p].jamaat);

    if(az > now){
      if(!nextTime || az < nextTime){
        nextName = p + " (আজান)";
        nextTime = az;
      }
    }

    if(jm > now){
      if(!nextTime || jm < nextTime){
        nextName = p + " (জামাত)";
        nextTime = jm;
      }
    }
  });

  if(!nextTime){
    nextName = "Fajr (আজান)";
    nextTime = buildTime(t.Fajr.azan);
    nextTime.setDate(nextTime.getDate() + 1);
  }

  return { name: nextName, time: nextTime };
}

function updateCountdown(){
  const next = findNext();

  document.getElementById("nextPrayerName").textContent = next.name;
  document.getElementById("nextPrayerTime").textContent =
    next.time.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

  const diff = next.time - new Date();
  const s = Math.floor(diff/1000);

  if(s <= 0){
    document.getElementById("countdown").textContent = "00:00:00";
    return;
  }

  const h = String(Math.floor(s/3600)).padStart(2,"0");
  const m = String(Math.floor((s%3600)/60)).padStart(2,"0");
  const sec = String(s%60).padStart(2,"0");

  document.getElementById("countdown").textContent = `${h}:${m}:${sec}`;
}

// Save button
document.getElementById("saveBtn").onclick = ()=>{
  const inputsAzan = document.querySelectorAll(".azan");
  const inputsJamaat = document.querySelectorAll(".jamaat");

  const newData = loadTimes();

  inputsAzan.forEach(i=>{
    newData[i.dataset.p].azan = i.value;
  });

  inputsJamaat.forEach(i=>{
    newData[i.dataset.p].jamaat = i.value;
  });

  saveTimes(newData);
  alert("Saved!");
  updateStatus();
};

// Reset
document.getElementById("resetBtn").onclick = ()=>{
  saveTimes(defaultTimes);
  renderTable();
};

renderTable();
updateCountdown();
setInterval(updateCountdown, 1000);
