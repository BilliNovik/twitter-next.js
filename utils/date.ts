export const getCurrentDate = (date: string) => {
    let newDate = new Date(date)

    let finalDate = newDate.toLocaleString('en-US', {
        day: 'numeric',
        weekday: 'short'
    })
    return finalDate
}

