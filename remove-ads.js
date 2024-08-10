function removeUnwantedDivs() {
    function removeDivs() {
        const allDivs = document.querySelectorAll('div');
        allDivs.forEach(div => {
            if ([...div.classList].some(className => className.includes('pw')) ||
                div.classList.contains('upgrade-kicker') ||
                div.id === 'pw-oop-bottom_rail') {
                div.remove();
            }
        });
    }
    removeDivs();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'DIV') {
                            if ([...node.classList].some(className => className.includes('pw')) ||
                                node.classList.contains('upgrade-kicker') ||
                                node.id === 'pw-oop-bottom_rail') {
                                node.remove();
                            }
                        }
                        removeDivs();
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}