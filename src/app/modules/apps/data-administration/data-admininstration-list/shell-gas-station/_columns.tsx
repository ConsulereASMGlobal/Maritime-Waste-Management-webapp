import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Contact Info',
    value: 'personalDetail',
  },
  {
    label: 'Address',
    value: 'street',
  },
  // {
  //   label: 'City, Province',
  //   value: 'cityProvince',
  // },
  {
    label: 'Geo Location',
    value: 'geoLocation',
  },
  {
    label: 'PPRS',
    value: '-',
  },
  {
    label: 'ISO 9001',
    value: '-',
  },
  {
    label: 'Establishment',
    value: 'bussinessImage',
  },
  {
    label: 'Identity',
    value: 'personalImage',
  },
  {
    label: 'Facility',
    value: 'personalImage',
  },
  // {
  //   label: 'Popular',
  //   value: 'popular',
  // },
  {
    action: ['edit', 'toggle'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
