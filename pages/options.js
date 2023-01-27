function save_options() {
    const use6Channels = document.getElementById("use51").checked;
    const setMaxBitrate = document.getElementById("setMaxBitrate").checked;
    const useAv1 = document.getElementById("useAv1").checked;
    const disableVP9 = document.getElementById("disableVP9").checked;
    const disableAVChigh = document.getElementById("disableAVChigh").checked;
    const showAllSubs = document.getElementById("showAllSubs").checked;

    chrome.storage.sync.set({
        use6Channels,
        setMaxBitrate,
        useAv1,
        disableVP9,
        disableAVChigh,
        showAllSubs,
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        use6Channels: true,
        setMaxBitrate: true,
        useAv1: true,
        disableVP9: false,
        disableAVChigh: false,
        showAllSubs: false,
    }, function(items) {
        document.getElementById("use51").checked = items.use6Channels;
        document.getElementById("setMaxBitrate").checked = items.setMaxBitrate;
        document.getElementById("useAv1").checked = items.useAv1;
        document.getElementById("disableVP9").checked = items.disableVP9;
        document.getElementById("disableAVChigh").checked = items.disableAVChigh;
	    document.getElementById("showAllSubs").checked = items.showAllSubs;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);