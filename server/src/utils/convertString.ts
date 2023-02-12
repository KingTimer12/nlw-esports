export function convertStringToMinutes(hourString: string) {
    const [hour, minute] = hourString.split(':').map(Number)
    return (hour * 60) + minute
}

export function convertMinutesToString(minutes: number) {
    const hours = Math.floor(minutes / 60)
    const minute = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}