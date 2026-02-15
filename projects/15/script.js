document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('search-input');
    const enterBtn = document.getElementById('search-button');
    // Using Youtube Data v3 API
    const apiKey = 'AIzaSyDHVZ5PtJZEcVCs6cJPxczST7EFOGdRdl0'; 
    const trendingWordBank = [
        'trending',
        'what is trending',
        'what is trending right now',
        'what is trending rn',
        'show trends',
        'show trending',
        'trend',
        'trends'
    ];

    function handleSearch() {
        let query = input.value.trim();
        if (query) {
            // If user uses handle
            if (query.startsWith('@')) {
                findHandle(query.substring(1));
            } else if (trendingWordBank.includes(query.toLowerCase())) {
                showTrending();
            } else {
                findChannels(query);
            }
        } else {
            showTrending();
        }
    }

    enterBtn.addEventListener('click', handleSearch);

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    function findChannels(query) {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=10`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok, findChannel() ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const channelIds = data.items.map(item => item.id.channelId).join(',');
                getDetails(channelIds);
            })
            .catch(error => console.error('Error:', error));
    }

    function findHandle(handle) {        
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&key=${apiKey}&maxResults=1`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok, findHandle() ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const channelIds = data.items.map(item => item.id.channelId).join(',');
                getDetails(channelIds);
            })
            .catch(error => console.error('Error:', error));
    }

    // To display trending, obtain trending videos, get channel ID, display that channel
    function showTrending() {        
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&key=${apiKey}&maxResults=50`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok, showTrending() ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const channelIds = [...new Set(data.items.map(item => item.snippet.channelId))].join(',');
                getDetails(channelIds);
            })
            .catch(error => console.error('Error:', error));
    }

    function getDetails(channelIds) {        
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelIds}&key=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok, getDetails() ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                display(data.items);
            })
            .catch(error => console.error('Error:', error));
    }

    function display(channels) {
        const results = document.getElementById('results');
        results.innerHTML = '';

        channels.forEach(channel => {
            const channelElement = document.createElement('div');
            channelElement.classList.add('channel');

            const thumbnail = document.createElement('img');
            thumbnail.src = channel.snippet.thumbnails.default.url;

            const info = document.createElement('div');
            info.classList.add('channel-info');

            const title = document.createElement('h2');
            title.textContent = channel.snippet.title;

            const moreLink = document.createElement('a');
            moreLink.href = "#";
            moreLink.innerHTML = "<strong>See more...</strong>";
            moreLink.style.fontSize = "18px";
            moreLink.addEventListener('click', function (e) {
                e.preventDefault();
                const description = document.createElement('p');
                description.innerHTML = "<strong>Description:</strong> " + `${ channel.snippet.description }`;

                const dateCreated = document.createElement('p');
                dateCreated.innerHTML = "<strong>Date Created:</strong> " + `${new Date(channel.snippet.publishedAt).toLocaleDateString()}`;

                const country = document.createElement('p');
                country.innerHTML = "<strong>Country:</strong> " + `${channel.brandingSettings.channel.country || 'Not specified'}`;

                info.appendChild(description);
                info.appendChild(dateCreated);
                info.appendChild(country);
                moreLink.remove();
            });

            const subscribers = document.createElement('p');
            subscribers.innerHTML = "<strong>Subscribers:</strong> " + `${parseInt(channel.statistics.subscriberCount).toLocaleString()}`;

            const videoCount = document.createElement('p');
            videoCount.innerHTML = "<strong>Videos:</strong> " + `${parseInt(channel.statistics.videoCount).toLocaleString()}`;

            info.appendChild(title);
            info.appendChild(subscribers);
            info.appendChild(videoCount);
            info.appendChild(moreLink);
            channelElement.appendChild(thumbnail);
            channelElement.appendChild(info);
            results.appendChild(channelElement);
        });
    }
});
