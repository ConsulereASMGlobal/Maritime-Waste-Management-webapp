import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Company Name',
    value: 'companyDetails[name]',
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
    value: '-',
  },
  {
    label: 'Account No',
    value: '-',
  },
  {
    label: 'A/C Holder',
    value: '-',
  },
  {
    action: ['edit', 'toggle'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
