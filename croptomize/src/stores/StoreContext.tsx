import React, { useContext } from 'react'
import { RootStore } from './RootStore'
import { serviceOptions } from '../services'

export const StoreContext = React.createContext(new RootStore(serviceOptions.testServices))

export function withStoreContext<T, P>(
  Component: React.ComponentClass<T> | React.FunctionComponent<T>,
  propertyMapper: (rootStore: RootStore) => P,
): React.FunctionComponent<Omit<T, keyof P>> {
  return (props: any) => {
    return (
      <StoreContext.Consumer>
        {storeContext => <Component {...props} {...propertyMapper(storeContext)} />}
      </StoreContext.Consumer>
    )
  }
}

export function useRootStore() {
  return useContext(StoreContext)
}
