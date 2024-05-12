import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Format',
    value: 'facilityType',
  },
  {
    label: 'Company Name',
    value: 'companyDetails[name]',
  },
  {
    label: 'Registerd Address',
    value: 'companyDetails[address]',
  },
  {
    label: 'Contact Info',
    value: 'contactDetail',
  },
  {
    label: 'Manager',
    value: 'personalDetails[name]',
  },
  {
    label: 'Contact Info',
    value: 'personalDetail',
  },
  {
    label: 'SEC/ DTI',
    value: 'bussinessImage',
  },
  {
    label: 'Agreement',
    value: 'personalImage',
  },
  {
    action: ['edit', 'toggle'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
