let date = new Date();
let currentMonth = date.getMonth();
console.log(currentMonth);
let currentYear = date.getFullYear();
let daysOfWeek = [
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

function displayCalendar() {
    console.log('Hey');
    

    // Generate a Calendar

    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    console.log(daysInMonth);

    let daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    console.log("daysInPrevMonth is " + daysInPrevMonth);

    

    let firstDay = new Date(currentYear, currentMonth, 1);
    console.log(firstDay);

    //Returns the day of the week (0 – 6) for the specified date according to local time.
    // 0 is a Sunday
    let startingDay = firstDay.getDay();
    if (startingDay == 0) {
        startingDay = 6
    } else {
        startingDay--;
    }

    //Now 6 is Sunday 
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
        console.log(weekDayHeader);
    }

    table.appendChild(weekDaysRow);
    console.log("starting day is:" + startingDay);

    function addEvent() {
        console.log("day cells work")
        console.log(dayCell);
    }

    let currentDay = 1;
    let currentRow = document.createElement("tr");
    // Create cells for the last dates of the previous month
    for (let i = startingDay; i > 0; i--) {
        let prevCell = document.createElement("td");
        prevCell.innerHTML = daysInPrevMonth - i + 1;
        currentRow.appendChild(prevCell);
        prevCell.addEventListener("click", function () {
            console.log(prevCell.innerHTML + "prevCell work")
        });
        console.log(prevCell + 'prevCell is here');

    }

    // var numDaysNextMonth =
    // 6 - new Date(currentYear, currentMonth, numDays).getDay();
    // console.log(numDaysNextMonth);


    // while (currentDay <= daysInMonth) {
    //     currentRow = document.createElement("tr");
        
    //     for (let i = 0; i < 7; i++) {
    //         let dayCell = document.createElement("td");
    //         if (currentDay <= daysInMonth) {
    //             dayCell.innerHTML = currentDay;
    //         } else {
    //             dayCell.innerHTML = new Date(currentYear, currentMonth + 1, currentDay - daysInMonth).getDate();

    //         }
    
            
    //         // if(dayCell.innerHTML != '') {
    //             dayCell.addEventListener("click", function () {
    //                 console.log("day cells work")
    //                 console.log(dayCell);
    //             })

    //         // }

    for (let i = startingDay; i < 7; i++) {
        let dayCell = document.createElement("td");
        dayCell.innerHTML = currentDay;
        dayCell.addEventListener("click", function () {
            console.log("day cells work")
            console.log(dayCell);
        })
        currentRow.appendChild(dayCell);
        console.log(dayCell);
        currentDay++;
    }
    table.appendChild(currentRow);


    while (currentDay <= daysInMonth) {
        currentRow = document.createElement("tr");
        
        for (let i = 0; i < 7; i++) {
            if (currentDay > daysInMonth) {
                let nextMonthDates = 1;
                for (let j = i; j < 7; j++) {
                let dayCell = document.createElement("td");
                dayCell.innerHTML = nextMonthDates;
                currentRow.appendChild(dayCell);
                nextMonthDates++;
                }
                break;
            }
    
            let dayCell = document.createElement("td");
            dayCell.innerHTML = currentDay;
            // if(dayCell.innerHTML != '') {
                dayCell.addEventListener("click", function () {
                    console.log("day cells work")
                    console.log(dayCell);
                })

            // }
            
            currentRow.appendChild(dayCell);
            if(currentDay == date.getDate() && currentMonth == new Date().getMonth()) {
                console.log(currentMonth)
                dayCell.setAttribute('id', 'today');
            } 
            currentDay++;
        }
        table.appendChild(currentRow);
    }
}

displayCalendar();

let buttPrev = document.getElementById('previous');
buttPrev.addEventListener("click", function () {
    console.log('Button Previous');
    date.setMonth(date.getMonth()-1);
    currentMonth = date.getMonth();
    if(currentMonth == 11) {
        currentYear--;
    }
    // console.log(previousMonth);
    // document.querySelector('#headerMonth').innerHTML = monthsOfYear[previousMonth] + ' ' + currentYear;
    // firstDay = new Date(currentYear, previousMonth, 1);

    // let date = new Date(currentYear, previousMonth, 1);
    // console.log(currentMonth);
    // let currentYear = date.getFullYear();
    document.querySelector('#calendar-table').innerHTML = '';
    displayCalendar();
    

    
});

let buttNext = document.getElementById('next');
buttNext.addEventListener("click", function () {
    console.log('Button Next');
    date.setMonth(date.getMonth()+1);
    currentMonth = date.getMonth();
    if(currentMonth == 0) {
        currentYear++;
    }
    // console.log(nextMonth);
    // console.log(monthsOfYear[nextMonth]);
    // document.querySelector('#headerMonth').innerHTML = monthsOfYear[nextMonth] + ' ' + currentYear;
    // firstDay = new Date(currentYear, nextMonth, 1);
    document.querySelector('#calendar-table').innerHTML = '';
    displayCalendar();
});

let buttPlus = document.getElementById('addEvent')
buttPlus.addEventListener("click", function () {
    console.log('it works');
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
                + 'API Key'
                // 'https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=e9ca98e57b68488e060c64799d86e7fc'
            ).then((response)=> response.json())
            .then((data)=> weather.fetchWeather(data));
        }

        let weather = {
            apiKey:"API Key",
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
            fetchWeather: function(data){
                console.log(data)
                let city=data[0].name;
                console.log(city);
                fetch(
                    "https://api.openweathermap.org/data/2.5/weather?q="
                    + city
                    + "&units=metric&appid="
                    + this.apiKey
                ).then((response)=> response.json())
                .then((data)=> this.displayWeather(data));
            },
            displayWeather: function(data){
                const{name}=data;
                const{icon, description}=data.weather[0];
                const{temp,humidity}=data.main;
                const{speed} = data.wind;
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




