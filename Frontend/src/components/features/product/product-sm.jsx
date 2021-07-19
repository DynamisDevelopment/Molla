import React from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function SmallProduct(props) {
  const { product } = props

  return product ? (
    <div className="product product-sm">
      <figure className="product-media">
        <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
          <div className="lazy-overlay bg-2"></div>

          <LazyLoadImage
            alt="product"
            src={`${process.env.REACT_APP_API_URL}/${product.pictures[0]}`}
            threshold={400}
          />
        </Link>
      </figure>

      <div className="product-body">
        <h3 className="product-title">
          <Link to={`${process.env.PUBLIC_URL}/product/${product._id}`}>
            {product.name}
          </Link>
        </h3>

        {0 === product.stock ? (
          <div className="product-price">
            <span className="out-price">
              $
              {product.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        ) : 0 < product.discount ? (
          <div className="product-price">
            <span className="new-price">
              $
              {product.salePrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="old-price">
              $
              {product.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        ) : (
          <div className="product-price">
            $
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        )}
      </div>
    </div>
  ) : (
    ''
  )
}

export default SmallProduct
