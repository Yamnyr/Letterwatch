function addNewLink() {
    const actionsList = document.querySelector('ul.js-actions-panel');
    const body = document.body;

    if (actionsList && body) {
        const tmdbId = body.getAttribute('data-tmdb-id');

        if (tmdbId) {
            const newLi = document.createElement('li');
            const newLink = document.createElement('a');
            newLink.href = `https://vidsrc.to/embed/movie/${tmdbId}`;
            newLink.textContent = 'Watch';
            newLink.target = '_blank';
            newLi.appendChild(newLink);
            actionsList.appendChild(newLi);
        }
    }
}

addNewLink();