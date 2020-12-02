import { CropType } from './Symbols'

export const checkStaticFrame = (cropType: CropType, priceInCents?: number) => {
  if (!priceInCents) {
    console.log('NO VALUE FOUND')
    return
  }

  // Default to corn
  let mean = 379.45
  let standardDeviation = 68.17

  switch (cropType) {
    case CropType.WHEAT_SRW:
      mean = 503.92
      standardDeviation = 65.0
      break
    case CropType.WHEAT_HRS:
      mean = 565.59
      standardDeviation = 75.0
      break
    case CropType.WHEAT_HRW:
      mean = 527.0
      standardDeviation = 70.0
      break
    case CropType.SOYBEANS:
      mean = 887.53
      standardDeviation = 120.0
      break
  }

  return cdf(priceInCents, mean, standardDeviation)
}

function cdf(valueInCents: number, mean: number, standardDeviation: number) {
  // Dark ma(th)gic
  valueInCents = (valueInCents - mean) / standardDeviation
  const t = 1 / (1 + 0.2315419 * Math.abs(valueInCents))
  const d = 0.3989423 * Math.exp((-valueInCents * valueInCents) / 2)
  let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))

  if (valueInCents > 0) {
    prob = 1 - prob
  }
  return prob
}
