import { observable, action } from 'mobx'
import { colorForSymbol, pictureForSymbol } from '../model/Symbols'

type TIcon = { backgroundColor?: string; picture?: any; pictureStyle?: any }
export class HeaderStore {
  @observable leftButton: { [key: string]: Function } = {}
  @observable rightButton: { [key: string]: Function } = {}
  @observable titleIcon: { [key: string]: TIcon } = {}

  @action
  onLeftPress(key: string, data = {}) {
    if (this.leftButton[key]) {
      this.leftButton[key](data)
    }
  }
  @action
  onRightPress(key: string, data = {}) {
    if (this.rightButton[key]) {
      this.rightButton[key](data)
    }
  }
  @action
  setIcon(key: string, icon: TIcon, symbolPrefix?: string) {
    this.titleIcon[key] = symbolPrefix
      ? {
          ...icon,
          backgroundColor: colorForSymbol(symbolPrefix),
          picture: pictureForSymbol(symbolPrefix),
        }
      : icon
  }
}
