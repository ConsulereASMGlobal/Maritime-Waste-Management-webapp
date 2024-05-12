import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Date',
    value: 'creationDate',
  },
  {
    label: 'Ocean Hub',
    value: 'name',
  },
  {
    label: 'Hub Address',
    value: 'addrTwo',
  },
  {
    label: 'Shift',
    value: 'shift',
  },
  {
    label: 'Production Incharge',
    value: 'name',
  },

  {
    label: 'Plastic Type',
    value: 'plasticType',
  },

  {
    label: 'Process Name',
    value: 'processName',
  },
  {
    label: 'Input Quantity Sorted (kg)',
    value: 'inputQuantitySorted',
  },
  {
    label: 'Output (kg) / Type 1',
    value: 'type1',
  },
  {
    label: 'Type 2',
    value: 'type2',
  },
  {
    label: 'Type 3',
    value: 'type',
  },
  {
    label: 'Type 4',
    value: 'type',
  },
  {
    label: 'Type 5',
    value: 'type',
  },
  {
    label: 'Type 6',
    value: 'type',
  },
  {
    label: 'Type 7',
    value: 'type',
  },
  {
    label: 'Wastage',
    value: 'longitude',
  },
  {
    label: 'Working Hours',
    value: 'operatingHours',
  },
  {
    label: 'Crew Size',
    value: 'operationDays',
  },
  {
    action: ['view', 'download'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
