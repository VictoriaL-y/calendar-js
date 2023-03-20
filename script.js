let date = new Date();
let activeDay;
let theDate = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let headerMonth = document.getElementById("headerMonth");
const eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events");
let daysOfWeek = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

const eventsArr = [
    {
        day: 20,
        month: 3,
        year: 2023,
        events: [
            {
                title: "Event 1 ipsum dolor sit amet",
                time: "10:10 AM",
            },
            {
                title: "Event 2",
                time: "11:20 AM",
            },
        ],
    },
    {
        day: 22,
        month: 3,
        year: 2023,
        events: [
            {
                title: "Event 3 sit amet",
                time: "09:10 AM",
            },
            {
                title: "Event 4",
                time: "08:20 AM",
            },
        ],
    },
];

function displayCalendar() {
    console.log('Hey');


    // Generate a Calendar

    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    console.log(daysInMonth);

    let daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    console.log("daysInPrevMonth is " + daysInPrevMonth);



    let firstDay = new Date(currentYear, currentMonth, 1);
    // console.log(firstDay);

    //Returns the day of the week (0 – 6) for the specified date according to local time.
    // Now 0 is a Sunday
    let startingDay = firstDay.getDay();
    if (startingDay == 0) {
        startingDay = 6
    } else {
        startingDay--;
    }
    //Then 6 is Sunday 
    // console.log(startingDay);



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
        weekDayHeader.innerHTML = daysOfWeek[i];
        weekDaysRow.appendChild(weekDayHeader);
        // console.log(weekDayHeader);
    }

    table.appendChild(weekDaysRow);
    // console.log("starting day is:" + startingDay);

    let currentDay = 1;
    let currentRow = document.createElement("tr");

    // Create cells for the last dates of the previous month
    for (let i = startingDay; i > 0; i--) {
        let prevCell = document.createElement("td");
        prevCell.innerHTML = daysInPrevMonth - i + 1;
        currentRow.appendChild(prevCell);
        prevCell.setAttribute('class', 'prevDays');
        console.log(prevCell + 'prevCell is here');

    }

    //create the first week of the current month
    for (let i = startingDay; i < 7; i++) {
        let dayCell = document.createElement("td");
        dayCell.innerHTML = currentDay;
        currentRow.appendChild(dayCell);
        console.log(dayCell);
        currentDay++;
    }
    table.appendChild(currentRow);


    let nextMonthDates = 1;
    while (currentDay <= daysInMonth) {
        currentRow = document.createElement("tr");

        // // Create cells for the first dates of the next month 
        for (let i = 0; i < 7; i++) {
            if (currentDay > daysInMonth) {
                console.log("current day is " + currentDay);
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
            dayCell.addEventListener("click", function () {
                console.log("day cells work")
                console.log(dayCell);
            })

            currentRow.appendChild(dayCell);
            if (currentDay == date.getDate() && currentMonth == new Date().getMonth()) {
                console.log(currentMonth)
                dayCell.setAttribute('id', 'today');
                dayCell.setAttribute("class", 'active');
                // headerMonth = currentDay;
                // console.log("headerMonth is " + headerMonth);
            }
            currentDay++;
        }
        table.appendChild(currentRow);
    }

    //Create an additional 8-th row in the calendar, if there are only 7
    totalRowCount = table.rows.length;
    console.log("totalRowCount is " + totalRowCount);
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

    // Create button for previous month
    let buttPrev = document.createElement('button');
    buttPrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    console.log('Button Previous');
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
        console.log('Button Next');
        date.setMonth(date.getMonth() + 1);
        currentMonth = date.getMonth();
        if (currentMonth == 0) {
            currentYear++;
        }
        document.querySelector('#calendar-table').innerHTML = '';
        displayCalendar();
    });
    document.getElementById('headerMonth').appendChild(buttNext);


    

    // updateEvents(headerMonth);
    addListner(headerMonth);
 


}

function addListner() {
    const days = document.querySelectorAll("td");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            // set current day as active day
            activeDay = Number(e.target.innerHTML);
            // call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));
            
            

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
        })
    });
}


// let's show active any events and date at the top of the notes
function getActiveDay(headerMonth) {
    setTimeout(() => {
        const day = new Date(currentYear, currentMonth, headerMonth);
        const dayName = day.toString().split(" ")[0];
        eventDay.innerHTML = dayName;
        // console.log(eventDay + " is eventDay")
        eventDate.innerHTML = headerMonth + " " + monthsOfYear[day.getMonth()] + " " + day.getFullYear();
    }, 100);
}
// getActiveDay();

//function update events when a day is active
function updateEvents(headerMonth) {
    let events = "";
    eventsArr.forEach((event) => {
        // get events of active days only
        // console.log(currentMonth + 1 + " is currentMonth")
        console.log(event.day + " is event day")
        console.log(event.month + " is event month")
        console.log(event.year + " is event year")
        console.log(headerMonth + " is headerMonth")
        console.log(currentMonth + 1 + " is currentMonth")
        console.log(currentYear + " is currentYear")
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
}

//   updateEvents();


displayCalendar();





// New event
let addEventBtn = document.getElementById('buttAddEvent');
let addEventContainer = document.querySelector('.add-event-wrapper');
let addEventCloseBtn = document.querySelector('.close');
let addEventTitle = document.querySelector('.event-name');
let addEventFrom = document.querySelector('.event-time-from');
let addEventTo = document.querySelector('.event-time-to');

addEventBtn.addEventListener("click", function () {
    addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", function () {
    addEventContainer.classList.remove("active");
});

// if click outside
document.addEventListener('click', (e) => {
    if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
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
                // + 'API KEY'
                // 'https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=e9ca98e57b68488e060c64799d86e7fc'
            ).then((response) => response.json())
                .then((data) => weather.fetchWeather(data));
        }

        let weather = {
            // apiKey: "API KEY",


            // getCity: function(){
            //     fetch(
            //         "http://api.openweathermap.org/geo/1.0/reverse?lat="
            //         + lat
            //         + "&lon="
            //         + long
            //         + "&limit=2&appid="
            //         + this.apiKey
            //         // 'https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=e9ca98e57b68488e060c64799d86e7fc'
            //     ).then((response)=> response.json())
            //     .then((data)=> thi(data));
            // },
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


// Create date of today in the notes

// document.querySelector('#dateToday').innerHTML = date.getDate();
// document.querySelector('#weekdayToday').innerHTML = weekday[date.getDay()];




