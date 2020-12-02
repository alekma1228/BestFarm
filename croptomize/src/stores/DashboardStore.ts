import { observable, action, computed } from 'mobx'
import { AppColors } from '../ui/styles/AppStyles'
import FarmCFOScreen from '../ui/dashboard/FarmCFOScreen'
import CropInfoScreen from '../ui/dashboard/CropInfoScreen'
import { NavigationRouteConfigMap } from 'react-navigation'
import {
  colorForSymbol,
  pictureForSymbol,
  getSymbolForMonth,
  getCropTypeForCropSymbol,
  getNextImportantMonthForCropType,
} from '../model/Symbols'
import { ServiceRegistry } from '../services/ServiceRegistry'
import moment from 'moment'
import { persist } from 'mobx-persist'

export class CropStore {
  displayName: string
  symbolPrefix: string
  // categories
  @observable land = 0
  @observable agronomy = 0
  @observable operations = 0
  @observable interest = 0
  @observable other = 0

  // production estimates
  @observable numOfAcres = 0
  @observable minimalYield = 0
  @observable expectedYield = 0
  @observable maximumYield = 0

  // revenue
  @observable contractedBushels = 0
  @observable avgSale = 0
  @observable projectedBasis = 0
  //Other
  @observable cbotValue = 0

  constructor(
    private services: ServiceRegistry,
    public year: number,
    crop: Commodity,
    categories: number[],
    estimates: number[],
  ) {
    this.displayName = crop.displayName
    this.symbolPrefix = crop.symbolPrefix
    this.setExpenses(categories)
    this.setEstimates(estimates)
  }
  @action
  setEstimates(estimates: Array<string | number>) {
    const self = this as any
    Object.values(YIELDS).forEach(({ key }, i) => (self[key] = estimates[i] === '' ? self[key] : Number(estimates[i])))
  }
  @action
  setExpenses(expenses: Array<string | number>) {
    const self = this as any
    Object.keys(CATEGORIES).forEach((key, i) => (self[key] = Number(expenses[i])))
  }
  @action
  setRevenue(contractedBushels: string, avgSale: string, projectedBasis: string) {
    this.contractedBushels = Number(contractedBushels || 0)
    this.avgSale = Number(avgSale || 0)
    this.projectedBasis = Number(projectedBasis || 0)
  }
  /*
   * year = current -> current month
   * year = past -> december
   * year = future -> january
   * */
  @action
  async CBOTValueForCrop() {
    const now = moment()
    const currentYear = now.format('YY')
    // let currentMonth = now.format('MMM')
    let currentMonth = getNextImportantMonthForCropType(getCropTypeForCropSymbol(this.symbolPrefix)).month
    const selectedYear = this.year.toString().substring(2)
    const retry: () => any = async () => {
      let fullSymbol = this.symbolPrefix
      if (selectedYear === currentYear) {
        fullSymbol += getSymbolForMonth(currentMonth)
      }
      if (selectedYear < currentYear) {
        fullSymbol += getSymbolForMonth('Dec')
      }
      if (selectedYear > currentYear) {
        fullSymbol += getSymbolForMonth('Jan')
      }
      fullSymbol += selectedYear
      const quote = await this.services.marketDataService.getQuoteForSymbol(fullSymbol)
      // goes down a month until it returns a value or gets to Jan
      if (!quote && currentMonth !== 'Jan') {
        currentMonth = now.subtract(1, 'months').format('MMM')
        return await retry()
      }
      return quote || { lastPrice: 0 }
    }
    const quote = await retry()
    this.cbotValue = quote.lastPrice / 100
    return this.cbotValue
  }
  // returns production expenses in order
  @computed
  get values() {
    const self = this as any
    const values: number[] = []
    YIELDS.forEach(({ key }) => values.push(self[key]))
    return values
  }
  // returns category expenses in order
  @computed
  get categoryExpenses() {
    const self = this as any
    const values: number[] = []
    Object.values(CATEGORIES).forEach(({ key }) => values.push(self[key]))
    return values
  }
  @computed
  get color() {
    return colorForSymbol(this.symbolPrefix)
  }
  @computed
  get picture() {
    return pictureForSymbol(this.symbolPrefix)
  }
  @computed
  get progress() {
    return (this.contractedBushels * 100) / this.totalBushels
  }
  @computed
  get totalBushels() {
    return this.expectedYield * this.numOfAcres
  }
  @computed
  get totalExpenses() {
    const self = this as any
    return Object.values(CATEGORIES).reduce((a, v) => a + self[v.key], 0)
  }
  @computed
  get totalExpensesCost() {
    const self = this as any
    return Object.values(CATEGORIES).reduce((a, v) => a + self[v.key] * this.numOfAcres, 0)
  }
  @computed
  get totalProfit() {
    return this.totalRevenue - this.totalExpensesCost
  }
  // same as contracted revenue
  @computed
  get totalRevenue() {
    return this.contractedBushels * this.avgSale
  }
  @computed
  get contractedRevenue() {
    return this.contractedBushels * this.avgSale
  }
  @computed
  get remainingBushels() {
    return this.expectedYield * this.numOfAcres - this.contractedBushels
  }
  @computed
  get potentialRevenue() {
    return this.remainingBushels * this.cbotValue
  }
  @computed
  get totalPotentialRevenue() {
    return this.potentialRevenue + this.contractedRevenue
  }
}
class DashboardYearStore {
  @observable crops: { [key: string]: CropStore } = {}
  @observable name: string
  @observable year: number
  // arrays need to be declared like this for type safety
  readonly tabOrder = observable<string>([])

  constructor(private services: ServiceRegistry, public key: number, name: string, year: number, fromNew = false) {
    this.name = name
    this.year = year
    // route name for dashboard
    this.tabOrder.push('farm')
    // createMaterialTopTabNavigator breaks if it has less than 2 tabs
    if (!fromNew) {
      // on init start with a crop, when creating a new year start empty
      // this.addCrop(
      //   { displayName: 'Corn', symbolPrefix: 'ZC' },
      //   Array(Object.keys(CATEGORIES).length).fill(0),
      //   Array(YIELDS.length).fill(0),
      // )
    }
  }
  // returns array of categories with sum of each crop cat
  @computed
  get categories() {
    const _cat: { [key in CategoryEnum]: { amount: number } & TCategory } = {} as any
    const values = Object.values(CategoryEnum)
    values.forEach(c => (_cat[c] = { ...CATEGORIES[c], amount: 0 })) // init
    Object.keys(this.crops).forEach(key => {
      values.forEach(c => (_cat[c].amount += this.crops[key][c]))
    })
    return _cat
  }
  @computed
  get yearExpenses() {
    let ret = 0
    Object.keys(this.crops).forEach(key => {
      const crop = this.crops[key]
      const itemValue =
        crop.numOfAcres * crop[CategoryEnum.Land] +
        crop.numOfAcres * crop[CategoryEnum.Agronomy] +
        crop.numOfAcres * crop[CategoryEnum.Operations] +
        crop.numOfAcres * crop[CategoryEnum.Interest] +
        crop.numOfAcres * crop[CategoryEnum.Other]
      ret = ret + itemValue
    })
    return ret
  }
  @computed
  get yearRevenue() {
    return Object.values(this.crops).reduce((a, c) => a + c.contractedRevenue, 0)
  }
  @computed
  get profit() {
    return Object.values(this.crops).reduce((a, c) => a + c.totalProfit, 0)
  }
  // crops are the tabs with farmCFO attached
  @computed
  get tabs() {
    const tabConfig: NavigationRouteConfigMap = {}
    this.tabOrder.forEach(routeName => {
      const main = routeName === 'farm'
      const displayName = main ? 'Farm' : this.crops[routeName].displayName
      tabConfig[routeName] = {
        screen: main ? FarmCFOScreen : CropInfoScreen,
        navigationOptions: {
          tabBarLabel: displayName,
        },
        params: {
          title: displayName,
        },
      }
    })
    return tabConfig
  }

  @action
  addCrop(crop: { displayName: string; symbolPrefix: string }, categories: number[], estimates: number[]) {
    this.crops[crop.symbolPrefix] = new CropStore(this.services, this.year, crop, categories, estimates)

    /*
     * this check is only necessary because whenever a new year is created it includes 'Corn'
     * by default, so if selected when creating a new year, it will duplicate in the tabs
     * */
    if (!this.tabOrder.includes(crop.symbolPrefix)) {
      this.tabOrder.push(crop.symbolPrefix)
    }
  }
}
export class DashboardStore {
  @persist('map', DashboardYearStore) @observable dashboards: { [key: number]: DashboardYearStore } = {} // each one is a year
  @persist @observable selectedYear = 0
  @observable modal: { fn: Function | null; show: boolean; isNewYear: boolean } = {
    fn: null,
    show: false,
    isNewYear: false,
  }

  constructor(private services: ServiceRegistry) {
    if (!this.years.length) {
      this.addYear('', Number(moment().format('YYYY')))
    }
  }
  @computed
  get years() {
    return Object.values(this.dashboards)
  }
  @computed
  get selectedDashboard() {
    return this.dashboards[this.selectedYear]
  }
  @action
  addYear(name: string, year: number, toImportCropKeys?: string[]) {
    const key = Date.now()
    const previous = this.selectedYear
    this.dashboards[key] = new DashboardYearStore(this.services, key, name, year, !!toImportCropKeys)
    this.selectedYear = key
    if (toImportCropKeys) {
      const crops = this.dashboards[previous].crops
      toImportCropKeys.forEach(_k => {
        const { displayName, symbolPrefix, ...rest } = crops[_k] as any
        const crop = { displayName, symbolPrefix }
        const estimates: number[] = []
        const categories: number[] = []
        YIELDS.forEach(({ key }) => estimates.push(rest[key]))
        Object.keys(CATEGORIES).forEach(key => categories.push(rest[key]))
        this.selectedDashboard.addCrop(crop, categories, estimates)
      })
    }
  }
  // only happens if it exists, and that is when defined at
  // the end of creating a year
  @action
  showModal() {
    if (this.modal.show && this.modal.fn) {
      this.modal.fn()
      this.modal.show = false
    }
  }
}

export enum CategoryEnum {
  Land = 'land',
  Agronomy = 'agronomy',
  Operations = 'operations',
  Interest = 'interest',
  Other = 'other',
}
export type TCategory = { key: CategoryEnum; title: string; color: string }
export const CATEGORIES: { [key in CategoryEnum]: TCategory } = Object.freeze({
  [CategoryEnum.Land]: { key: CategoryEnum.Land, title: 'Land', color: AppColors.navy },
  [CategoryEnum.Agronomy]: { key: CategoryEnum.Agronomy, title: 'Agronomy', color: '#468074' },
  [CategoryEnum.Operations]: { key: CategoryEnum.Operations, title: 'Operations', color: '#F16464' },
  [CategoryEnum.Interest]: { key: CategoryEnum.Interest, title: 'Interest/Insurance', color: AppColors.yellow },
  [CategoryEnum.Other]: { key: CategoryEnum.Other, title: 'Other', color: '#86d0ca' },
})
export const YIELDS = Object.freeze([
  { key: 'numOfAcres', text: 'Number of Acres' },
  { key: 'minimalYield', text: 'Minimum Crop Yield' },
  { key: 'expectedYield', text: 'Expected Crop Yield' },
  { key: 'maximumYield', text: 'Maximum Crop Yield' },
])
