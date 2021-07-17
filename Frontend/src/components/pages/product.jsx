import React, { useEffect, useState } from 'react'
import imagesLoaded from 'imagesloaded'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import Layout from '../app'
import MediaOne from './products/partials/media/media-one'
import DetailSix from './products/partials/details/detail-six'
import ProductSidebar from '../features/sidebar/product-sidebar'
import Breadcrumb from '../common/breadcrumb'
import QuickView from '../features/product/common/quickview'

import { productGallery } from '../../utils'

function SingleProduct(props) {
  const [product, setProduct] = useState()
  let productId = props.match.params.id

  useEffect(async () => {
    const currentProduct = await axios.get(
      `http://localhost:4000/product/${productId}`
    )
    setProduct(currentProduct.data)
  }, [productId])

  console.log(product)
  useEffect(() => {
    // productGallery()

    let skelItems = document.querySelectorAll('.skel-pro-single')

    for (let i = 0; i < skelItems.length; i++)
      skelItems[i].classList.add('loaded')

    // remove loaded-class on productId change
    // let imgLoad = imagesLoaded('.product-gallery', { background: true })
    // imgLoad.on('done', function(instance, image) {
    //   for (let i = 0; i < skelItems.length; i++) {
    //     skelItems[i].classList.add('loaded')
    //   }
    // })
  }, [product])

  return (
    <Layout>
      <Helmet>
        {product && <title>{product.categories[0] | product.name}</title>}
      </Helmet>

      {product && (
        <h1 className="d-none">{product.categories[0] | product.name}</h1>
      )}

      {product && (
        <div className="main">
          <Breadcrumb
            title={product.name}
            type="product"
            slug={product.name}
            adClass="breadcrumb-nav border-0 mb-0"
            productId={product._id}
            parent1={['Products', 'product']}
            container="container-fluid"
          />

          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-10">
                  <div className="product-details-top skeleton-body">
                    <div className="row skel-pro-single fullwidth">
                      <div className="col-md-6 col-lg-7">
                        <div className="skel-product-gallery"></div>

                        {/* <MediaOne product={product} adClass="" /> */}
                      </div>

                      <div className="col-md-6 col-lg-5">
                        <div className="entry-summary row">
                          <div className="col-md-12">
                            <div className="entry-summary1">
                              {' '}
                              {product.summary}
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="entry-summary2"></div>
                          </div>

                          <div className="col-md-12">
                            <div className="entry-summary3"></div>
                          </div>
                        </div>

                        <DetailSix id={productId} product={product} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-2 d-md-none d-xl-block">
                  <div className="skeleton-body">
                    <div className="skel-pro-single">
                      <div className="skel-widget"></div>

                      <div className="skel-widget"></div>

                      <ProductSidebar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <QuickView />
        </div>
      )}
    </Layout>
  )
}

export default SingleProduct
