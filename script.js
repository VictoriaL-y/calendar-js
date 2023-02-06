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


    let firstDay = new Date(currentYear, currentMonth, 1);
    console.log(firstDay);

    //Returns the day of the week (0 – 6) for the specified date according to local time.
    // 0 is a Sunday
    let startingDay = firstDay.getDay();
    if (startingDay == 0) {
        startingDay = 6
    }
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
    console.log(startingDay);

    let currentDay = 1;
    let currentRow = document.createElement("tr");
    for (let i = 0; i < startingDay; i++) {
        let emptyCell = document.createElement("td");
        console.log(emptyCell);
        currentRow.appendChild(emptyCell);

    }


    for (let i = startingDay; i < 7; i++) {
        let dayCell = document.createElement("td");
        dayCell.innerHTML = currentDay;
        currentRow.appendChild(dayCell);
        console.log(dayCell);
        currentDay++;
    }
    table.appendChild(currentRow);

    while (currentDay <= daysInMonth) {
        currentRow = document.createElement("tr");
        for (let i = 0; i < 7; i++) {
            if (currentDay > daysInMonth) {
                break;
            }
            let dayCell = document.createElement("td");
            dayCell.innerHTML = currentDay;
            currentRow.appendChild(dayCell);
            // console.log(currentDay);

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



