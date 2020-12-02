// Stackoverflow magic
export const formatToCurrency = (amount: number, decimalCount = 2, decimal = '.', thousands = ',') => {
  const usable = isFinite(amount) && !isNaN(amount)
  const _amount = Math.abs(usable ? amount : 0).toFixed(decimalCount)
  const negative = amount < 0 ? '-' : ''
  const i = parseInt(_amount).toString()
  const j = i.length > 3 ? i.length % 3 : 0

  return `${negative}${j ? i.substr(0, j) + thousands : ''}${i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands)}${
    decimalCount
      ? decimal +
        Math.abs(Number(_amount) - Number(i))
          .toFixed(decimalCount)
          .slice(2)
      : ''
  }`
}
