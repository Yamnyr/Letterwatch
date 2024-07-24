document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['letterboxd', 'tmdb'], function(items) {
        document.getElementById('letterboxd').checked = items.letterboxd || false;
        document.getElementById('tmdb').checked = items.tmdb || false;
    });

    document.getElementById('save').addEventListener('click', function() {
        let letterboxd = document.getElementById('letterboxd').checked;
        let tmdb = document.getElementById('tmdb').checked;
        chrome.storage.sync.set({letterboxd: letterboxd, tmdb: tmdb}, function() {
            console.log('Settings saved');
            window.close();
        });
    });
});