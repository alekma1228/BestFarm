import moment from 'moment'
import { AppColors } from '../ui/styles/AppStyles'
import { Basis } from './Basis'
import { BasisLocation } from './BasisLocation'

export function isValidSymbol(symbol: string) {
  return /^[ZMK]\w\w\d\d$/.test(symbol)
}

export function getNameFromSymbol(symbol: string) {
  if (!isValidSymbol(symbol)) {
    console.log(`NOT A VALID SYMBOL: ${symbol}`)
    return ''
  }

  const prefix = symbol.slice(0, 2)

  switch (prefix) {
    case 'ZC':
      return 'Corn'
    case 'ZS':
      return 'Soybeans'
    case 'ZW':
      return 'Wheat, SRW'
    case 'MW':
      return 'Wheat, HRS'
    case 'KE':
      return 'Wheat, HRW'
    default:
      return ''
  }
}

export function getMonthFromMonthSymbol(symbol: string) {
  if (symbol.length > 1) {
    symbol = symbol.slice(2, 3)
  }

  switch (symbol) {
    case 'F':
      return 'Jan'
    case 'G':
      return 'Feb'
    case 'H':
      return 'Mar'
    case 'J':
      return 'Apr'
    case 'K':
      return 'May'
    case 'M':
      return 'Jun'
    case 'N':
      return 'Jul'
    case 'Q':
      return 'Aug'
    case 'U':
      return 'Sep'
    case 'V':
      return 'Oct'
    case 'X':
      return 'Nov'
    case 'Z':
      return 'Dec'
    default:
      return ''
  }
}

export function getSymbolForMonth(month: string) {
  switch (month) {
    case 'Jan':
      return 'F'
    case 'Feb':
      return 'G'
    case 'Mar':
      return 'H'
    case 'Apr':
      return 'J'
    case 'May':
      return 'K'
    case 'Jun':
      return 'M'
    case 'Jul':
      return 'N'
    case 'Aug':
      return 'Q'
    case 'Sep':
      return 'U'
    case 'Oct':
      return 'V'
    case 'Nov':
      return 'X'
    case 'Dec':
      return 'Z'
    default:
      return ''
  }
}

export function getYearFromSymbol(symbol: string) {
  if (!isValidSymbol(symbol)) {
    return ''
  }

  return '20' + symbol.slice(-2)
}

export function getCommodityChoices() {
  return [
    { displayName: 'Corn', symbolPrefix: 'ZC' },
    { displayName: 'Soybeans', symbolPrefix: 'ZS' },
    { displayName: 'Wheat, HRW', symbolPrefix: 'KE' },
    { displayName: 'Wheat, SRW', symbolPrefix: 'ZW' },
    { displayName: 'Wheat, HRS', symbolPrefix: 'MW' },
  ]
}

export function colorForSymbol(symbol: string) {
  if (symbol.length > 2) {
    symbol = symbol.slice(0, 2)
  }

  switch (symbol) {
    case 'ZC':
      return AppColors.yellow
    case 'ZS':
      return '#F16464'
    default:
      return '#468074'
  }
}

export function pictureForSymbol(symbol: string) {
  if (symbol.length > 2) {
    symbol = symbol.slice(0, 2)
  }

  switch (symbol) {
    case 'ZC':
      return require('../../assets/corn-large.png')
    case 'ZS':
      return require('../../assets/soybeans-large.png')
    default:
      return require('../../assets/wheat-large.png')
  }
}

export enum CropType {
  CORN = 'CORN',
  WHEAT_SRW = 'WHEAT_SRW',
  WHEAT_HRS = 'WHEAT_HRS',
  WHEAT_HRW = 'WHEAT_HRW',
  SOYBEANS = 'SOYBEANS',
}

export function getDisplayNameForCropType(cropType: CropType | string, allCaps = false) {
  let displayName = ''

  switch (cropType) {
    case CropType.WHEAT_SRW:
      displayName = 'SRW Wheat'
      break
    case CropType.WHEAT_HRS:
      displayName = 'HRS Wheat'
      break
    case CropType.WHEAT_HRW:
      displayName = 'HRW Wheat'
      break
    case CropType.SOYBEANS:
      displayName = 'Soybeans'
      break
    default:
      displayName = 'Corn'
  }

  if (allCaps) {
    return displayName.toUpperCase()
  }

  return displayName
}

export function getPriceCheckerDisplayNameForCropType(cropType: CropType | string, allCaps = false) {
  let displayName = ''

  switch (cropType) {
    case CropType.WHEAT_SRW:
      displayName = 'SRW Wheat - CBOT'
      break
    case CropType.WHEAT_HRS:
      displayName = 'HRS Wheat - MW'
      break
    case CropType.WHEAT_HRW:
      displayName = 'HRW Wheat - CBOT'
      break
    case CropType.SOYBEANS:
      displayName = 'Soybeans - CBOT'
      break
    default:
      displayName = 'Corn - CBOT'
  }

  if (allCaps) {
    return displayName.toUpperCase()
  }

  return displayName
}

export function getIdealFarmDisplayNameForCropType(cropType: CropType | string, allCaps = false) {
  let displayName = ''

  switch (cropType) {
    case CropType.WHEAT_SRW:
      displayName = 'SRW Wheat - CBOT'
      break
    case CropType.WHEAT_HRS:
      displayName = 'HRS Wheat - MW'
      break
    case CropType.WHEAT_HRW:
      displayName = 'HRW Wheat - CBOT'
      break
    case CropType.SOYBEANS:
      displayName = 'Soybeans - CBOT'
      break
    default:
      displayName = 'Corn - CBOT'
  }

  if (allCaps) {
    return displayName.toUpperCase()
  }

  return displayName
}

export function getCropSymbolForCropType(cropType: CropType | string) {
  switch (cropType) {
    case CropType.WHEAT_SRW:
      return 'ZW'
    case CropType.WHEAT_HRS:
      return 'MW'
    case CropType.WHEAT_HRW:
      return 'KE'
    case CropType.SOYBEANS:
      return 'ZS'
    default:
      // Corn
      return 'ZC'
  }
}

export function getCropTypeForCropSymbol(symbol: string) {
  if (symbol.length > 2) {
    symbol = symbol.slice(0, 2)
  }

  switch (symbol) {
    case 'ZW':
      return CropType.WHEAT_SRW
    case 'MW':
      return CropType.WHEAT_HRS
    case 'KE':
      return CropType.WHEAT_HRW
    case 'ZS':
      return CropType.SOYBEANS
    default:
      // Corn
      return CropType.CORN
  }
}

interface MonthResult {
  month: string
  year: string
}

// Returns { month: 'Jul', year: 20}[]

export function getNextImportantMonthsForCropType(cropType: CropType | string) {
  const possibleMonths = getImportantMonthsForCrop(cropType)
  const resultMonths: MonthResult[] = []

  for (let i = 1; i < 24; i++) {
    const monthDate = moment().add(i, 'months')
    const monthIndex = possibleMonths.indexOf(monthDate.format('MMM'))

    if (monthIndex > -1) {
      resultMonths.push({
        month: monthDate.format('MMM'),
        year: monthDate.format('YY'),
      })
    }
  }

  return resultMonths
}

export function getNextImportantMonthForCropType(cropType: CropType | string) {
  const nextMonths = getNextImportantMonthsForCropType(cropType)
  return nextMonths[0]
}

export function getImportantMonthsForCrop(cropType: CropType | string) {
  switch (cropType) {
    case CropType.SOYBEANS:
      return ['Mar', 'Jul', 'Nov']
    default:
      // all types of wheat or corn
      return ['Mar', 'Jul', 'Dec']
  }
}

export function getImportantMonthsForCropSymbol(cropSymbol: string) {
  return getImportantMonthsForCrop(getCropTypeForCropSymbol(cropSymbol))
}

export function nextBasisForCropType(location: BasisLocation, cropType: CropType | string) {
  const symbol = getCropSymbolForCropType(cropType)
  const nextImportantMonth = getNextImportantMonthForCropType(cropType)
  const monthSymbol = getSymbolForMonth(nextImportantMonth.month)

  return new Basis(location, `${symbol}${monthSymbol}${nextImportantMonth.year}`)
}

export function changeMonthForSymbol(symbol: string, month: string, year?: string) {
  // Example: ZSK20
  if (!isValidSymbol(symbol)) {
    return symbol
  }

  const cropSymbol = symbol.slice(0, 2)
  const monthSymbol = getSymbolForMonth(month)
  const yearForSymbol = year ? year.slice(-2) : getYearFromSymbol(symbol).slice(2)

  return `${cropSymbol}${monthSymbol}${yearForSymbol}`
}

export function changeMonthForContractSymbol(symbol?: string, month?: string, year?: string) {
  // Example: ZSBH20-51-167.CM

  if (!symbol || symbol.indexOf('-') === -1 || (!month && !year)) {
    return symbol
  }

  const [commoditySymbol, locationId, customerCommodityId] = symbol.split('-')

  const cropSymbol = commoditySymbol.slice(0, 2)
  const contractType = commoditySymbol.slice(2, 3)
  const monthSymbol = getSymbolForMonth(month ? month : commoditySymbol.slice(3, 4))
  const yearForSymbol = year ? year.slice(2) : commoditySymbol.slice(2)

  return `${cropSymbol}${contractType}${monthSymbol}${yearForSymbol}-${locationId}-${customerCommodityId}`
}
