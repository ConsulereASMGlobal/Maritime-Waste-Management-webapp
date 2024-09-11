// import {Column} from 'react-table'
// import {columnGenerators} from '../../../../../../_metronic/helpers'

// const header = [
//   {
//     label: 'S.N',
//     value: 'id',
//   },
//   {
//     label: 'Collection Point',
//     value: 'pickupPointName',
//   },
//   {
//     label: 'Stock (KG)',
//     value: 'stock',
//   },
//   {
//     label: 'Collected (KG)',
//     value: 'collected',
//   },
//   {
//     label: 'Processed (KG)',
//     value: 'processed',
//   },
//   {
//     label: 'Supplied (KG)',
//     value: 'supplied',
//   },
//   // {
//   //   label: 'My trips',
//   //   action: ['edit'],
//   // },
// ]

// const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

// export {roleColumns}

import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Vessel No',
    value: 'pickupPointName',
  },
  {
    label: 'City',
    value: 'pickupPointAddress[city]',
  },
  {
    label: 'Loaded',
    value: 'collected',
  },
  {
    label: 'Collected',
    value: 'processed12',
  },
  {
    label: 'Processed',
    value: 'processed',
  },
  {
    label: 'Unloaded',
    value: 'supplied',
  },
  {label: 'Stock', value: 'stock'},
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
