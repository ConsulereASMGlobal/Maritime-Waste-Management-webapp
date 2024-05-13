import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Aggregator',
    value: 'birthday',
  },
  {
    label: 'Mobile Number/ Email',
    value: 'gender',
  },
  /* {
    label: 'Email Address',
    value: 'email',
  }, */
  {
    label: 'Address City',
    value: 'fullAddress',
  },
  {
    label: 'Bank Name',
    value: 'fullAddress',
  },
  {
    label: 'Ac Number',
    value: 'fullAddress',
  },
  {
    label: 'ID PIC',
    value: 'fullAddress',
  },
  {
    label: 'Profile Pic',
    value: 'fullAddress',
  },

  {
    label: 'Total Payment',
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
