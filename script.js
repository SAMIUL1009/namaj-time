// নামাজ ও জামাতের সময় (ঢাকা, বাংলাদেশ)
const prayers = [
    { name: 'ফজর', time: '০৫:১৫', jamaat: '০৫:২০' },
    { name: 'সূর্যোদয়', time: '০৬:৪৫', jamaat: '-' },
    { name: 'জোহর', time: '০১:০০', jamaat: '0১:২০' },
    { name: 'আসর', time: '০৩:২০', jamaat: '০৩:৩৫' },
    { name: 'মাগরিব', time: '০৫:০০', jamaat: '০৫:০৩' },
    { name: 'ইশা', time: '০৭:১৫', jamaat: '০৭:৩০' }
];

// সময় কার্ড তৈরি করা
function createPrayerCards() {
    const grid = document.getElementById('prayerGrid');
    grid.innerHTML = '';

    prayers.forEach(prayer => {
        const card = document.createElement('div');
        card.className = 'prayer-card';
        card.innerHTML = `
            <div class="prayer-name">${prayer.name}</div>
            <div class="prayer-time">${prayer.time}</div>
            <div class="jamaat-time">${prayer.jamaat !== '-' ? 'জামাত: ' + prayer.jamaat : ''}</div>
        `;
        grid.appendChild(card);
    });
}

// বর্তমান তারিখ দেখানো
function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('bn-BD', options);
}

// পেজ লোড হলে
createPrayerCards();
updateDate();

// প্রতি মিনিটে আপডেট
setInterval(updateDate, 60000);

