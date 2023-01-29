let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
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

console.log(daysOfWeek);
console.log(monthsOfYear);

// Generate a Calendar

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function generateCalendar() {
    let firstDay = new Date(currentYear, currentMonth, 1);
    console.log(firstDay)

    //Returns the day of the week (0 – 6) for the specified date according to local time.
    // 0 is a Sunday
    let startingDay = firstDay.getDay();
    console.log(startingDay);
}

generateCalendar();
