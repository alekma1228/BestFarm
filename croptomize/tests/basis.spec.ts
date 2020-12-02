import moment from 'moment'
import { CropType, nextBasisForCropType, changeMonthForSymbol } from '../src/model/Symbols'
import { BasisLocation } from '../src/model/BasisLocation'

function currentBasis(cropType: CropType) {
  const location = new BasisLocation('', '', '')
  return nextBasisForCropType(location, cropType)
}

describe('Basis', () => {
  describe('#needsRollForward', () => {
    describe('CBOT', () => {
      it('returns false if the basis is in the future', () => {
        const basis = currentBasis(CropType.CORN)
        expect(basis.needsRollForward()).toBe(false)
      })

      it('returns true if the basis is this month', () => {
        const basis = currentBasis(CropType.CORN)
        basis.cbotSymbol = changeMonthForSymbol(basis.cbotSymbol, moment().format('MMM'))
        expect(basis.needsRollForward()).toBe(true)
      })

      it('returns true if the basis month is in the past', () => {
        const basis = currentBasis(CropType.CORN)
        basis.cbotSymbol = changeMonthForSymbol(
          basis.cbotSymbol,
          moment()
            .subtract(1, 'month')
            .format('MMM'),
        )
        expect(basis.needsRollForward()).toBe(true)
      })
    })
  })

  describe('#nextBasis', () => {
    describe('CBOT', () => {
      it('returns the current basis if the basis is in the future', () => {
        const basis = currentBasis(CropType.CORN)
        expect(basis.nextBasis().cbotSymbol).toBe(basis.cbotSymbol)
      })

      it('returns a new basis if the basis is this month', () => {
        const basis = currentBasis(CropType.CORN)
        const nextSymbol = basis.cbotSymbol
        basis.cbotSymbol = changeMonthForSymbol(
          nextSymbol,
          moment()
            .subtract(1, 'month')
            .format('MMM'),
        )

        const nextBasis = basis.nextBasis()
        expect(nextBasis).toBeDefined()

        if (nextBasis) {
          expect(nextBasis.cbotSymbol).toBe(nextSymbol)
        }
      })
    })
  })
})
