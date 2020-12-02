import { CroptomizeService } from '../CroptomizeService'

export class LiveCroptomizeService implements CroptomizeService {
  async checkFrame(
    cropSymbol: string,
    monthSymbol: string,
    year: string,
    calculationRange: number,
    priceInCents: number,
  ) {
    try {
      const response = await fetch(
        `https://hsn4r278yb.execute-api.us-east-2.amazonaws.com/prod/check_frame?symbol=${cropSymbol}&month_symbol=${monthSymbol}&year=${year}&calculation_range=${calculationRange}&check_value_in_cents=${priceInCents}`,
      )

      if (response.status !== 200) {
        throw {
          status: response.status,
        }
      }

      const responseData = await response.json()

      return responseData['result']
    } catch (error) {
      console.log(
        `Error while fetching data frame data for symbol=${cropSymbol}&month_symbol=${monthSymbol}&year=${year}&calculation_range=${calculationRange}&check_value_in_cents=${priceInCents}`,
        error,
      )

      throw error
    }
  }

  async recordEmail(email: string) {
    try {
      const response = await fetch(
        `https://1cg44ltbc8.execute-api.us-east-2.amazonaws.com/prod/record_email?email=${email}`,
      )

      const responseData = await response.json()

      return responseData['result']
    } catch (error) {
      console.log(`error while recording email`, error)
    }
  }

  async getRecentPosts() {
    try {
      const response = await fetch(`https://croptomize.com/wp-json/wp/v2/posts?_embed`)

      return await response.json()
    } catch (error) {
      console.log(`error while fetching blog posts`, error)
    }
  }
}
