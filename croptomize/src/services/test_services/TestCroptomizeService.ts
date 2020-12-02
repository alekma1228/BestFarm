import { CroptomizeService } from '../CroptomizeService'

export class TestCroptomizeService implements CroptomizeService {
  async checkFrame(
    _cropSymbol: string,
    _monthSymbol: string,
    _year: string,
    _calculationRange: number,
    _priceInCents: number,
  ) {
    return 0.0
  }

  async recordEmail(_email: string) {
    return
  }

  async getRecentPosts() {
    return []
  }
}
