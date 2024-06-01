import {FC, useState, createContext, useContext} from 'react'
import {
  QueryState,
  QueryRequestContextProps,
  initialQueryRequest,
  WithChildren,
} from '../../../../../../_metronic/helpers'

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

const QueryRequestProvider: FC<WithChildren> = ({children, initialValue}) => {
  const [state, setState] = useState<QueryState>({...initialQueryRequest.state, ...initialValue})

  const updateState = (updates: Partial<QueryState>) => {
    // console.log({state, updates}, '15')
    const updatedState = {...state, ...updates} as QueryState
    // console.log({updates, state, updatedState})
    setState(updatedState)
  }
  return (
    <QueryRequestContext.Provider value={{state, updateState}}>
      {children}
    </QueryRequestContext.Provider>
  )
}

const useQueryRequest = () => useContext(QueryRequestContext)
export {QueryRequestProvider, useQueryRequest}
