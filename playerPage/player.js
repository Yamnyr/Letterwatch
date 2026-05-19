document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const tmdbId = urlParams.get('id');

    if (tmdbId) {
        const iframe = document.getElementById('vidSrcPlayer');
        iframe.src = `https://vidsrc.cc/v3/embed/movie/${tmdbId}`;
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "origin";

        const btnGroup = document.querySelector('.btn-group');

        const players = [

            { name: 'Lecteur 1', url: `https://vidsrc.cc/v3/embed/movie/${tmdbId}`, disabled: false },
            { name: 'Lecteur 2', url: `https://vidsrc.cc/v3/embed/movie/${tmdbId}` },
            { name: 'Lecteur 3', url: `https://vidlink.pro/movie/${tmdbId}?primaryColor=00e054&secondaryColor=00e054&iconColor=ffffff&icons=default&player=default&title=true&poster=true&autoplay=false&nextbutton=false&sub_label=french`, disabled: false },
            { name: 'Lecteur 4', url: `https://www.kaitovault.com/watch/movie/${tmdbId}`, disabled: false },
            { name: 'Lecteur 5', url: `https://www.m-zone.org/watch/movie/${tmdbId}`, disabled: false },
            { name: 'Lecteur 6', url: `https://vidfast.me/movie/${tmdbId}?autoPlay=false&theme=E50914`, disabled: false },
            // { name: 'Lecteur 15', url: `https://streamgoblin.com/player/movie/${tmdbId}`, disabled: false },
            // { name: 'Lecteur 16', url: `https://moviepire.org/watch/${tmdbId}`, disabled: false }
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