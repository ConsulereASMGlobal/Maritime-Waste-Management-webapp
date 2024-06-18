/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTIcon} from '../../../helpers'

type Props = {
  className: string
  color: string
  svgIcon?: string
  iconColor: string
  title: string
  titleColor?: string
  description: string
  descriptionColor?: string
  img?: string
  iconName?: string
}

const StatisticsWidget5: React.FC<Props> = ({
  className,
  color,
  svgIcon = '',
  iconColor,
  title,
  titleColor,
  img,
  description,
  descriptionColor,
  iconName = '',
}) => {
  return (
    <a href='#' className={`card  hoverable ${className}`} style={{backgroundColor: color || ''}}>
      <div className='card-body'>
        {/*  {(!img && <KTIcon iconName={svgIcon} className={`text-${iconColor} fs-3x ms-n1`} />) ||
          null} */}
        {!img && (
          <div className='flex'>
            <img
              width={35}
              height={35}
              // src={`/media/svg/dashboard/${img}.png`}
              src={svgIcon}
              alt='images'
              className={`text-${iconColor} fs-3x ms-n1`}
            />
            <span className='text-white'>{iconName}</span>
          </div>
        )}

        {(img && (
          <>
            <img
              width={35}
              height={35}
              src={`/media/svg/dashboard/${img}.png`}
              alt='images'
              className={`text-${iconColor} fs-3x ms-n1`}
            />
          </>
        )) ||
          null}

        {/* <div className={`text-${titleColor} fw-bold fs-2 mb-2 mt-5`}>{title}</div> */}
        <div className={`text-white fw-bold fs-2 mb-2 mt-5`}>{title}</div>

        {/* <div className={`fw-semibold text-${descriptionColor}`}>{description}</div> */}
        <div className={`fw-semibold text-white`}>{description}</div>
      </div>
    </a>
  )
}

export {StatisticsWidget5}
