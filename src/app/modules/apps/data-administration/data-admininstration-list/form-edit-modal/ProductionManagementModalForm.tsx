import {FC} from 'react'
import {User} from '../core/_models'
import {useListView} from '../core/ListViewProvider'
import DownloadPDFButton from '../table/columns/DownloadPDFButton'
type Props = {
  isUserLoading: boolean
  user?: User | any
}

const DropOffPointModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {itemIdForUpdate} = useListView()

  const data = itemIdForUpdate
  console.log({data})

  return (
    <div>
      <main className='container mx-auto'>
        <header>
          <div className='relative'>
            <img
              alt='images'
              className='absolute inset-0 w-full h-[111.65px]'
              src='/media/books/header_bg.png'
            />
            <p className='text-[28px] absolute text-white top-1.5 right-3 font-bold z-[1]'>
              Production Report
            </p>
            <img
              width={120}
              height={120}
              alt='images'
              className='absolute z-[1] pl-6 mt-1'
              // src='/media/logos/sidebar-logo.svg'
              src='/media/logos/sidebar-logo.png'
            />
            <img
              alt='images'
              className='w-[314px] h-[61px] absolute right-0 top-0'
              src='/media/books/header_rightpng.png'
            />
          </div>
        </header>
        <div className='pt-[111.16px] px-12'>
          <div className='py-3 px-4 grid grid-cols-2 grid-row-3 gap-2'>
            <p className='font-bold text-sm'>
              Date:{' '}
              <span className='font-normal'>
                {new Date(+data?.createdAt || new Date()).toLocaleDateString()}
              </span>
            </p>
            <p className='font-bold text-sm'>
              Address:{' '}
              <span className='font-normal'>
                {(data?.hubInfo?.address?.city || '') +
                  ((data?.hubInfo?.address?.city && ', ') || '') +
                  (data.hubInfo?.address?.country || '')}
              </span>
            </p>
            <p className='font-bold text-sm'>
              Plant Name: <span className='font-normal'>{data.hubName}</span>
            </p>
            <p className='font-bold text-sm'>
              Shift: <span className='font-normal'>{data.shiftName}</span>
            </p>
            <p className='font-bold text-sm'>
              Process Name: <span className='font-normal'>{data.processName}</span>
            </p>
            <p className='font-bold text-sm'>
              Reported By: <span className='font-normal'>{data?.receiverInfo?.name}</span>
            </p>
          </div>
        </div>

        {(data?.inputMaterialName && (
          <div className='mt-3 px-[32px]'>
            <div className="grid grid-cols-2 rounded-t-md bg-[url('/media/books/table-bg.png')] bg-no-repeat bg-cover py-2.5 px-4">
              <p className='text-base font-bold text-white'>Input Material</p>
              <p className='text-base font-bold place-self-end text-white'>Quantity(kg)</p>
            </div>
            <div className='grid grid-cols-2 py-[10px] px-4 bg-[#F6F6F6]'>
              <p className='font-bold text-base'>{data?.inputMaterialName}</p>
              <p className='font-bold text-base place-self-end'>{data?.inputQuantity}</p>
            </div>
          </div>
        )) ||
          null}

        <div className='mt-3 px-[32px]'>
          <div className="grid grid-cols-2 rounded-t-md bg-[url('/media/books/table-bg.png')] bg-no-repeat bg-cover py-2.5 px-4">
            <p className='text-base font-bold text-white'>Output Material</p>
            <p className='text-base font-bold place-self-end text-white'>Quantity(kg)</p>
          </div>
          {data.productionItemDetails.map((each, ind) => (
            <div
              key={ind + 1 + ''}
              className={`grid grid-cols-2 py-[10px] px-4 ${
                ind % 2 === 0 ? 'bg-white' : 'bg-[#F6F6F6]'
              }`}
            >
              <p className='font-bold text-base'>{each.itemName}</p>
              <p className='font-bold text-base place-self-end'>{each.quantity}</p>
            </div>
          ))}
          <div className='grid grid-cols-2 py-[10px] px-4 bg-white'>
            <p className='font-bold text-base'>Wastage</p>
            <p className='font-bold text-base place-self-end'>{data.wastage}</p>
          </div>
        </div>

        {/*  <div className='my-3 px-[32px]'>
          <table>
            <tr className='bg-black text-white'>
              <th className='px-3 py-2 rounded-tl-md'>KPI</th>
              <th className='px-3 py-2'>Team Size</th>
              <th className='px-3 py-2'>Operating Hour</th>
              <th className='px-3 py-2'>Manpower Productivity</th>
              <th className='px-3 py-2 rounded-tr-md'>Sorting Efficiency</th>
            </tr>
            <tr className='bg-[#eaf8ea]'>
              <td className='px-3 py-[10px]'>UOM</td>
              <td className='px-3 py-[10px]'>NOS</td>
              <td className='px-3 py-[10px]'>Hrs</td>
              <td className='px-3 py-[10px]'>Kg/Person</td>
              <td className='px-3 py-[10px]'>Kg/Hour</td>
            </tr>
            <tr>
              <td className='px-3 py-[10px]'>Value</td>
              <td className='px-3 py-[10px]'>{data.teamSize}</td>
              <td className='px-3 py-[10px]'>{data.operatingHours}</td>
              <td className='px-3 py-[10px]'>{data.inputQuantity / data.teamSize || 0}</td>
              <td className='px-3 py-[10px]'>{data.inputQuantity / data.operatingHours || 0}</td>
            </tr>
          </table>
        </div> */}

        <footer className="mt-8 min-h-[60px] bg-[url('/media/books/footer_bg.png')] bg-no-repeat bg-auto relative h-full">
          <img alt='images' src='/media/books/logo_2nd.png' className='pl-[32px] pt-8' />
          <img
            alt='images'
            src='/media/books/footer_right.png'
            className='absolute right-0 top-0'
          />
        </footer>
      </main>
      <DownloadPDFButton name='production-report' />
    </div>
  )
}

export default DropOffPointModalForm
