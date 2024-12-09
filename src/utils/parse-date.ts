export const parseDate = (dateString: string): number => {
  const [day, month, year] = dateString.split('.').map(Number)

  return new Date(year, month - 1, day).getTime()
}
