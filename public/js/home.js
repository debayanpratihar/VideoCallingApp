'use strict';

// Log current location
console.log('Home', window.location);

// Get broadcastID from query parameter
const broadcastID = new URLSearchParams(window.location.search).get('id');

// DOM elements
const body = document.querySelector('body');
const supportDiv = document.getElementById('supportDiv');
const support = document.getElementById('support');
const userName = document.getElementById('userName');
const broadcasterIdLabel = document.getElementById('broadcasterIdLabel');
const broadcasterId = document.getElementById('broadcasterId');
const broadcasterIdRandom = document.getElementById('broadcasterIdRandom');
const broadcasterLabel = document.getElementById('broadcasterLabel');
const broadcaster = document.getElementById('broadcaster');
const viewer = document.getElementById('viewer');
const mode = document.getElementById('mode');

// Handle element display based on broadcastID
if (broadcastID) {
    elementDisplay(broadcasterIdLabel, false);
    elementDisplay(broadcasterIdRandom, false);
    elementDisplay(broadcasterId, false);
    elementDisplay(broadcasterLabel, false);
    elementDisplay(broadcaster, false);
}

// Support the project - Thank you!
support.addEventListener('click', getSupport);

function getSupport() {
    openURL('https://www.linkedin.com/in/debayanpratihar', true);
}

// Handle username
userName.value = window.localStorage.name || `User-${getRandomInt(99999)}`;

// Handle broadcaster aka room id
broadcasterId.value = broadcastID || window.localStorage.room || getUUID4();

broadcasterIdRandom.addEventListener('click', setRandomId);

function setRandomId() {
    broadcasterId.value = getUUID4();
}

// Join as Broadcast
broadcaster.addEventListener('click', startBroadcaster);

function startBroadcaster() {
    if (isFieldsOk() && checkTime()) {
        window.location.href = `/broadcast?id=${broadcasterId.value}&name=${userName.value}`;
    }
}

// Join as Viewer
viewer.addEventListener('click', startViewer);

function startViewer() {
    if (isFieldsOk() && checkTime()) {
        window.location.href = `/viewer?id=${broadcasterId.value}&name=${userName.value}`;
    }
}

// Handle theme
const getMode = window.localStorage.mode || 'dark';
mode.checked = false;
if (getMode && getMode === 'dark') {
    body.classList.toggle('dark');
    mode.checked = true;
}
mode.onchange = setTheme;

function setTheme() {
    body.classList.toggle('dark');
    window.localStorage.mode = body.classList.contains('dark') ? 'dark' : 'light';
    playSound('switch');
}

// Handle fields validation
function isFieldsOk() {
    if (userName.value == '') {
        popupMessage('warning', 'Username', 'Username field empty!');
        return false;
    }
    if (broadcasterId.value == '') {
        popupMessage('warning', 'Room Id', 'Room ID field empty!');
        return false;
    }
    window.localStorage.name = userName.value;
    window.localStorage.room = broadcasterId.value;
    return true;
}

// Check if the current time is between 6 PM and 12 AM
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

// Enable buttons if within allowed time range
function enableButtons() {
    support.disabled = false;
    userName.disabled = false;
    broadcasterId.disabled = false;
    broadcaster.disabled = false;
    viewer.disabled = false;
    mode.disabled = false;
}

// Disable buttons initially
function disableButtons() {
    support.disabled = true;
    userName.disabled = true;
    broadcasterId.disabled = true;
    broadcaster.disabled = true;
    viewer.disabled = true;
    mode.disabled = true;
}

// Initialize page
function initializePage() {
    if (checkTime()) {
        enableButtons();
    } else {
        disableButtons();
    }
}

// Call initializePage when the content is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Hide Elements
!html.support && elementDisplay(supportDiv, false);
//...
