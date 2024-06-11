import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Business Name',
    value: 'companyDetails[name]',
  },
  {
    label: 'Contact',
    value: 'personalDetail',
  },
  {
    label: 'Street',
    value: 'street',
  },
  {
    label: 'City',
    value: 'address[city]',
  },
  // {
  //   label: 'City, Province',
  //   value: 'cityProvince',
  // },
  /*   {
    label: 'Geo Location',
    value: 'geoLocation',
  }, */
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
