import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Company Name',
    value: 'personalDetails[name]',
  },
  {
    label: 'Contact',
    value: 'personalDetails[mobile]',
  },
  {
    label: 'Stret Address',
    value: 'address',
  },

  {
    label: 'City',
    value: 'address[city]',
  },
  {
    label: 'Zip Code',
    value: 'address[zipCode]',
  },
  {
    label: 'SSM',
    value: 'bussinessImage',
  },

  {
    label: 'Bank',
    value: 'bankDetails[bankName]',
  },
  {
    label: 'Account No',
    value: 'bankDetails[accountNo]',
  },
  {
    label: 'A/C Holder',
    value: 'bankDetails[accountName]',
  },
  {
    action: ['edit', 'toggle'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
