import { Column } from 'react-table'
import { columnGenerators } from '../../../../../../_metronic/helpers'

const header = [
  { label: 'S.N', value: 'id' },
  {
    label: 'Vessel No',
    value: 'personalDetails[mobile]',
  },
  {
    label: 'Name',
    value: 'personalDetails[name]',
  },
  {
    label: 'Company',
    value: 'franchiseName',
  },
  /* {
    label: 'Street',
    value: 'street',
  }, */
  {
    label: 'Home Port',
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
    label: 'Vessel',
    value: 'bussinessImage',
  },
  {
    label: 'User',
    value: 'personalImage',
  },
  {
    action: ['edit', 'toggle', 'qr'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export { roleColumns }
