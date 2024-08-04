document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tmdbId = urlParams.get('id');

    if (tmdbId) {
        const iframe = document.getElementById('vidSrcPlayer');
        // iframe.src = `https://vidsrc.to/embed/movie/${tmdbId}`;
        iframe.src = ` https://vidsrc.in/embed/movie?tmdb=${tmdbId}`;

        console.log(iframe.src)
    } else {
        document.body.innerHTML = '<p>Erreur: ID du film non trouvé.</p>';
    }
});