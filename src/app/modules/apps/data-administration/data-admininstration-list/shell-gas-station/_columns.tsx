import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Vessel No',
    value: 'personalDetails[name]',
  },
  {
    label: 'Captain Name',
    value: 'personalDetails[firstName]',
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
    label: 'City',
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
    label: 'Profile',
    value: 'personalImage',
  },
  {
    action: ['edit', 'toggle', 'qr'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
