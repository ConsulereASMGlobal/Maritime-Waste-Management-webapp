/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {forwardRef, useEffect, useState, useImperativeHandle} from 'react'
import 'react-image-lightbox/style.css'
import Lightbox from 'react-image-lightbox'
import {useListView} from '../../../../app/modules/apps/data-administration/data-admininstration-list/core/ListViewProvider'

interface Props {}

const ImageLightBox = (props: Props, ref: any) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const {setItemIdForUpdate} = useListView()
  const [images, setImages] = useState<any>([])
  const [tempStore, setTempStore] = useState<any>({})

  const closeProperly = () => {
    // if (itemIdForUpdate.id) {
    //   setItemIdForUpdate({...itemIdForUpdate, hideModal: false})
    // }
    setIsOpen(false)
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (res: string, itemIdForUpdate) => {
        setImages([res])
        setIsOpen(true)
        setTempStore(itemIdForUpdate)
        setItemIdForUpdate({...itemIdForUpdate, hideModal: true})
      },
      close: () => {
        closeProperly()
      },
    }),
    []
  )

  function closeModal() {
    setIsOpen(false)
    setItemIdForUpdate(tempStore)
  }

  const [photoIndex, setPhotoIndex] = useState<any>(0)

  let nextImage, prevImage
  images.length > 1 ? (nextImage = images[(photoIndex + 1) % images.length]) : undefined
  images.length > 1
    ? (prevImage = images[(photoIndex + images.length - 1) % images.length])
    : undefined
  const imageBaseUrl = images[photoIndex]?.includes('http')
    ? images[photoIndex]
    : images[photoIndex]

  return (
    <React.Fragment>
      {isOpen && (
        <Lightbox
          imagePadding={50}
          animationDuration={0.1}
          // discourageDownloads={true}
          onCloseRequest={() => {
            closeModal()
          }}
          mainSrc={imageBaseUrl}
          nextSrc={(images.length > 1 && imageBaseUrl) || undefined}
          prevSrc={(images.length > 1 && imageBaseUrl) || undefined}
          mainSrcThumbnail={imageBaseUrl}
          prevSrcThumbnail={imageBaseUrl}
          nextSrcThumbnail={imageBaseUrl}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
          // imageCaption={images[photoIndex || ""]}
          imageTitle={`${photoIndex + 1} of ${images.length}`}
        />
      )}
    </React.Fragment>
  )
}

export default forwardRef(ImageLightBox)
