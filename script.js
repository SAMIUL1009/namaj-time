// script.js
const form = document.getElementById("locationForm");
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const statusEl = document.getElementById("status");
const dateText = document.getElementById("dateText");
const timesBody = document.getElementById("timesBody");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  const country = countryInput.value.trim();

  if (!city || !country) return;

  statusEl.textContent = "Loading prayer times...";
  timesBody.innerHTML = "";
  dateText.textContent = "";

  try {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
      city
    )}&country=${encodeURIComponent(country)}&method=2`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    if (data.code !== 200) {
      throw new Error(data.status || "API error");
    }

    const timings = data.data.timings;
    const date = data.data.date.readable;

    dateText.textContent = `Date: ${date}`;
    statusEl.textContent = `Showing times for ${city}, ${country}`;

    const order = [
      "Fajr",
      "Sunrise",
      "Dhuhr",
      "Asr",
      "Maghrib",
      "Isha"
    ];

    order.forEach((name) => {
      const tr = document.createElement("tr");
      const tdName = document.createElement("td");
      const tdTime = document.createElement("td");

      tdName.textContent = name;
      tdTime.textContent = timings[name];

      tr.appendChild(tdName);
      tr.appendChild(tdTime);
      timesBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Failed to load prayer times. Please try again.";
  }
});

// Optional: set some defaults
cityInput.value = "Mumbai";
countryInput.value = "India";
