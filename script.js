const loginForm = document.getElementById('login-form');
        const timetableContainer = document.querySelector('.timetable-container');
        const timetableForm = document.getElementById('timetable-form');
        const timetableTable = document.getElementById('timetable').getElementsByTagName('tbody')[0];
        const downloadButton = document.getElementById('download-timetable');
        const createTimetableForm = document.getElementById('create-timetable-form');

        let timetable = [];
        let availableSlots = [
            { day: 'Monday', time: '8:00 AM - 10:00 AM' },
            { day: 'Monday', time: '10:30 AM - 12:30 PM' },
            { day: 'Monday', time: '1:00 PM - 3:00 PM' },
            { day: 'Monday', time: '3:30 PM - 5:30 PM' },
            { day: 'Tuesday', time: '8:00 AM - 10:00 AM' },
            { day: 'Tuesday', time: '10:30 AM - 12:30 PM' },
            { day: 'Tuesday', time: '1:00 PM - 3:00 PM' },
            { day: 'Tuesday', time: '3:30 PM - 5:30 PM' },
            { day: 'Wednesday', time: '8:00 AM - 10:00 AM' },
            { day: 'Wednesday', time: '10:30 AM - 12:30 PM' },
            { day: 'Wednesday', time: '1:00 PM - 3:00 PM' },
            { day: 'Wednesday', time: '3:30 PM - 5:30 PM' },
            { day: 'Thursday', time: '8:00 AM - 10:00 AM' },
            { day: 'Thursday', time: '10:30 AM - 12:30 PM' },
            { day: 'Thursday', time: '1:00 PM - 3:00 PM' },
            { day: 'Thursday', time: '3:30 PM - 5:30 PM' },
            { day: 'Friday', time: '8:00 AM - 10:00 AM' },
            { day: 'Friday', time: '10:30 AM - 12:30 PM' },
            { day: 'Friday', time: '1:00 PM - 3:00 PM' },
            { day: 'Friday', time: '3:30 PM - 5:30 PM' }
        ];

        const subjects = ['Maths', 'English', 'Biology', 'Chemistry', 'Kiswahili', 'Geography', 'History', 'CRE', 'Business', 'Agriculture'];

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === 'admin' && password === 'pass123') {
                loginForm.style.display = 'none';
                timetableContainer.style.display = 'block';
                generateTimetable();
            } else {
                alert('Invalid username or password');
            }
        });

        function generateTimetable() {
            const classes = ['FORM 1', 'FORM 2', 'FORM 3', 'FORM 4'];
            for (const class_ of classes) {
                for (const subject of subjects) {
                    bookClass(class_, subject);
                }
            }
            updateTimetableTable();
        }

        function bookClass(class_, subject) {
            const existingEntry = timetable.find(entry => entry.class === class_ && entry.subject === subject);
            if (existingEntry) {
                return;
            }

            const availableSlot = getAvailableSlot();
            if (!availableSlot) {
                return;
            }

            timetable.push({ class: class_, subject: subject, day: availableSlot.day, time: availableSlot.time });
        }

        function getAvailableSlot() {
            const freeSlots = availableSlots.filter(slot => !timetable.some(entry => entry.day === slot.day && entry.time === slot.time));
            if (freeSlots.length === 0) {
                return null;
            }
            return freeSlots[Math.floor(Math.random() * freeSlots.length)];
        }

        function updateTimetableTable() {
            timetableTable.innerHTML = '';
            timetable.forEach((entry, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.class}</td>
                    <td>${entry.subject}</td>
                    <td>${entry.day}</td>
                    <td>${entry.time}</td>
                    <td><button class="delete-button" data-index="${index}">Delete</button></td>
                `;
                timetableTable.appendChild(row);
            });

            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const index = parseInt(button.dataset.index);
                    deleteTimetable(index);
                });
            });
        }

        downloadButton.addEventListener('click', () => {
            downloadTimetable();
        });

        function downloadTimetable() {
            const data = timetable.map(entry => `${entry.class},${entry.subject},${entry.day},${entry.time}`).join('\n');
            const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'timetable.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function deleteTimetable(index) {
            timetable.splice(index, 1);
            updateTimetableTable();
        }

        createTimetableForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const classInput = document.getElementById('class');
            const subjectInput = document.getElementById('subject');
            const dayInput = document.getElementById('day');
            const timeInput = document.getElementById('time');

            const newTimetableEntry = {
                class: classInput.value,
                subject: subjectInput.value,
                day: dayInput.value,
                time: timeInput.value
            };

            timetable.push(newTimetableEntry);
            updateTimetableTable();

            classInput.value = '';
            subjectInput.value = '';
            dayInput.value = '';
            timeInput.value = '';
        });
    