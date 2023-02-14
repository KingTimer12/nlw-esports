export function convertStringToMinutes(hourString: any) {
    const [hour, minute] = hourString.split(':').map(Number)
    return (hour * 60) + minute
}