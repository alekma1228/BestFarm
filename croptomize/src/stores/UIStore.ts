import { observable, action, runInAction, computed } from 'mobx'
import moment from 'moment'
import { BasisLocation } from '../model/BasisLocation'
import { Basis } from '../model/Basis'
import { ServiceRegistry } from '../services/ServiceRegistry'
import { GrainBidsResult, HistoricalDateRangeOption } from '../services/MarketDataService'
import {
  getCommodityChoices,
  CropType,
  colorForSymbol,
  getImportantMonthsForCrop,
  getNextImportantMonthsForCropType,
  getNextImportantMonthForCropType,
} from '../model/Symbols'
import { RootStore } from './RootStore'
import { BlogPost } from '../services/CroptomizeService'
import { Animated } from 'react-native'
import { NavigationRoute } from 'react-navigation'
import { AppColors } from '../ui/styles/AppStyles'
import { checkStaticFrame } from '../model/StaticFrame'

export interface BasisDateOption {
  displayDate: string
  deliveryStartDate?: Date
  deliveryEndDate?: Date
  lastSeenPrice?: string
  isSelected: boolean
}

export interface FrameDateOption {
  month: string
  year: string
  isSelected: boolean
}

export class UIStore {
  private rootStore: RootStore
  private services: ServiceRegistry

  // Add Crop
  @observable grainBidsSearchResults?: GrainBidsResult[]
  @observable commodities: Commodity[]
  @observable selectedCommodity?: Commodity
  @observable selectedGrainBidsResult?: GrainBidsResult
  @observable selectedGrainBidMonthIndexes: number[]
  @observable loading = false
  @observable hasSearched = false

  // Price Checker
  @observable priceCheckerCropType: CropType = CropType.CORN
  @observable priceCheckerSelectedMonth: FrameDateOption

  //CroptomizeIdealFarm
  @observable idealFarmCropType: CropType = CropType.CORN

  // Graph
  @observable selectedBasisLocation?: BasisLocation
  @observable selectedBasis?: Basis
  @observable historicalDateRangeOptions = Object.keys(HistoricalDateRangeOption)
  @observable graphSelectedDateRange = HistoricalDateRangeOption.Month
  @observable graphLoading = false
  @observable loadingPriceCheck = false

  // Farm
  @observable blogPosts: BlogPost[] = []
  @observable loadingBlogPosts = false

  // Account
  @observable email?: string

  //Tutorial
  @observable marketFeedTutorialIndex: number
  @observable priceCheckTutorialIndex: number
  @observable hasSeenCFOTutorial: boolean

  @observable selectedBlogPost?: BlogPost

  // Animated tabs
  @observable interpolatedColors: Animated.AnimatedInterpolation | null = null

  @observable backButtonReturnToScreen?: string

  constructor(services: ServiceRegistry, rootStore: RootStore) {
    this.rootStore = rootStore
    this.services = services
    this.commodities = getCommodityChoices()
    this.marketFeedTutorialIndex = 0
    this.priceCheckTutorialIndex = 0
    this.hasSeenCFOTutorial = false

    const month = getNextImportantMonthForCropType(CropType.CORN)
    this.priceCheckerSelectedMonth = {
      month: month.month,
      year: `20${month.year}`,
      isSelected: true,
    }

    this.selectedGrainBidMonthIndexes = []

    this.initializeData()
  }

  private initializeData() {
    this.services.userDataService
      .getEmail()
      .then(email => {
        runInAction(() => {
          this.email = email
        })
      })
      .catch(ex => console.log(ex))

    this.services.userDataService
      .getMarketFeedTutorialPageIndex()
      .then(index => {
        runInAction(() => {
          this.marketFeedTutorialIndex = index
        })
      })
      .catch(ex => console.log(ex))

    this.services.userDataService
      .getPriceCheckTutorialPageIndex()
      .then(index => {
        runInAction(() => {
          this.priceCheckTutorialIndex = index
        })
      })
      .catch(ex => console.log(ex))
  }

  @action
  selectBasisLocation(basisLocation: BasisLocation) {
    let newBasis: Basis | undefined = undefined

    // The user has selected a different basis location but the same crop, try to find a matching basis in the new location
    if (this.selectedBasis) {
      newBasis = basisLocation.findSimilarBasis(this.selectedBasis)
    } else {
      newBasis = basisLocation.defaultBasis
    }

    if (newBasis) {
      this.selectBasis(newBasis).catch(ex => console.log(ex))
    }
  }

  @action
  async selectBasis(basis: Basis) {
    this.selectedBasis = basis
    this.selectedBasisLocation = basis.location

    await this.showDateRange(this.graphSelectedDateRange)
  }

  isSelectedBasisLocation(basisLocation: BasisLocation) {
    if (!this.selectedBasis) {
      return false
    }

    return basisLocation.displayName === this.selectedBasis.location.displayName
  }

  @action
  selectCommodityForAdding(commodity: Commodity) {
    this.selectedCommodity = commodity
    this.loading = false
    this.hasSearched = false
  }

  @action
  async searchMarketData(zipCode: string) {
    if (zipCode.length < 5) {
      return
    }

    this.loading = true
    this.hasSearched = false

    const results = await this.services.marketDataService.getGrainBids(zipCode)

    runInAction(() => {
      this.grainBidsSearchResults = results
      this.loading = false
      this.hasSearched = true
    })
  }

  @action
  selectGrainBidResultForAdding(result?: GrainBidsResult) {
    this.selectedGrainBidsResult = result
    this.selectedGrainBidMonthIndexes = []
  }

  @action
  toggleGrainBidMonthIndexSelected(index: number) {
    if (this.selectedGrainBidMonthIndexes.includes(index)) {
      this.selectedGrainBidMonthIndexes = this.selectedGrainBidMonthIndexes.filter(item => item !== index)
    } else {
      this.selectedGrainBidMonthIndexes = [...this.selectedGrainBidMonthIndexes, index]
    }
  }

  @computed
  get hasSelectedGrainBidMonths() {
    return this.selectedGrainBidMonthIndexes.length > 0
  }

  @action
  selectIdealFarmCrop(cropType: CropType | string) {
    this.idealFarmCropType = cropType as CropType
  }

  @action
  selectPriceCheckerCrop(cropType: CropType | string) {
    this.priceCheckerCropType = cropType as CropType

    const dateOptions = this.selectableDatesForFrame

    // If the currently selected month and year are not applicable to this crop switch them to the first available month and year option
    if (
      !dateOptions.find(
        option =>
          option.month === this.priceCheckerSelectedMonth.month && option.year === this.priceCheckerSelectedMonth.year,
      ) &&
      dateOptions.length > 0
    ) {
      this.priceCheckerSelectedMonth = dateOptions[0]
    }
  }

  @action
  selectPriceCheckerDate(dateOption: FrameDateOption) {
    this.priceCheckerSelectedMonth = dateOption
  }

  @action
  async checkFrame(priceInCents: number | undefined) {
    if (!priceInCents) {
      return
    }

    this.loadingPriceCheck = true

    // const symbol = getCropSymbolForCropType(this.priceCheckerCropType)
    // const monthSymbol = getSymbolForMonth(this.priceCheckerSelectedMonth.month)

    try {
      // Paid users use this
      // const result = await this.services.croptomizeService.checkFrame(
      //   symbol,
      //   monthSymbol,
      //   this.priceCheckerSelectedMonth.year,
      //   2,
      //   priceInCents,
      // )
      return checkStaticFrame(this.priceCheckerCropType, priceInCents)
    } catch (ex) {
      throw ex
    } finally {
      runInAction(() => (this.loadingPriceCheck = false))
    }
  }

  @action
  async showDateRange(dateRange: HistoricalDateRangeOption) {
    this.graphSelectedDateRange = dateRange
    this.graphLoading = true
    if (this.selectedBasis) {
      await this.rootStore.basisStore.refreshHistoricalDataForBasis(this.selectedBasis, this.graphSelectedDateRange)

      runInAction(() => {
        this.graphLoading = false
      })
    }
  }

  @action
  finishSubscription() {
    this.rootStore.isFreeUser = false
    this.rootStore.basisStore.subscribed()
  }

  @action
  selectDateOption(dateOption: BasisDateOption) {
    if (!this.selectedBasis) {
      return
    }

    this.selectBasis(
      this.selectedBasis.deriveNewBasisForDate(
        dateOption.displayDate,
        dateOption.deliveryStartDate,
        dateOption.deliveryEndDate,
      ),
    )
  }

  @action
  setAnimatedColors(position: Animated.Value, routes: NavigationRoute<any>[]) {
    const outputRange = routes.map(r => (r.key === 'farm' ? AppColors.navy : colorForSymbol(r.key)))
    const inputRange = Array.from({ length: routes.length }, (_, i) => i)
    if (routes.length < 2) {
      outputRange.push(AppColors.navy)
      inputRange.push(1)
    }
    this.interpolatedColors = position.interpolate({
      inputRange,
      outputRange,
    })
  }

  @computed
  get selectableDates() {
    if (!this.selectedBasis) {
      return []
    }

    if (this.selectedBasis.isCBOT) {
      return this.getCBOTSelectableDates(this.selectedBasis.cropType)
    }

    const results: BasisDateOption[] = []

    const today = moment()
    const selectedBasisEndDate = moment(this.selectedBasis.deliveryEnd)

    for (const cashBid of Object.values(this.selectedBasis.bidsByDeliveryDate)) {
      if (today.isAfter(moment(cashBid.delivery_end).subtract(1, 'day'))) {
        continue
      }

      const deliveryStartDate = moment(cashBid.delivery_start)
      const deliveryEndDate = moment(cashBid.delivery_end)
      const displayDate = deliveryEndDate.format('MMM YYYY')

      results.push({
        displayDate,
        deliveryStartDate: deliveryStartDate.toDate(),
        deliveryEndDate: deliveryEndDate.toDate(),
        lastSeenPrice: cashBid.cashprice,
        isSelected: displayDate === this.selectedBasisDate && deliveryEndDate.isSame(selectedBasisEndDate, 'day'),
      })
    }

    return results
  }

  @computed
  get selectableDatesForFrame() {
    const results: FrameDateOption[] = []

    for (const result of getNextImportantMonthsForCropType(this.priceCheckerCropType)) {
      results.push({
        month: result.month,
        year: `20${result.year}`,
        isSelected:
          result.month === this.priceCheckerSelectedMonth.month &&
          `20${result.year}` === this.priceCheckerSelectedMonth.year,
      })
    }

    return results
  }

  getCBOTSelectableDates(cropType: CropType) {
    const results: BasisDateOption[] = []
    const importantMonths = getImportantMonthsForCrop(cropType)
    const currentDate = moment()

    if (importantMonths.includes(currentDate.format('MMM'))) {
      // If the current month is important, add it, otherwise it can't be selected
      results.push({
        displayDate: currentDate.format('MMM YYYY'),
        isSelected: true,
      })
    }

    const nextImportantMonths = getNextImportantMonthsForCropType(cropType)

    for (const month of nextImportantMonths) {
      const displayDate = `${month.month} 20${month.year}`
      results.push({
        displayDate,
        isSelected: displayDate === this.selectedBasisDate,
      })
    }

    return results
  }

  @action
  setHasSeenWelcomeScreen(hasSeenWelcomeScreen: boolean) {
    this.services.userDataService.setHasSeenWelcome(hasSeenWelcomeScreen)
  }

  hasSeenWelcomeScreen() {
    return this.services.userDataService.hasSeenWelcome()
  }

  @action
  setEmail(email: string) {
    return this.services.userDataService.setEmail(email).then(() => {
      return this.services.croptomizeService.recordEmail(email).then(() => {
        runInAction(() => (this.email = email))
      })
    })
  }

  @action
  setHasSeenCFOTutorial(hasSeenCFOTutorial: boolean) {
    this.services.userDataService.setHasSeenCFOTutorial(hasSeenCFOTutorial).then(() => {
      runInAction(() => (this.hasSeenCFOTutorial = hasSeenCFOTutorial))
    })
  }

  getHasSeenCFOTutorial() {
    return this.services.userDataService.hasSeenCFOTutorial()
  }

  @action
  setMarketFeedTutorialIndex(index: number) {
    return this.services.userDataService.setMarketFeedTutorialPageIndex(index).then(() => {
      runInAction(() => (this.marketFeedTutorialIndex = index))
    })
  }

  @action
  setPriceCheckTutorialIndex(index: number) {
    return this.services.userDataService.setPriceCheckTutorialPageIndex(index).then(() => {
      runInAction(() => (this.priceCheckTutorialIndex = index))
    })
  }

  @computed
  get selectedBasisDate() {
    if (this.selectedBasis) {
      return this.selectedBasis.displayDate()
    }

    return ''
  }

  @computed
  get locationsMatchingSelectedBasis() {
    const basis = this.selectedBasis

    if (!basis) {
      return []
    }

    return this.rootStore.basisStore.basisLocations.filter(location => location.hasCropWithSymbol(basis.cropSymbol))
  }

  @computed
  get locationResultsForSearch() {
    if (!this.grainBidsSearchResults || !this.selectedCommodity) {
      return []
    }

    const basisOptions = []

    for (const searchResult of this.grainBidsSearchResults) {
      for (const bid of searchResult.bids) {
        if (bid.symbol.startsWith(this.selectedCommodity.symbolPrefix)) {
          basisOptions.push(searchResult)
          break
        }
      }
    }

    return basisOptions.sort((option1, option2) => parseInt(option1.distance, 10) - parseInt(option2.distance, 10))
  }

  @computed
  get isFreeUser() {
    return this.rootStore.isFreeUser
  }

  @computed
  get bidsForSearch() {
    if (!this.selectedCommodity || !this.selectedGrainBidsResult) {
      return []
    }

    const bids = []

    for (const bid of this.selectedGrainBidsResult.bids) {
      if (bid.symbol.startsWith(this.selectedCommodity.symbolPrefix)) {
        bids.push(bid)
      }
    }

    return bids
  }

  @computed
  get bidsByMonthForSearch() {
    const bids = this.bidsForSearch

    // Delivery dates are in the format 2020-04-30 23:59:59, and therefore sortable as strings
    return bids.sort((bid1, bid2) => bid1.delivery_end.localeCompare(bid2.delivery_end))
  }

  @computed
  get hasBidsForSearch() {
    return this.bidsByMonthForSearch.length > 0
  }

  @computed
  get displayDateRange() {
    switch (this.graphSelectedDateRange) {
      case HistoricalDateRangeOption.Day:
        return 'today'
      case HistoricalDateRangeOption.Week:
        return 'this week'
      case HistoricalDateRangeOption.ThreeMonths:
        return 'in the last 3 months'
      case HistoricalDateRangeOption.Year:
        return 'this year'
      default:
        return 'this month'
    }
  }

  @action
  async fetchBlogPosts() {
    this.loadingBlogPosts = true
    const blogPosts = await this.services.croptomizeService.getRecentPosts()

    runInAction(() => {
      this.blogPosts = blogPosts
      this.loadingBlogPosts = false
    })
  }

  @action
  selectBlogPost(post: BlogPost) {
    this.selectedBlogPost = post
  }
}
