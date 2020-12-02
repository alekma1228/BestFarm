export interface PriceCheckTutorialComponentProps {
  pageIndex: number
  dropDownText?: string
  estimatePrice?: string
  probabilityIcon?: number
  probabilityWord?: string
  probabilityText?: string
  onNext: () => void
  onExit: () => void
}

export type PriceCheckTutorialProps = PriceCheckTutorialComponentProps
