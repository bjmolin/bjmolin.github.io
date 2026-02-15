document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const currentTimeDisplay = document.getElementById('current-time');
    const rewindButton = document.getElementById('rewind');
    const forwardButton = document.getElementById('forward');
    const togglePlayButton = document.getElementById('toggle-play');
    const addTitleButton = document.getElementById('add-title');
    const removeTitleButton = document.getElementById('remove-title');
    const playlist = document.getElementById('playlist');

    let titles = [
        { title: "Start", start: 0, end: 49 },
        { title: "Start singing", start: 49, end: 79 },
        { title: "Chorus", start: 79, end: 111 },
        { title: "Second lyrical part", start: 111, end: 142 },
        { title: "Chorus", start: 142, end: 174 },
        { title: "Automated phone response", start: 174, end: 188 },
        { title: "Don't go so easy", start: 188, end: 217 },
        { title: "Chorus", start: 217, end: 247 }
    ];

    let currentSegment = null;
    let isPlaying = false;

    function updatePlaylist() {
        playlist.innerHTML = '';
        titles.forEach((segment, index) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = segment.title;
            button.onclick = () => playSegment(index);
            li.appendChild(button);
            playlist.appendChild(li);
        });
    }

    function playSegment(index) {
        currentSegment = titles[index];
        audio.currentTime = currentSegment.start;
        audio.play();
        togglePlayButton.textContent = 'Pause';
        isPlaying = true;
    }

    function addTitle() {
        const title = prompt("Enter the title:");
        if (title) {
            const currentTime = audio.currentTime;
            titles.push({ title, start: currentTime, end: currentTime + 10 });
            titles.sort((a, b) => a.start - b.start);
            updatePlaylist();
        }
    }

    function removeTitle() {
        if (currentSegment) {
            titles = titles.filter(segment => segment !== currentSegment);
            currentSegment = null;
            updatePlaylist();
        }
    }

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            togglePlayButton.textContent = 'Play';
        } else {
            audio.play();
            togglePlayButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    }

    function updateCurrentTime() {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        currentTimeDisplay.textContent = `Current Time: ${minutes}:${seconds}`;
        if (currentSegment && audio.currentTime >= currentSegment.end) {
            audio.pause();
            togglePlayButton.textContent = 'Play';
            isPlaying = false;
        }
    }

    function rewind() {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
    }

    function forward() {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    }

    audio.addEventListener('timeupdate', updateCurrentTime);
    rewindButton.addEventListener('click', rewind);
    forwardButton.addEventListener('click', forward);
    togglePlayButton.addEventListener('click', togglePlay);
    addTitleButton.addEventListener('click', addTitle);
    removeTitleButton.addEventListener('click', removeTitle);

    updatePlaylist();
});
