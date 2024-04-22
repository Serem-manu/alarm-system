const table = document.getElementById('employeeTable');
    table.innerHTML = "<tr><th>Employee ID</th><th>Login Time</th><th>Logout Time</th><th>Hours Worked</th></tr>";

    data.forEach(employee => {
        const loginTime = new Date(employee.loginTime);
        const logoutTime = new Date(employee.logoutTime);
        const hoursWorked = ((logoutTime - loginTime) / (1000 * 60 * 60)).toFixed(2);

        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.textContent = employee.id;
        cell2.textContent = employee.loginTime;
        cell3.textContent = employee.logoutTime;
        cell4.textContent = hoursWorked;
    });
