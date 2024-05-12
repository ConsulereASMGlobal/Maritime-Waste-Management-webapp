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
    label: 'Province',
    value: 'address[state]',
  },
  {
    label: 'Zip Code',
    value: 'address[zipCode]',
  },
  {
    label: 'Business Permit',
    value: 'kycDocument[docNumber]',
  },
  {
    label: 'Document',
    value: 'avatar',
  },
  {
    action: ['edit', 'toggle'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
