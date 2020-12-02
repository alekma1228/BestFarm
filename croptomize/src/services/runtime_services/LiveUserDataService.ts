import { UserDataService } from '../UserDataService'
import { CBOTLocation } from '../../model/CBOTLocation'
import { PlaceholderLocation } from '../../model/PlaceholderLocation'
import AsyncStorage from '@react-native-community/async-storage'
import { BasisLocation } from '../../model/BasisLocation'
import { Basis } from '../../model/Basis'
import { CropType, nextBasisForCropType, isValidSymbol } from '../../model/Symbols'
import { GrainBid } from '../MarketDataService'

const STORAGE_KEY = 'basisLocations'
const EMAIL_KEY = 'email'
const MARKET_FEED_TUTORIAL_INDEX_KEY = 'marketFeedTutorialIndex'
const PRICE_CHECK_TUTORIAL_INDEX_KEY = 'priceCheckTutorialIndex'
const HAS_SEEN_WELCOME_KEY = 'hasSeenSplashScreen'
const HAS_SEEN_CFO_TUTORIAL_KEY = 'hasSeenCFOTutorial'

interface StoredBasis {
  cbotSymbol: string
  basisContractSymbol?: string
  cashContractSymbol?: string
  deliveryStart?: string | Date
  deliveryEnd?: string | Date
  bidOptions: GrainBid[]
}

interface StoredLocation {
  city: string
  state: string
  company: string
  locationId?: number
  isCBOTLocation: boolean
  trackedBasises: StoredBasis[]
}

export class LiveUserDataService implements UserDataService {
  async loadBasisLocations() {
    const storedLocationsJSON = await AsyncStorage.getItem(STORAGE_KEY)

    if (!storedLocationsJSON) {
      return this.loadDefaultLocations(false)
    }

    const storedLocations: StoredLocation[] = JSON.parse(storedLocationsJSON)

    if (!storedLocations) {
      return this.loadDefaultLocations(false)
    }

    const results: BasisLocation[] = []
    for (const storedLocation of storedLocations) {
      const basisLocation = storedLocation.isCBOTLocation
        ? new CBOTLocation()
        : new BasisLocation(
            storedLocation.company,
            storedLocation.city,
            storedLocation.state,
            storedLocation.locationId,
          )

      const trackedBasises: Basis[] = []
      for (const storedBasis of storedLocation.trackedBasises) {
        const deliveryStart = storedBasis.deliveryStart ? new Date(storedBasis.deliveryStart) : undefined
        const deliveryEnd = storedBasis.deliveryEnd ? new Date(storedBasis.deliveryEnd) : undefined

        if (!isValidSymbol(storedBasis.cbotSymbol)) {
          continue
        }

        const newBasis = new Basis(
          basisLocation,
          storedBasis.cbotSymbol,
          storedBasis.basisContractSymbol,
          storedBasis.cashContractSymbol,
          deliveryStart,
          deliveryEnd,
        )

        newBasis.addBids(storedBasis.bidOptions)
        trackedBasises.push(newBasis)
      }

      basisLocation.trackedBasises = trackedBasises
      results.push(basisLocation)
    }

    return results
  }

  async saveBasisLocations(basisLocations: BasisLocation[]) {
    const storedLocationData: StoredLocation[] = []

    for (const location of basisLocations) {
      const storedBasises: StoredBasis[] = []

      for (const trackedBasis of location.trackedBasises) {
        if (!isValidSymbol(trackedBasis.cbotSymbol)) {
          continue
        }

        storedBasises.push({
          cbotSymbol: trackedBasis.cbotSymbol,
          basisContractSymbol: trackedBasis.basisContractSymbol,
          cashContractSymbol: trackedBasis.cashContractSymbol,
          deliveryStart: trackedBasis.deliveryStart,
          deliveryEnd: trackedBasis.deliveryEnd,
          bidOptions: Object.values(trackedBasis.bidsByDeliveryDate),
        })
      }

      storedLocationData.push({
        company: location.company,
        city: location.city,
        state: location.state,
        locationId: location.locationId,
        isCBOTLocation: location.isCBOTLocation(),
        trackedBasises: storedBasises,
      })
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storedLocationData))
  }

  async loadDefaultLocations(addPlaceholders = true) {
    const basisLocations = []

    const CBOT = new CBOTLocation()

    for (const cropType of Object.keys(CropType)) {
      const newBasis = nextBasisForCropType(CBOT, cropType)
      if (newBasis) {
        CBOT.trackedBasises.push(newBasis)
      }
    }

    basisLocations.push(CBOT)

    if (addPlaceholders) {
      basisLocations.push(new PlaceholderLocation('Rake'))
      basisLocations.push(new PlaceholderLocation('Lakota'))
      basisLocations.push(new PlaceholderLocation('Kiester'))
    }

    return basisLocations
  }

  setHasSeenWelcome(hasSeenWelcome: boolean) {
    return AsyncStorage.setItem(HAS_SEEN_WELCOME_KEY, hasSeenWelcome.toString())
  }

  hasSeenWelcome() {
    return AsyncStorage.getItem(HAS_SEEN_WELCOME_KEY).then(value => {
      return value === 'true'
    })
  }

  setEmail(email: string) {
    return AsyncStorage.setItem(EMAIL_KEY, email)
  }

  getEmail() {
    return AsyncStorage.getItem(EMAIL_KEY).then(email => (email ? email : undefined))
  }

  setMarketFeedTutorialPageIndex(index: number) {
    return AsyncStorage.setItem(MARKET_FEED_TUTORIAL_INDEX_KEY, index.toString())
  }

  getMarketFeedTutorialPageIndex() {
    return AsyncStorage.getItem(MARKET_FEED_TUTORIAL_INDEX_KEY).then(index => (index ? parseInt(index) : 4))
  }

  setPriceCheckTutorialPageIndex(index: number) {
    return AsyncStorage.setItem(PRICE_CHECK_TUTORIAL_INDEX_KEY, index.toString())
  }

  getPriceCheckTutorialPageIndex() {
    return AsyncStorage.getItem(PRICE_CHECK_TUTORIAL_INDEX_KEY).then(index => (index ? parseInt(index) : 5))
  }
  setHasSeenCFOTutorial(hasSeenCFOTutorial: boolean) {
    return AsyncStorage.setItem(HAS_SEEN_CFO_TUTORIAL_KEY, hasSeenCFOTutorial.toString())
  }

  hasSeenCFOTutorial() {
    return AsyncStorage.getItem(HAS_SEEN_CFO_TUTORIAL_KEY).then(value => {
      return value === 'true'
    })
  }
}
