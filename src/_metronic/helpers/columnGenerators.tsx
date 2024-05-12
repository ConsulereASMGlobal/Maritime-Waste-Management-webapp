// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from '../../app/modules/apps/data-administration/data-admininstration-list/table/columns/UserInfoCell'
import {UserLastLoginCell} from '../../app/modules/apps/data-administration/data-admininstration-list/table/columns/UserLastLoginCell'
import {UserTwoStepsCell} from '../../app/modules/apps/data-administration/data-admininstration-list/table/columns/UserTwoStepsCell'
import {UserActionsCell} from '../../app/modules/apps/data-administration/data-admininstration-list/table/columns/UserActionsCell'
import {UserSelectionCell} from '../../app/modules/apps/data-administration/data-admininstration-list/table/columns/UserSelectionCell'
import {UserCustomHeader} from '../../app/modules/apps/data-administration/data-admininstration-list/table/columns/UserCustomHeader'
import {UserSelectionHeader} from '../../app/modules/apps/data-administration/data-admininstration-list/table/columns/UserSelectionHeader'
import {boolean} from 'yup'
import {UserPopularCell} from '../../app/modules/apps/data-administration/data-admininstration-list/table/columns/UserPopularCell'
const generator = (data) => {
  return data.map((eachHeader, idx) => {
    if (eachHeader.label === 'certificate_view') {
      return {
        Header: (props) => (
          <UserCustomHeader tableProps={props} title={'Certificate'} className=' min-w-100px' />
        ),
        id: idx + 1 + '',
        Cell: ({...props}) => {
          return props?.data[props.row.index]?.status === 'Completed' ? (
            <UserActionsCell id={props.data[props.row.index].id} action={['view']} />
          ) : null
        },
      }
    } else if (eachHeader?.action?.length > 0) {
      return {
        Header: (props) => (
          <UserCustomHeader
            tableProps={props}
            title={eachHeader.action.includes('certificate') ? 'Certificate' : 'Actions'}
            className=' min-w-100px'
          />
        ),
        id: idx + 1 + '',
        Cell: ({...props}) => (
          <UserActionsCell
            allData={props.data[props.row.index]}
            id={
              eachHeader?.action.includes('id')
                ? props.data[props.row.index].id
                : props.data[props.row.index]
            }
            action={eachHeader?.action}
          />
        ),
      }
    } else
      return {
        Header: (props) => (
          <UserCustomHeader
            tableProps={props}
            title={eachHeader.label}
            className={
              ['S.N', 'ID'].includes(eachHeader.label)
                ? 'min-w-25px'
                : eachHeader.label === 'Recycler'
                ? 'min-w-150px'
                : 'min-w-125px'
            }
          />
        ),
        id: idx + 1 + '',
        Cell: ({...props}) => {
          return ['S.N', 'ID'].includes(eachHeader.label) ? (
            props.row.index + 1
          ) : eachHeader?.label?.toLowerCase() === 'popular' ? (
            <UserPopularCell
              flag={props.data[props.row.index][eachHeader?.value] || false}
              id={props.data[props.row.index].id}
            />
          ) : (
            <UserInfoCell
              mapData={eachHeader.value}
              user={props.data[props.row.index]}
              showImageOnly={eachHeader.value === 'avatar'}
            />
          )
        },
      }
  })
}

// const columnGenerators: ReadonlyArray<Column<User>> = generator()
const columnGenerators = (header) => {
  return generator(header)
}

export {columnGenerators}
