let date = new Date();
let activeDay;
let theDate = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let headerMonth = document.getElementById("headerMonth");
const eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventWrapper = document.querySelector(".add-event-wrapper "),
    addEventSubmit = document.querySelector(".add-event-btn"),
    addEventBtn = document.getElementById('buttAddEvent'),
    addEventCloseBtn = document.querySelector('.close'),
    addEventTitle = document.querySelector('.event-name'),
    addEventFrom = document.querySelector('.event-time-from'),
    addEventTo = document.querySelector('.event-time-to');


let activeMonth;
let activeYear;
let weekday = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];

let monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'October',
    'November',
    'December',
]

let eventsArr = [];
getEvents();

// Generate a Calendar
function displayCalendar() {

    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    console.log(daysInMonth);

    let daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    console.log("daysInPrevMonth is " + daysInPrevMonth);

    let firstDay = new Date(currentYear, currentMonth, 1);

    //Returns the day of the week (0 – 6) for the specified date according to local time.
    // By default 0 is a Sunday, let's change it to 6, because weekday array starts from Monday
    let startingDay = firstDay.getDay();
    if (startingDay == 0) {
        startingDay = 6
    } else {
        startingDay--;
    }
    //Then 6 is Sunday 

    // creating table header
    const table = document.createElement("table");
    document.querySelector('#calendar-table').appendChild(table);
    const headerRow = document.createElement("tr");
    let headerMonth = document.createElement("th");
    headerMonth.setAttribute('id', 'headerMonth');
    headerMonth.colSpan = 7;
    headerMonth.innerHTML = date.toLocaleString('default', {
        month: 'long'
    }) + " " + currentYear
    headerRow.appendChild(headerMonth);
    table.appendChild(headerRow);

    // create table for days of the week
    let weekDaysRow = document.createElement('tr');
    for (let i = 0; i < 7; i++) {
        let weekDayHeader = document.createElement('th');
        weekDayHeader.innerHTML = weekday[i];
        weekDaysRow.appendChild(weekDayHeader);
    }

    table.appendChild(weekDaysRow);

    let currentDay = 1;
    let currentRow = document.createElement("tr");

    // Create cells for the last dates of the previous month
    for (let i = startingDay; i > 0; i--) {
        let prevCell = document.createElement("td");
        prevCell.innerHTML = daysInPrevMonth - i + 1;
        currentRow.appendChild(prevCell);
        prevCell.setAttribute('class', 'prevDays');
    }

    //create the first week of the current month
    for (let i = startingDay; i < 7; i++) {
        let dayCell = document.createElement("td");
        dayCell.innerHTML = currentDay;
        currentRow.appendChild(dayCell);
        addActiveClass(dayCell, currentDay);
        // if (activeDay == currentDay &&
        //     activeMonth == currentMonth &&
        //     activeYear == currentYear) {
        //     dayCell.setAttribute("class", 'active');
        // }
        let fixedMonthIndex = currentMonth + 1;
        console.log("fixedMonthIndex is " + fixedMonthIndex);
        // add event class to the cell if the event exist
        if (addEventClassToCells(dayCell.innerHTML, fixedMonthIndex)) {
            console.log("add a class");
            dayCell.classList.add('event');
        };
        currentDay++;
    }
    table.appendChild(currentRow);


    let nextMonthDates = 1;
    while (currentDay <= daysInMonth) {
        currentRow = document.createElement("tr");

        // // Create cells for the first dates of the next month 
        for (let i = 0; i < 7; i++) {
            if (currentDay > daysInMonth) {
                for (let j = i; j < 7; j++) {
                    let dayCell = document.createElement("td");
                    dayCell.innerHTML = nextMonthDates;
                    currentRow.appendChild(dayCell);
                    dayCell.setAttribute('class', 'lastDays');
                    nextMonthDates++;
                };
                break;
            }

            let dayCell = document.createElement("td");
            dayCell.innerHTML = currentDay;
            addActiveClass(dayCell, currentDay)
            // if (activeDay == currentDay &&
            //     activeMonth == currentMonth &&
            //     activeYear == currentYear) {
            //     dayCell.setAttribute("class", 'active');
            // }
            currentRow.appendChild(dayCell);
            if (currentDay == date.getDate() && currentMonth == new Date().getMonth()) {
                dayCell.setAttribute('id', 'today');

                // show all events and the date of today in notes after right after page load
                if (activeDay == undefined) {
                    dayCell.setAttribute("class", 'active');
                    getActiveDay(currentDay);
                    updateEvents(currentDay);
                }
            }
            let fixedMonthIndex = currentMonth + 1;
            console.log("fixedMonthIndex is " + fixedMonthIndex);
            if (addEventClassToCells(dayCell.innerHTML, fixedMonthIndex)) {
                console.log("add a class");
                dayCell.classList.add('event');
            };
            currentDay++;
        }
        table.appendChild(currentRow);
    }

    //Create an additional 8-th row in the calendar, if there are only 7
    totalRowCount = table.rows.length;
    if (totalRowCount == 7) {
        currentRow = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            let dayCell = document.createElement("td");
            dayCell.innerHTML = nextMonthDates;
            currentRow.appendChild(dayCell);
            dayCell.setAttribute('class', 'lastDays');
            nextMonthDates++;
        }
        table.appendChild(currentRow);
    }

    createButt();
    addListner(headerMonth);
}

function addActiveClass(dayCell, currentDay) {
    if (activeDay == currentDay &&
        activeMonth == currentMonth &&
        activeYear == currentYear) {
        dayCell.setAttribute("class", 'active');
    }
}

// create buttons for the previous and next month 
function createButt() {
    // Create button for previous month
    let buttPrev = document.createElement('button');
    buttPrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    buttPrev.setAttribute('id', 'buttPrev');
    buttPrev.addEventListener("click", function () {
        console.log('Button Previous');
        date.setMonth(date.getMonth() - 1);
        currentMonth = date.getMonth();
        if (currentMonth == 11) {
            currentYear--;
        }
        document.querySelector('#calendar-table').innerHTML = '';
        displayCalendar();
    });
    document.getElementById('headerMonth').appendChild(buttPrev);

    // Create button for next month
    let buttNext = document.createElement('button');
    buttNext.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    buttNext.setAttribute('id', 'buttNext');
    buttNext.addEventListener("click", function () {
        date.setMonth(date.getMonth() + 1);
        currentMonth = date.getMonth();
        if (currentMonth == 0) {
            currentYear++;
        }
        document.querySelector('#calendar-table').innerHTML = '';
        displayCalendar();
    });
    document.getElementById('headerMonth').appendChild(buttNext);
}

function addListner() {
    const days = document.querySelectorAll("td");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {

            // set current day as active day
            activeDay = Number(e.target.innerHTML);

            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });

            if (e.target.classList.contains("prevDays")) {
                date.setMonth(date.getMonth() - 1);
                currentMonth = date.getMonth();
                if (currentMonth == 11) {
                    currentYear--;
                }
                document.querySelector('#calendar-table').innerHTML = '';
                displayCalendar();

                //if today date exist in the month, remove active class
                let todayDate = document.getElementById('today');
                if (todayDate) {
                    todayDate.classList.remove("active");
                }
                setTimeout(() => {
                    //select all days of that month
                    const days = document.querySelectorAll("td");

                    //after going to prev month add active to clicked
                    days.forEach((day) => {
                        if (
                            !day.classList.contains('prevDays') &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");

                        }
                    });
                }, 100);

                // same with next month days
            } else if (e.target.classList.contains("lastDays")) {
                date.setMonth(date.getMonth() + 1);
                currentMonth = date.getMonth();
                if (currentMonth == 0) {
                    currentYear++;
                }
                document.querySelector('#calendar-table').innerHTML = '';
                displayCalendar();

                //if today date exist in the month, remove active class
                let todayDate = document.getElementById('today');
                if (todayDate) {
                    todayDate.classList.remove("active");
                }

                setTimeout(() => {
                    //select all days of that month
                    const days = document.querySelectorAll("td");

                    //after going to next month add active to clicked
                    days.forEach((day) => {
                        if (
                            !day.classList.contains('lastDays') &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");

                        }
                    });
                }, 100);
            } else {
                // remaining current month days
                e.target.classList.add("active");
            }

            // call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));
        })
    });
}

// function return true if the event's date match to the calendar date
function addEventClassToCells(i, fixedMonthIndex) {
    for (const eventObj of eventsArr) {
        if (
            eventObj.day == i &&
            eventObj.month == fixedMonthIndex &&
            eventObj.year == currentYear
        ) {
            return true;
        }
    }
    return false;
}

// let's show active any events and date at the top of the notes
function getActiveDay(headerMonth) {
    setTimeout(() => {
        const day = new Date(currentYear, currentMonth, headerMonth);
        const dayName = day.toString().split(" ")[0];
        eventDay.innerHTML = dayName;
        // console.log(eventDay + " is eventDay")
        eventDate.innerHTML = headerMonth + " " + monthsOfYear[day.getMonth()] + " " + day.getFullYear();
        activeMonth = day.getMonth();
        activeYear = day.getFullYear();
    }, 100);
}

//function update events when a day is active
function updateEvents(headerMonth) {
    let events = "";
    eventsArr.forEach((event) => {
        if (
            headerMonth === event.day &&
            currentMonth + 1 === event.month &&
            currentYear === event.year
        ) {
            // then show event on document
            event.events.forEach((event) => {
                events += `<div class="event">
              <div class="title">
                <i class="fas fa-circle"></i>
                <h3 class="event-title">${event.title}</h3>
              </div>
              <div class="event-time">
                <span class="event-time">${event.time}</span>
              </div>
          </div>`;
            });
        }
    });
    // if nothing found
    if (events === "") {
        events = `<div class="no-event">
              <h3>No Events</h3>
          </div>`;
    }
    console.log(events);
    eventsContainer.innerHTML = events;

    // save events when update event called
    saveEvents();

}

displayCalendar();


// New event

addEventBtn.addEventListener("click", function () {
    addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", function () {
    addEventWrapper.classList.remove("active");
});

// if click outside
document.addEventListener('click', (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
        addEventWrapper.classList.remove("active");
    }
});

//allow only 50 chars in title
if (addEventTitle) {
    addEventTitle.addEventListener("input", (e) => {
        addEventTitle.value = addEventTitle.value.slice(0, 50);
    });
}

//time format in from and to time
addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    // divide number with :
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }
    //don't let user to enter more, than 5 chars
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    // divide number with :
    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    //don't let user to enter more, than 5 chars
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

//let's create function to add event
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    // some validations
    if (eventTitle == '' || eventTimeFrom == '' ||
        eventTimeTo == '') {
        alert("Please fill all the fields!");
        return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (
        timeFromArr.length != 2 ||
        timeToArr.length != 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
    ) {
        alert("Invalid time format");
        return;
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    //check if event is already added
    let eventExist = false;
    eventsArr.forEach((event) => {
        if (
            event.day === activeDay &&
            event.month === currentMonth + 1 &&
            event.year === currentYear
        ) {
            event.events.forEach((event) => {
                if (event.title === eventTitle) {
                    eventExist = true;
                }
            });
        }
    });

    if (eventExist) {
        alert("Event already added");
        return;
    }

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
    }

    let eventAdded = false;

    // check if eventsArr is not empty
    if (eventsArr.length > 0) {
        // check if current ay has already any event then add to that
        eventsArr.forEach((item) => {
            if (
                item.day == activeDay &&
                item.month == currentMonth + 1 &&
                item.year == currentYear
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    // if eventsArr is empty or currentDay has no event: create new
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: currentMonth + 1,
            year: currentYear,
            events: [newEvent],
        });
    }

    // remove active from addEvent form
    addEventWrapper.classList.remove('active');
    // cleare the fields
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    // show current added event
    updateEvents(activeDay);

    //also add event class to newly added day if not already
    const activeDayEl = document.querySelector('td.active');
    if (!activeDayEl.classList.contains('event')) {
        activeDayEl.classList.add('event');
    }
})

function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? 'PM' : 'AM';
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

// let's create a function to remove events on click
eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains('event')) {
        if (confirm("Are you sure you want to delete this event?")) {
            const eventTitle = e.target.children[0].children[1].innerHTML;
            // get the title of event than search in array by title and delete
            eventsArr.forEach((event) => {
                if (
                    event.day == activeDay &&
                    event.month == currentMonth + 1 &&
                    event.year == currentYear
                ) {
                    event.events.forEach((item, index) => {
                        if (item.title == eventTitle) {
                            event.events.splice(index, 1);
                        }
                    });

                    // if no event remaining on that day - remove complete day
                    if (event.events.length == 0) {
                        eventsArr.splice(eventsArr.indexOf(event), 1);

                        //after removing all events of the day also remove event class of that day
                        const activeDayEl = document.querySelector("td.active");
                        if (activeDayEl.classList.contains('event')) {
                            activeDayEl.classList.remove('event');
                        }
                    }
                }

            });
            // after removing from array update event
            updateEvents(activeDay);
        }
    }
})

// let's store events in local storage get from here
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(eventsArr));
}

function getEvents() {
    if (localStorage.getItem("events") == null) {
        return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}


// Get your current position

let lat;
let long;

function getPosition() {

    const success = (position) => {
        console.log(position);
        lat = position.coords.latitude;
        long = position.coords.longitude;

        function getCity() {
            console.log(lat)
            console.log(long)
            fetch(
                "http://api.openweathermap.org/geo/1.0/reverse?lat="
                + lat
                + "&lon="
                + long
                + "&limit=2&appid="
                // + 'e9ca98e57b68488e060c64799d86e7fc'
            ).then((response) => response.json())
                .then((data) => weather.fetchWeather(data));
        }

        let weather = {
            // apiKey: "e9ca98e57b68488e060c64799d86e7fc",

            fetchWeather: function (data) {
                console.log(data)
                let city = data[0].name;
                console.log(city);
                fetch(
                    "https://api.openweathermap.org/data/2.5/weather?q="
                    + city
                    + "&units=metric&appid="
                    + this.apiKey
                ).then((response) => response.json())
                    .then((data) => this.displayWeather(data));
            },
            displayWeather: function (data) {
                const { name } = data;
                const { icon, description } = data.weather[0];
                const { temp, humidity } = data.main;
                const { speed } = data.wind;
                document.querySelector(".city").innerText = "Weather in " + name;
                document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                document.querySelector(".description").innerText = description;
                document.querySelector(".temp").innerText = parseInt(temp) + "°C";
                document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
                document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
                console.log(name, icon, description, humidity, speed);
            }
        }

        getCity();
    }

    const error = () => {
        console.log('no');
        // window.status.textContent = 'Unable to retrieve your location';
    }

    navigator.geolocation.getCurrentPosition(success, error);
};
getPosition();




