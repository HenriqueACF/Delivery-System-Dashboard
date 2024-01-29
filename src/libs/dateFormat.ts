export const dateFormat = (date: string | Date) => {
    return new
        Intl.DateTimeFormat(
            'pt-BR',
            {dateStyle: 'short', timeStyle: 'short'}
    ).format(date instanceof  Date ?  date : new Date(date))
}