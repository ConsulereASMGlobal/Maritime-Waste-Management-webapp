import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Badge Name',
    value: 'badgeName',
  },
  {
    label: 'Description',
    value: 'badgeDescription',
  },
  {
    label: 'Badge Icon',
    value: 'img1',
  },
  {
    label: 'Display Icon',
    value: 'img2',
  },
  {
    label: 'Plastic Station',
    value: 'plasticStation',
  },
  {
    label: 'No of Deposits',
    value: 'totalCount',
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
