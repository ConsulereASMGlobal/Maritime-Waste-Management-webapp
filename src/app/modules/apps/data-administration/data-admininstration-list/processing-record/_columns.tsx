import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Date',
    value: 'createdAt',
  },
  {
    label: 'Aggregator',
    value: 'hubName',
  },
  {
    label: 'Process Name',
    value: 'processName',
  },
  {
    label: 'Input',
    value: 'inputMaterialName',
  },
  {
    label: 'Quantity (KG)',
    value: 'inputQuantity',
  },
  {
    label: 'Output',
    value: 'productionItemDetails',
  },
  {
    label: 'Quantity (KG)',
    value: 'productionItemDetailsQuantity',
  },
  {
    label: 'Wastage',
    value: 'wastage',
  },
  {
    label: 'Team Size',
    value: 'teamSize',
  },
  {
    label: 'Wroking Hrs',
    value: 'operatingHours',
  },
  /* {
    label: 'Receipt',
    value: 'qty',
  }, */
  {
    action: ['view_certificate'],
  },
  // {
  //   action: ['edit', 'toggle'],
  // },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
