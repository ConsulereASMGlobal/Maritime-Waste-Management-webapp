/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {PaginationState} from '../../../../../../../_metronic/helpers'
import React, {useMemo, useState} from 'react'
import ReactPaginate from 'react-paginate'

const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

const UsersListPagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  // const updatePage = (page: number | undefined | null) => {
  //   if (!page || isLoading || pagination.page === page) {
  //     return
  //   }
  //   updateState({page, size: pagination.size || 10})
  // }
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 100
  const endOffset = itemOffset + itemsPerPage

  const handlePagination = (page: number) => {
    if (isLoading) {
      return
    }
    updateState({page: page - 1})
  }
  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div className='table-pagination mt-4'>
          {(pagination.totalPages && (
            <ReactPaginate
              nextLabel={'Next'}
              breakLabel={'...'}
              previousLabel={'Previous'}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              activeClassName={'active'}
              breakClassName={'break-me'}
              // forcePage={currentPage - 1 || 0}
              containerClassName={'pagination'}
              disabledLinkClassName={'false'}
              // onPageChange={handlePageClick}
              onPageChange={(page: any) => handlePagination(page.selected + 1)}
              // onPageChange={(page: any) => handlePagination(page.selected + 1, perPage)}
              // pageCount={totalItems === 0 ? 1 : Math.ceil(totalItems / perPage)}
              pageCount={pagination.totalPages}
            />
          )) ||
            null}
        </div>
      </div>
    </div>
  )
}

export {UsersListPagination}
