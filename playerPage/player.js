document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tmdbId = urlParams.get('id');

    if (tmdbId) {
        const iframe = document.getElementById('vidSrcPlayer');
        iframe.src = `https://vidsrc.pro/embed/movie/${tmdbId}`;
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "origin";

        const btnGroup = document.querySelector('.btn-group');

        const players = [
            // { name: 'Lecteur 1', url: `https://vidsrc.pro/embed/movie/${tmdbId}`, disabled: false },

            { name: 'Lecteur 1', url: `https://embed.su/embed/movie/${tmdbId}`, disabled: false },

            { name: 'Lecteur 2', url: `https://multiembed.mov/directstream.php?video_id=${tmdbId}&tmdb=1`, disabled: true },
            // { name: 'Lecteur 3', url: `https://player.vidbinge.com/media/tmdb-movie-${tmdbId}`, disabled: false },

            { name: 'Lecteur 3', url: `https://vidsrc.net/embed/movie/${tmdbId}`, disabled: false },
            // { name: 'Lecteur 4', url: `https://vidsrc.cc/v2/embed/movie/${tmdbId}`, disabled: false },
            { name: 'Lecteur 4', url: `https://vidsrc.cc/v3/embed/movie/${tmdbId}`, disabled: false },
            // { name: 'Lecteur fr', url: `https://frembed.pro/api/film.php?id=${tmdbId}`, disabled: false }
        ];

        // Variable pour stocker le bouton actif
        let activeButton = null;

        players.forEach((player, index) => {
            const button = document.createElement('button');
            button.textContent = player.name;
            button.disabled = player.disabled;

            // Activer le premier bouton non désactivé par défaut
            if (!player.disabled && !activeButton) {
                button.classList.add('active');
                activeButton = button;
            }

            if (!player.disabled) {
                button.onclick = () => {
                    // Retirer la classe active de l'ancien bouton
                    if (activeButton) {
                        activeButton.classList.remove('active');
                    }
                    // Ajouter la classe active au nouveau bouton
                    button.classList.add('active');
                    activeButton = button;

                    // Changer la source de l'iframe
                    iframe.src = player.url;
                };
            } else {
                button.style.backgroundColor = '#777';
                button.style.cursor = 'not-allowed';
            }

            btnGroup.appendChild(button);
        });
    } else {
        document.body.innerHTML = '<p>Erreur: ID du film non trouvé.</p>';
    }
});