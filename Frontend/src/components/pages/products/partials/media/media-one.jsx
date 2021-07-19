import React, { useState, useEffect } from 'react'
import { Magnifier } from 'react-image-magnifiers'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import { quantityInputs } from '../../../../../utils'

function MediaOne(props) {
  const { product, adClass = 'product-gallery-vertical' } = props

  if (!product) {
    window.location = process.env.PUBLIC_URL + 'pages/404'
  }

  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setStatus] = useState(false)

  const bigImages = product.lgPictures ? product.lgPictures : product.pictures
  const smallImages = product.smPictures ? product.smPictures : product.pictures

  useEffect(() => {
    quantityInputs()
  }, [])

  function openLightBox() {
    let index = parseInt(
      document.querySelector('.product-main-image').getAttribute('index')
    )

    if (!index) {
      index = 0
    }
    setStatus(true)
    setPhotoIndex(index)
  }

  function closeLightBox() {
    setStatus(false)
  }

  const setNextHandler = () => {
    setPhotoIndex(photoIndex => (photoIndex + 1) % bigImages.length)
  }

  const setPrevHandler = () => {
    setPhotoIndex(
      photoIndex => (photoIndex + bigImages.length - 1) % bigImages.length
    )
  }

  return (
    <>
      <div className={`product-gallery ${adClass}`}>
        <div className="row m-0">
          <figure className="product-main-image" index="0">
            {product.new ? (
              <span className="product-label label-new">New</span>
            ) : (
              ''
            )}
            {product.top ? (
              <span className="product-label label-top">Top</span>
            ) : (
              ''
            )}
            {product.discount ? (
              <span className="product-label label-sale">
                {product.discount}% off
              </span>
            ) : (
              ''
            )}
            {0 === product.stock ? (
              <span className="product-label label-out">Out of Stock</span>
            ) : (
              ''
            )}{' '}
            <Magnifier
              imageSrc={`${process.env.REACT_APP_API_URL}/${product.pictures[0]}`}
              imageAlt="Example"
              largeImageSrc={`${process.env.REACT_APP_API_URL}/${bigImages[0]}`} // Optional
              dragToMove={false}
              mouseActivation="hover"
              cursorStyleActive="crosshair"
              id="product-zoom"
            />
            <button
              id="btn-product-gallery"
              className="btn-product-gallery"
              onClick={openLightBox}
            >
              <i className="icon-arrows"></i>
            </button>
          </figure>

          <div id="product-zoom-gallery" className="product-image-gallery">
            {product.pictures.map((item, index) => (
              <button
                className={`product-gallery-item ${
                  0 === index ? 'active' : ''
                }`}
                to="#"
                data-image={`${process.env.REACT_APP_API_URL}/${item}`}
                data-zoom-image={`${process.env.REACT_APP_API_URL}/${item}`}
                key={product._id + '-' + index}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/${item}`}
                  alt="product back"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen ? (
        <Lightbox
          mainSrc={`${process.env.REACT_APP_API_URL}/${bigImages[photoIndex]}`}
          nextSrc={`${process.env.REACT_APP_API_URL}/${
            bigImages[(photoIndex + 1) % bigImages.length]
          }`}
          prevSrc={`${process.env.REACT_APP_API_URL}/${
            bigImages[(photoIndex + bigImages.length - 1) % bigImages.length]
          }`}
          onCloseRequest={closeLightBox}
          onMovePrevRequest={setNextHandler}
          onMoveNextRequest={setPrevHandler}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default MediaOne
