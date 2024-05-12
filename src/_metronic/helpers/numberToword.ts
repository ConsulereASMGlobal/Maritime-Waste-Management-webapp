function numberToWords(number: any) {
  if (!number) return ''
  const convertToWord = (num) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
    const teens = [
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ]
    const tens = [
      '',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ]
    const thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion']

    const toWords = (num) => {
      if (num === 0) return 'Zero'

      let words = ''
      for (let i = 0; num > 0; i++) {
        if (num % 1000 !== 0) {
          words = convert(num % 1000) + ' ' + thousands[i] + ' ' + words
        }
        num = Math.floor(num / 1000)
      }
      return words.trim()
    }

    const convert = (num) => {
      if (num >= 100) {
        return units[Math.floor(num / 100)] + ' Hundred ' + convert(num % 100)
      } else if (num >= 11 && num <= 19) {
        return teens[num - 11] + ' '
      } else {
        return tens[Math.floor(num / 10)] + ' ' + units[num % 10] + ' '
      }
    }

    return toWords(num)
  }
  return convertToWord(parseFloat(number))
}
export {numberToWords}
