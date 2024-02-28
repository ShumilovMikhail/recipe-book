export const stringToUrl = (string: string): string => {
  return string.toLowerCase().split(' ').join('-')
}
