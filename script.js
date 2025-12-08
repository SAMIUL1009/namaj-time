// নামাজ ও জামাতের সময় (ঢাকা, বাংলাদেশ)
const prayers = [
    { name: 'ফজর', time: '০৫:১৫', jamaat: '০৫:২০' },
    { name: 'সূর্যোদয়', time: '০৬:৪৫', jamaat: '-' },
    { name: 'জোহর', time: '১১:৫০', jamaat: '১২:০০' },
    { name: 'আসর', time: '০৩:২০', jamaat: '০৩:২৫' },
    { name: 'মাগরিব', time: '০৫:১৫', jamaat: '০৫:১৭' },
    { name: 'ইশা', time: '০৬:৪০', jamaat: '০৬:৫০' }
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
