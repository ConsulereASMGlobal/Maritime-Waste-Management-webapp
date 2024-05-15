import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Business Name',
    value: 'name',
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
    value: 'street',
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
    value: '-',
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
