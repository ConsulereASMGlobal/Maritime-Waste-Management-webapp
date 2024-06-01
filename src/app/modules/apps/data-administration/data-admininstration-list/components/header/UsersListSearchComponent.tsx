/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {initialQueryState, KTIcon, useDebounce} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Button} from 'react-bootstrap'
import {UsersListToolbar} from './UserListToolbar'
import {useLocation} from 'react-router-dom'

const UsersListSearchComponent = ({
  placeholder = 'Search user',
  searchElements = [],
  showResetButton = false,
}) => {
  const {updateState} = useQueryRequest()
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [searchQueryData, setSearchQueryData] = useState<any>({})

  // const debouncedSearchTerm = useDebounce(searchTerm, 150)
  // useEffect(
  //   () => {
  //     if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
  //       updateState({search: debouncedSearchTerm, ...initialQueryState})
  //     }
  //   },
  //   [debouncedSearchTerm]
  // )

  const handleChange = (name: string, value: string) => {
    setSearchQueryData({...searchQueryData, [name]: value})
  }

  const handleResetQuery = () => {
    setSearchQueryData({})
    updateState({
      ...initialQueryState,
    })
  }

  const handleSearchFilter = () => {
    updateState({
      ...initialQueryState,
      ...searchQueryData,
    })
  }
  const renderSearch = () => {
    return searchElements.map((eachSearch: any, eachIndex: number) => {
      switch (eachSearch.type) {
        case 'innn':
          return (
            <>
              <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
              <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />{' '}
            </>
          )
        case 'datePicker':
          return (
            <div key={eachIndex + 1 + ''}>
              <label className='form-label fs-6 fw-bold'>{eachSearch.label || ''}</label>
              <br />
              <DatePicker
                placeholderText={`Select ${eachSearch.label}`}
                className='form-control form-control-solid w-250px ps-14'
                selected={searchQueryData[eachSearch.name] || null}
                onChange={(date) =>
                  handleChange(eachSearch.name, new Date(date).toLocaleDateString())
                }
              />{' '}
            </div>
          )
        case 'select':
          return (
            <div key={eachIndex + 1 + ''} className=''>
              <label className='form-label fs-6 fw-bold'>{eachSearch.label || ''}</label>
              <select
                className='form-select form-select-solid'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                onChange={(e) =>
                  showResetButton
                    ? handleChange(eachSearch.name, e.target.value)
                    : updateState({
                        [location.pathname.includes('mass-balance') ? 'category' : 'type']:
                          e.target.value,
                        initialApi: location.pathname.includes('mass-balance')
                          ? `stock`
                          : `categories/${e.target.value}/${eachSearch?.queryType || 'items'}`,
                        ...initialQueryState,
                      })
                }
                value={
                  showResetButton
                    ? searchQueryData[eachSearch.name]
                    : searchQueryData[eachSearch.name]
                }
              >
                {eachSearch.options.map((eachOption, eachInd) => (
                  <option key={eachInd + 1 + ''} value={eachOption.value}>
                    {eachOption.label}
                  </option>
                ))}
              </select>
            </div>
          )
        default:
          break
      }
    })
  }
  const location = useLocation()

  return (
    <>
      <div
        className={`grid grid-cols-4 gap-3 ${
          location.pathname.includes('mass-balance') ? '-mt-4' : 'my-2'
        }`}
      >
        {(searchElements.length > 0 && (
          <>
            {renderSearch()}
            {showResetButton && (
              <div
                className='flex-end'
                style={{
                  marginTop: '27px',
                }}
              >
                <button
                  type='button'
                  onClick={handleResetQuery}
                  className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
                  data-kt-menu-dismiss='true'
                  data-kt-user-table-filter='reset'
                  disabled={Object.keys(searchQueryData).length === 0}
                >
                  Reset
                </button>
                <button
                  type='button'
                  style={{backgroundColor: '#1034A6'}}
                  onClick={handleSearchFilter}
                  className='btn btn-primary fw-bold px-6'
                  data-kt-menu-dismiss='true'
                  data-kt-user-table-filter='filter'
                  disabled={!(Object.keys(searchQueryData).length > 0)}
                >
                  Apply
                </button>
              </div>
            )}
          </>
        )) ||
          null}
      </div>
    </>
  )
}

export {UsersListSearchComponent}
