import { BasisLocation } from './BasisLocation'
import { computed } from 'mobx'

// Dummy location for display before the user adds their own locations

export class PlaceholderLocation extends BasisLocation {
  constructor(city: string) {
    super('', city, '')
  }

  isPlaceholder() {
    return true
  }

  @computed
  get displayName() {
    return this.city
  }
}
