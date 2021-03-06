import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Accordion from '../../../../features/accordion/accordion'
import Card from '../../../../features/accordion/card'

import { addToCart, toggleWishlist } from '../../../../../actions'

import {
  quantityInputs,
  isIEBrowser,
  isEdgeBrowser,
  findIndex,
} from '../../../../../utils'

function ProductDetailSix(props) {
  const { product, isWishlist, type, addToCart, toggleWishlist } = props
  const social = product.social

  useEffect(() => {
    quantityInputs()
  })

  const addToCartHandler = () => {
    if (0 !== product.stock)
      addToCart(product, document.querySelector('#qty').value)
  }

  const wishlistHandler = () => {
    if (isWishlist) {
      window.location = '/shop/wishlist'
    } else {
      toggleWishlist(product, isWishlist)
    }
  }

  return (
    <div className="product-details details-fullwidth">
      <h1 className="product-title">{product.name}</h1>

      <div className="ratings-container">
        <div className="ratings">
          <div
            className="ratings-val"
            style={{ width: product.ratings * 20 + '%' }}
          ></div>
        </div>
        <Link
          className="ratings-text"
          to="#product-review-link"
          id="review-link"
        >
          ( {product.reviews.length} Reviews )
        </Link>
      </div>

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

      <div className="product-content">
        <p>{product.shortDesc}</p>
      </div>

      {product.colors.length > 0 && (
        <div className="details-filter-row details-row-size">
          <label>Color:</label>
          <div className="product-nav product-nav-dots">
            {product.colors.map((color, i) => (
              <Link
                to="#"
                key={i}
                className={0 === i ? 'active' : ''}
                style={{ backgroundColor: color }}
              ></Link>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div className="details-filter-row details-row-size">
          <label htmlFor="size">Size:</label>
          <div className="select-custom">
            <select
              name="size"
              id="size"
              className="form-control"
              defaultValue="#"
            >
              {product.sizes.map(
                (size, i) =>
                  size.inventory > 0 && (
                    <option value={size.name} key={i}>
                      {size.name.toUpperCase()}
                    </option>
                  )
              )}
            </select>
          </div>

          {'default' === type ? (
            <Link to="#" className="size-guide">
              <i className="icon-th-list"></i>size guide
            </Link>
          ) : (
            ''
          )}
        </div>
      )}

      <div className="details-filter-row details-row-size">
        <label htmlFor="qty">Qty:</label>
        <div className="product-details-quantity">
          <input
            type="number"
            id="qty"
            className="form-control"
            defaultValue="1"
            min="1"
            max={product.stock}
            step="1"
            data-decimals="0"
            required
          />
        </div>
      </div>

      <div className="product-details-action">
        {isIEBrowser() || isEdgeBrowser() ? (
          <button
            className="btn-product btn-cart"
            onClick={addToCartHandler}
            style={{ minHeight: '4rem' }}
          >
            <span>add to cart</span>
          </button>
        ) : (
          <button className="btn-product btn-cart" onClick={addToCartHandler}>
            <span>add to cart</span>
          </button>
        )}
        {isIEBrowser() || isEdgeBrowser() ? (
          <div className="details-action-wrapper IE-detail-action-wrapper">
            <button
              className={`btn-product btn-wishlist pl-0 pr-0 ${
                isWishlist ? 'added-to-wishlist' : 'remove-from-wishlist'
              }`}
              onClick={wishlistHandler}
              title={isWishlist ? 'Go to wishlist' : 'Add to wishlist'}
            >
              <span>{isWishlist ? 'go to wishlist' : 'add to wishlist'}</span>
            </button>
          </div>
        ) : (
          <div className="details-action-wrapper">
            <button
              className={`btn-product btn-wishlist pl-0 pr-0 ${
                isWishlist ? 'added-to-wishlist' : 'remove-from-wishlist'
              }`}
              onClick={wishlistHandler}
              title={isWishlist ? 'Go to wishlist' : 'Add to wishlist'}
            >
              <span>{isWishlist ? 'Go to Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="product-details-footer">
        {product.categories.length > 0 && (
          <div className="product-cat">
            <span>categories: </span>
            {product.categories.map((cat, index) => (
              <span key={index} className="mr-0">
                <Link to="#">{cat.replaceAll('-', ' ')}</Link>
                {index < product.categories.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}

        <div className="social-icons social-icons-sm">
          <span className="social-label">Share:</span>
          {social.facebook && (
            <a
              href={social.facebook}
              className="social-icon"
              title="Facebook"
              target="_blank"
            >
              <i className="icon-facebook-f"></i>
            </a>
          )}

          {social.twitter && (
            <a
              href={social.twitter}
              className="social-icon"
              title="Twitter"
              target="_blank"
            >
              <i className="icon-twitter"></i>
            </a>
          )}

          {social.instagram && (
            <a
              href={social.instagram}
              className="social-icon"
              title="Instagram"
              target="_blank"
            >
              <i className="icon-instagram"></i>
            </a>
          )}

          {social.pintrest && (
            <a
              href={social.pintrest}
              className="social-icon"
              title="Pinterest"
              target="_blank"
            >
              <i className="icon-pinterest"></i>
            </a>
          )}
        </div>
      </div>

      <Accordion adClass="accordion-plus product-details-accordion">
        <Card title="Description" adClass="card-box card-sm">
          <div className="product-desc-content">{product.description}</div>
        </Card>
        <Card title="Additional information" adClass="card-box card-sm">
          <div className="product-desc-content">
            {product.additionalInformation}
          </div>
        </Card>
        <Card
          title="Shipping & Returns"
          expanded={true}
          adClass="card-box card-sm"
        >
          <div className="product-desc-content">{product.shippingReturns}</div>
        </Card>
        <Card
          title={`Reviews (${product.reviews.length})`}
          adClass="card-box card-sm"
        >
          <Reviews reviews={product.reviews} />
        </Card>
      </Accordion>
    </div>
  )
}

const Reviews = ({ reviews }) => {
  const [helpful, setHelpful] = useState({})
  const [unhelpful, setUnhelpful] = useState({})
  const [type, setType] = useState({})

  const saveHelpful = (e, id) => {
    e.preventDefault()
    if (type[id] === 'UNHELPFUL')
      setUnhelpful(prev => ({
        ...prev,
        [id]: unhelpful[id] - 1,
      }))

    if (type[id] !== 'HELPFUL') {
      setHelpful(prev => ({ ...prev, [id]: helpful[id] + 1 }))
      setType(prev => ({ ...prev, [id]: 'HELPFUL' }))
    }
  }

  const saveUnhelpful = (e, id) => {
    e.preventDefault()
    if (type[id] === 'HELPFUL')
      setHelpful(prev => ({
        ...prev,
        [id]: helpful[id] - 1,
      }))

    if (type[id] !== 'UNHELPFUL') {
      setUnhelpful(prev => ({ ...prev, [id]: unhelpful[id] + 1 }))
      setType(prev => ({ ...prev, [id]: 'UNHELPFUL' }))
    }
  }

  useEffect(() => {
    reviews.forEach(review => {
      setHelpful(prev => ({
        ...prev,
        [review._id]: review.helpful,
      }))
      setUnhelpful(prev => ({
        ...prev,
        [review._id]: review.unhelpful,
      }))
    })

    return () =>
      reviews.forEach(review => {
        if (type[review.id] === 'HELPFUL')
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/review/${review.id}/helpful`
            )
            .catch(err => console.log(err))
        else if (type[review.id] === 'UNHELPFUL')
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/review/${review.id}/unhelpful`
            )
            .catch(err => console.log(err))
      })
  }, [])

  return (
    <div className="reviews">
      {reviews.map((review, i) => (
        <div className="review">
          <div
            className="row no-gutters"
            style={isIEBrowser() ? { flexDirection: 'row' } : {}}
          >
            <div className="col-auto">
              <h4>John Doe</h4>
              <div className="ratings-container">
                <div className="ratings">
                  <div className="ratings-val" style={{ width: '100%' }}></div>
                </div>
              </div>
              <span className="review-date">5 days ago</span>
            </div>
            <div className="col">
              <h4>{review.title}</h4>

              <div className="review-content">
                <p>{review.body}</p>
              </div>

              <div className="review-action">
                <Link to="#" onClick={e => saveHelpful(e, review._id)}>
                  <i className="icon-thumbs-up"></i>
                  Helpful ({helpful[review._id]})
                </Link>
                <Link to="#" onClick={e => saveUnhelpful(e, review._id)}>
                  <i className="icon-thumbs-down"></i>
                  Unhelpful ({unhelpful[review._id]})
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
function mapStateToProps(state, props) {
  return {
    isWishlist:
      findIndex(state.wishlist.list, item => item.id === parseInt(props.id)) !==
      -1
        ? true
        : false,
  }
}

export default connect(mapStateToProps, { addToCart, toggleWishlist })(
  ProductDetailSix
)
