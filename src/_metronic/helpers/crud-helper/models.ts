import {Dispatch, SetStateAction} from 'react'

export type ID = undefined | null | number

export type PaginationState = {
  page: number
  // size: 10 | 30 | 50 | 100
  size: any
  // perPage: 10 | 30 | 50 | 100
  type?: string
  initialApi?: string
  enabled?: boolean
  totalPages?: any
  links?: Array<{label: string; active: boolean; url: string | null; page: number | null}>
  meta?: any
}

export type SortState = {
  sort?: string
  order?: 'asc' | 'desc'
}

export type FilterState = {
  filter?: unknown
  status?: any
  start_date?: any
  end_date?: any
}

export type SearchState = {
  search?: string
}

export type Response<T> = {
  data?: T
  currentPage?: number
  totalItems?: number
  totalPages?: number
  meta?: any
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
  }
}

export type QueryState = PaginationState & SortState & FilterState & SearchState

export type QueryRequestContextProps = {
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}

export const initialQueryState: QueryState = {
  page: 1,
  size: 10,
  status: null,
  start_date: null,
  end_date: null,
}

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => {},
}

export type QueryResponseContextProps<T> = {
  response?: Response<Array<T>> | undefined
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = {refetch: () => {}, isLoading: false, query: ''}

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: any
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  setItemIdForUpdate: () => {},
  isAllSelected: false,
  disabled: false,
}
