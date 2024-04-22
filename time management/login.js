


function login() {
    const employeeId = document.getElementById('employeeId').value;
    const password = document.getElementById('password').value;

    const employee = employeeData.find(emp => emp.id === employeeId && emp.password === password);
    const isAdmin = adminCredentials.id === employeeId && adminCredentials.password === password;

    if (employee) {
        isLoggedIn = true;
        redirectToLoggedInPage();
    } else if (isAdmin) {
        alert('Admin login successful!');
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

function redirectToLoggedInPage() {
    const employeeId = document.getElementById('employeeId').value;
    alert("Welcome " + employeeId);
    window.location.href = './checkin/login.html';
}

function muteCheckin() {
    document.getElementById("checkIn").disabled = true;

    setTimeout(function () {
        document.getElementById("checkIn").disabled = false;
    }, 24 * 60 * 60 * 1000);
}

function checkIn() {
    const currentTime = new Date().getHours();
    const currentMinutes = new Date().getMinutes();
    const checkInStartTime = 10;
    const checkInEndTime = 10;
    const checkInEndMinutes = 20;

    if (
        (currentTime === checkInStartTime && currentMinutes <= checkInEndMinutes) ||
        (currentTime > checkInStartTime && currentTime < checkInEndTime)
    ) {
        alert('Check-In successful!');
        hasCheckedIn = true;
        muteCheckin();
    } else {
        alert('Check-In not allowed at this time.');
    }
}

function muteCheckout() {
    document.getElementById("checkOut").disabled = true;

    setTimeout(function () {
        document.getElementById("checkOut").disabled = false;
    }, 24 * 60 * 60 * 1000);
}

function checkOut() {
    const currentTime = new Date().getHours();

    if (currentTime >= 16) {
        alert('Check-Out successful!');
        muteCheckout();
    } else {
        alert('Check-Out not allowed at this time.');
    }
}

