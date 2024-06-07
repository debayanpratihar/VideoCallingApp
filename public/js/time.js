function checkTime() {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 18 || hours >= 24) {
        Swal.fire({
            icon: 'error',
            title: 'Unavailable',
            text: 'Video calls are only available from 6 PM to 12 AM.',
        });
        return false;
    }
    return true;
}

function enableButtons() {
    document.getElementById('support').disabled = false;
    document.getElementById('userName').disabled = false;
    document.getElementById('broadcasterId').disabled = false;
    document.getElementById('broadcaster').disabled = false;
    document.getElementById('viewer').disabled = false;
    document.getElementById('mode').disabled = false;
}

document.addEventListener('DOMContentLoaded', function() {
    if (checkTime()) {
        enableButtons();
    }
});

document.getElementById('broadcaster').addEventListener('click', function(event) {
    if (!checkTime()) {
        event.preventDefault();
    } else {
        // Add your existing code to start the broadcaster
    }
});

document.getElementById('viewer').addEventListener('click', function(event) {
    if (!checkTime()) {
        event.preventDefault();
    } else {
        // Add your existing code to start the viewer
    }
});
