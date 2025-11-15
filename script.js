
document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('searchInput');
    let talks = [];

    fetch('talks.json')
        .then(response => response.json())
        .then(data => {
            talks = data;
            renderSchedule(talks);
        });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTalks = talks.filter(talk =>
            talk.categories.some(category =>
                category.toLowerCase().includes(searchTerm)
            )
        );
        renderSchedule(filteredTalks);
    });

    function renderSchedule(talksToRender) {
        scheduleContainer.innerHTML = '';
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0);

        talksToRender.forEach((talk, index) => {
            const talkElement = document.createElement('div');
            talkElement.classList.add('talk');

            const time = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
            currentTime.setMinutes(currentTime.getMinutes() + talk.duration);
            const endTime = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;

            talkElement.innerHTML = `
                <div class="time">${time} - ${endTime}</div>
                <h2>${talk.title}</h2>
                <div class="speakers">By: ${talk.speakers.join(', ')}</div>
                <p>${talk.description}</p>
                <div class="categories">
                    ${talk.categories.map(category => `<span class="category">${category}</span>`).join('')}
                </div>
            `;
            scheduleContainer.appendChild(talkElement);

            if (index === 2) {
                const breakElement = document.createElement('div');
                breakElement.classList.add('break');
                const breakStartTime = new Date(currentTime);
                const breakEndTime = new Date(breakStartTime);
                breakEndTime.setMinutes(breakEndTime.getMinutes() + 60);
                breakElement.innerHTML = `
                    <h3>Lunch Break</h3>
                    <div>${breakStartTime.getHours()}:${breakStartTime.getMinutes().toString().padStart(2, '0')} - ${breakEndTime.getHours()}:${breakEndTime.getMinutes().toString().padStart(2, '0')}</div>
                `;
                scheduleContainer.appendChild(breakElement);
                currentTime.setMinutes(currentTime.getMinutes() + 60);
            }

            currentTime.setMinutes(currentTime.getMinutes() + 10); // 10 minute transition
        });
    }
});
