import { BasisLocation } from '../model/BasisLocation'

export interface UserDataService {
  loadBasisLocations: () => Promise<BasisLocation[]>
  saveBasisLocations: (basisLocations: BasisLocation[]) => void
  loadDefaultLocations: () => Promise<BasisLocation[]>
  setHasSeenWelcome: (hasSeenWelcome: boolean) => Promise<void>
  hasSeenWelcome: () => Promise<boolean>
  setEmail: (email: string) => Promise<void>
  getEmail: () => Promise<string | undefined>
  setMarketFeedTutorialPageIndex: (index: number) => Promise<void>
  getMarketFeedTutorialPageIndex: () => Promise<number | 0>
  setPriceCheckTutorialPageIndex: (index: number) => Promise<void>
  getPriceCheckTutorialPageIndex: () => Promise<number | 0>
  setHasSeenCFOTutorial: (hasSeenCFOTutorial: boolean) => Promise<void>
  hasSeenCFOTutorial: () => Promise<boolean>
}
