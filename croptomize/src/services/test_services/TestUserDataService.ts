import { UserDataService } from '../UserDataService'
import { CBOTLocation } from '../../model/CBOTLocation'
import { PlaceholderLocation } from '../../model/PlaceholderLocation'
import { Basis } from '../../model/Basis'

export class TestUserDataService implements UserDataService {
  async loadBasisLocations() {
    return this.loadDefaultLocations()
  }

  async saveBasisLocations() {
    return
  }

  loadDefaultLocations() {
    const basisLocations = []

    const CBOT = new CBOTLocation()

    CBOT.trackedBasises.push(new Basis(CBOT, 'ZCU19'))
    CBOT.trackedBasises.push(new Basis(CBOT, 'ZSQ19'))
    CBOT.trackedBasises.push(new Basis(CBOT, 'ZWU19'))

    basisLocations.push(CBOT)
    basisLocations.push(new PlaceholderLocation('Rake'))
    basisLocations.push(new PlaceholderLocation('Lakota'))
    basisLocations.push(new PlaceholderLocation('Kiester'))

    return Promise.resolve(basisLocations)
  }

  setHasSeenWelcome(_hasSeenWelcomeScreen: boolean) {
    return Promise.resolve()
  }

  hasSeenWelcome() {
    return Promise.resolve(false)
  }

  setEmail(_email: string) {
    return Promise.resolve()
  }

  getEmail() {
    return Promise.resolve(undefined)
  }

  setMarketFeedTutorialPageIndex(_index: number) {
    return Promise.resolve()
  }

  getMarketFeedTutorialPageIndex() {
    return Promise.resolve(0)
  }

  setPriceCheckTutorialPageIndex(_index: number) {
    return Promise.resolve()
  }

  getPriceCheckTutorialPageIndex() {
    return Promise.resolve(0)
  }

  setHasSeenCFOTutorial(_hasSeenCFOTutorial: boolean) {
    return Promise.resolve()
  }

  hasSeenCFOTutorial() {
    return Promise.resolve(false)
  }
}
