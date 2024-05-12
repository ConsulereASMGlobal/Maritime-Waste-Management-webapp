import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Name/ Company Name',
    value: 'name',
  },
  /* {
    label: 'Birthday',
    value: 'birthday',
  },
  {
    label: 'Gender',
    value: 'gender',
  }, */
  /* {
    label: 'Email Address',
    value: 'email',
  }, */
  {
    label: 'Address',
    value: 'fullAddress',
  },
  {
    label: 'Mobile Number',
    value: 'mobile',
  },
  {
    label: 'Membership Number',
    value: 'code',
  },
  {
    label: 'Type',
    value: 'customerType',
  },
  /*  {
    label: 'Joining Date',
    value: 'joinDate',
  },
  {
    label: 'Current Level',
    value: 'currentLevel',
  },
  {
    label: 'Points Earned',
    value: 'pointEarned',
  },
  {
    label: 'Redeemed',
    value: 'pointRedeemed',
  }, */
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
