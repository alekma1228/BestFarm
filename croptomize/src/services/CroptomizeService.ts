export interface BlogPost {
  id: number
  date: string
  link: string
  title: RenderedField
  content: RenderedField
  _embedded: Embedded
}

interface RenderedField {
  rendered: string
}

interface Embedded {
  'wp:featuredmedia'?: FeaturedMedia[]
}

interface FeaturedMedia {
  id: number
  alt_text: string
  media_details: FeaturedMediaDetails
}

interface FeaturedMediaDetails {
  width: number
  height: number
  file: string
  sizes: FeaturedMediaSizes
}

interface FeaturedMediaSizes {
  [key: string]: FeaturedMediaSize
}

interface FeaturedMediaSize {
  file: string
  width: number
  height: number
  mime_type: string
  source_url: string
}

export interface CroptomizeService {
  checkFrame: (
    cropSymbol: string,
    monthSymbol: string,
    year: string,
    calculationRange: number,
    priceInCents: number,
  ) => Promise<number>

  recordEmail: (email: string) => Promise<void>
  getRecentPosts: () => Promise<BlogPost[]>
}
