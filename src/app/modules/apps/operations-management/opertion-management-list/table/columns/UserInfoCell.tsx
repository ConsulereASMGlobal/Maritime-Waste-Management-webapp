/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import {User} from '../../core/_models'

type Props = {
  user: User
  showImage?: boolean
  value?: string
}

const UserInfoCell: FC<Props> = ({user, showImage = false, value = ''}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    {showImage && (
      <div className='symbol symbol-circle swymbol-50px overflow-hidden me-3'>
        <a href='#'>
          {user.avatar ? (
            <div className='symbol-label'>
              <img src={toAbsoluteUrl(`/media/${user.avatar}`)} alt={user.name} className='w-100' />
            </div>
          ) : (
            <div
              className={clsx(
                'symbol-label fs-3',
                `bg-light-${user.initials?.state}`,
                `text-${user.initials?.state}`
              )}
            >
              {user.initials?.label}
            </div>
          )}
        </a>
      </div>
    )}
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {typeof user[value] === 'boolean' ? (user[value] ? 'Yes' : 'No') : user[value]}
      </a>
      {/* <span>{user.email}</span> */}
    </div>
  </div>
)

export {UserInfoCell}
