let date = new Date();
let currentMonth = date.getMonth();
console.log(currentMonth);
let currentYear = date.getFullYear();

function displayCalendar() {
    console.log('Hey');
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
    document.querySelector('#calender-table').appendChild(table);
    const headerRow = document.createElement("tr");
    const headerMonth = document.createElement("th");
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

let buttPrev = document.getElementById('previous');
buttPrev.addEventListener("click", function () {
    console.log('Button Previous');
    date.setMonth(date.getMonth()-1);
    let previousMonth = date.getMonth();
    console.log(previousMonth);
    
});


displayCalendar();
