const alarmButton = document.getElementById('alarm-button');
const alarmStatus = document.getElementById('alarm-status');
const frontDoorStatus = document.getElementById('front-door-status');
const windowStatus = document.getElementById('window-status');
const motionStatus = document.getElementById('motion-status');
const activityLog = document.getElementById('activity-log');
const alarmSound = document.getElementById('alarm-sound');

let isArmed = true;
let hasMotion = false;

alarmButton.addEventListener('click', () => {
  if (isArmed) {
    alarmButton.textContent = 'Arm';
    alarmStatus.textContent = 'Disarmed';
    isArmed = false;
    logActivity('Alarm disarmed');
  } else {
    alarmButton.textContent = 'Disarm';
    alarmStatus.textContent = 'Armed';
    isArmed = true;
    logActivity('Alarm armed');
  }
});

setInterval(() => {
  const frontDoorOpen = Math.random() < 0.1;
  const windowOpen = Math.random() < 0.1;
  const motionDetected = Math.random() < 0.1;

  if (frontDoorOpen) {
    frontDoorStatus.textContent = 'Open';
    logActivity('Front door opened');
  } else {
    frontDoorStatus.textContent = 'Closed';
  }

  if (windowOpen) {
    windowStatus.textContent = 'Open';
    logActivity('Window opened');
  } else {
    windowStatus.textContent = 'Closed';
  }

  if (motionDetected) {
    motionStatus.textContent = 'Motion Detected';
    hasMotion = true;
    logActivity('Motion detected');
  } else {
    motionStatus.textContent = 'No Motion';
    hasMotion = false;
  }

  if (isArmed && (frontDoorOpen || windowOpen || hasMotion)) {
    alert('Intruder alert!');
    logActivity('Intruder alert!');
    playAlarmSound();
  }
}, 2000);

function logActivity(message) {
  const logItem = document.createElement('li');
  logItem.textContent = `[${new Date().toLocaleString()}] ${message}`;
  activityLog.prepend(logItem);
}

function playAlarmSound() {
  alarmSound.play();
  setTimeout(() => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }, 10000);
}