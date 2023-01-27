
const INTERNAL_SCRIPTS = [
    'netflix_max_bitrate.js'
];

// promisify chrome storage API for easier chaining
function chromeStorageGet(opts) {
    return new Promise(resolve => {
        chrome.storage.sync.get(opts, resolve);
    });
} 

function addSettingsToHtml(settings) {
    const mainScript = document.createElement('script');
    mainScript.type = 'application/json';
    mainScript.text = JSON.stringify(settings);
    mainScript.id = "netflix-1080p-settings";
    document.documentElement.appendChild(mainScript);

    console.log("Loaded settings");
}

chromeStorageGet({
    use6Channels: true,
    setMaxBitrate: true,
    useAv1: true,
    disableVP9: false,
    disableAVChigh: false,
    showAllSubs: false,
}).then(items => {
    addSettingsToHtml(items);
}).then(() => {
    for (let i = 0; i < INTERNAL_SCRIPTS.length; i++) {
        const mainScriptUrl = chrome.runtime.getURL(INTERNAL_SCRIPTS[i]);
    
        const mainScript = document.createElement('script');
        mainScript.type = 'application/javascript';
        mainScript.src = mainScriptUrl;
        document.documentElement.appendChild(mainScript);
    }
});