function injectCss() {
    const style = document.createElement('style');
    style.textContent = `
        div.content-wrap {
            width: 1200px !important;
        }
        div.col-17 {
            width: 920px !important;
        }
        section.section.col-10.col-main {
            width: 640px !important;
        }
        .film-popular-review .film-detail-content {
            width: 820px!important;
        }        
        .iframe-container {
            margin-bottom: 25px;
            position: relative;
        }
        .iframe-container iframe {
            width: 100%;
            height: 400px;
            border: 1px solid #303840;
            border-radius: 5px;
        }
        .iframe-controls {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .iframe-controls .btn-group {
            display: flex;
            gap: 5px;
        }
        .iframe-controls button {
            border: none;
            border-radius: 3px;
            margin: 0;
            padding: 6px 12px;
            background: #445566;
            color: #8a9baa;
            cursor: pointer;
            font-weight: bold;
            transition-duration: 0.3s;
        }
        .iframe-controls button:hover {
            color: white;
        }
        .tooltip-label {
            position: relative;
            display: inline-block;
            cursor: pointer;
        }
        .tooltip-label .tooltip-text {
            visibility: hidden;
            width: 280px;
            background-color: rgba(85, 85, 85, 0.86);
            color: #fff;
            text-align: center;
            border-radius: 5px;
            padding: 5px 0;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.3s;
        }
        .tooltip-label:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
        }
        .btn-group button.active {
            color: white !important;
            background-color: #00ac1c;
        }
    `;
    document.head.appendChild(style);
}