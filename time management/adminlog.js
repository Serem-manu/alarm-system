const adminCredentials = { id: 'admin', password: 'admin123' };
function adminLogin() {
    const adminId = document.getElementById('adminId').value;
    const adminPassword = document.getElementById('adminPassword').value;

    if (adminCredentials.id === adminId && adminCredentials.password === adminPassword) {
        alert("Welcome, " + adminId + "! You are now logged in as an admin.");
        window.location.href = 'admin.html';
    } else {
        alert('Invalid admin credentials. Please try again.');
    }
}
function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
