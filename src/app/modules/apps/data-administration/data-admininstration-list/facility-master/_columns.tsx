import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Business Name',
    value: 'companyDetails[name]',
  },
  {
    label: 'Representative',
    value: 'personalDetails[name]',
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
  {
    label: 'Country',
    value: 'address[country]',
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
    label: 'KYC',
    value: 'bussinessImage',
  },
  {
    action: ['edit', 'toggle'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
