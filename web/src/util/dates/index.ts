export function formatTimeAgo(isoString) {
    if(!isoString) return '';

    // Append 'Z' if isoString lacks time zone info
    if (!isoString.endsWith('Z') && !isoString.match(/[+-][0-9]{2}:[0-9]{2}$/)) {
        isoString += 'Z';
    }

    const inputDate = new Date(isoString);
    const now = new Date();

    if (isNaN(inputDate)) {
        throw new Error("Invalid date string");
    }

    const diffInMs = now - inputDate;

    // Handle future dates
    if (diffInMs < 0) {
        return "now";
    }

    // Use toLocaleTimeString for local time formatting
    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }

    // Check if it's the same calendar day
    const isSameDay = inputDate.getDate() === now.getDate() &&
                      inputDate.getMonth() === now.getMonth() &&
                      inputDate.getFullYear() === now.getFullYear();

    if (isSameDay) {
        return `Today @ ${formatTime(inputDate)}`;
    }

    // Calculate difference in days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Check if yesterday
    if (diffInDays == 0) {
        return `Yesterday @ ${formatTime(inputDate)}`;
    }

    // Format as MM/DD/YYYY
    const month = inputDate.getMonth() + 1; // Months are zero-based
    const day = inputDate.getDate();
    const year = inputDate.getFullYear();

    return `${month}/${day}/${year} @ ${formatTime(inputDate)}`;
}


export function msToMins(milliseconds) {
    if (typeof milliseconds !== 'number' || isNaN(milliseconds)) {
        throw new TypeError('Input must be a valid number representing milliseconds.');
    }

    const minutes = milliseconds / (1000 * 60);
    return Math.round(minutes);
}

export function parseBirthday(dateString:string){
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}