import {ReactNode} from 'react'
import {MenuComponent} from '../assets/ts/components'

type WithChildren = {
  children?: ReactNode
  initialValue?: any
}

const reInitMenu = () => {
  setTimeout(() => {
    MenuComponent.reinitialization()
  }, 500)
}

export {type WithChildren, reInitMenu}
