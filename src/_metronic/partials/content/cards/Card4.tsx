/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'

type Props = {
  icon: string
  title: string
  description: string
}

const Card4: FC<Props> = ({icon, title, description}) => {
  return (
    <div className='card h-100'>
      <div
        style={{backgroundColor: '#F8F8f4'}}
        className={`card-body d-flex justify-content-center ${
          !icon ? '' : 'text-center'
        } flex-column p-8`}
      >
        {(icon && (
          <div className='symbol symbol-50px mb-6'>
            <img src={toAbsoluteUrl(icon)} alt='' />
          </div>
        )) ||
          null}
        <div className='fs-5 fw-bolder mb-2'>{title}</div>
        <div className='fs-7 fw-bold text-gray-400 mt-auto'>{description}</div>
        {!icon && (
          <>
            <div className='fs-6 fw-bolder text-gray-700'>Total Stock 129 Kgs</div>
            <div className='fw-bold text-gray-400 ' style={{marginTop: '20px'}}>
              Click to view stock details
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export {Card4}
