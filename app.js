const workerURL = "https://lively-field-097a.00simpleuse.workers.dev";

function searchSongs() {
    const query = document.getElementById("search").value;

    fetch(`${workerURL}/?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            let resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";
            data.items.forEach(item => {
                let videoId = item.id.videoId;
                let title = item.snippet.title;
                let thumbnail = item.snippet.thumbnails.medium.url;
                let div = document.createElement("div");
                div.className = "song";
                div.innerHTML = `<img src="${thumbnail}" width="100%" /><p>${title}</p>`;
                div.onclick = () => playSong(videoId);
                resultsDiv.appendChild(div);
            });
        })
        .catch(err => {
            console.error("Error fetching songs:", err);
        });
}

function playSong(videoId) {
    document.getElementById("player").innerHTML = `
        <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" allowfullscreen></iframe>`;
}
