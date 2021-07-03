import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// import Custom Components
import Layout from '../app'
import Breadcrumb from '../common/breadcrumb'
import PageHeader from '../common/page-header'
import OwlCarousel from '../features/owl-carousel'
import QuickView from '../features/product/common/quickview'
import ProductListThree from '../features/product/list/product-list-three'
import Brand from '../features/brand'
import ShopMarketSidebar from '../features/sidebar/shop-market-sidebar'

import { mainSlider10, mainSlider11 } from '../settings'

function ShopMarket(props) {
  return (
    <Layout>
      <Helmet>
        <title>Molla React eCommerce | Shop Market</title>
      </Helmet>

      <h1 className="d-none">Molla React eCommerce - Shop Market</h1>

      <div className="main shop-market">
        <PageHeader title={'Shop Market'} subTitle="Shop" />

        <Breadcrumb title="Shop" adClass="mb-3" />

        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-xl-4-5col">
                <OwlCarousel
                  adClass="category-banners-slider owl-simple owl-nav-inside cols-1"
                  carouselOptions={mainSlider10}
                  carouselId="introSlider"
                >
                  <div className="banner banner-poster">
                    <Link to="#">
                      <div className="lazy-overlay"></div>

                      <LazyLoadImage
                        src={`${process.env.PUBLIC_URL}/assets/images/market/slider/slider-1.jpg`}
                        alt="Banner"
                        effect="blur"
                        width={400}
                        height={260}
                      />
                    </Link>

                    <div className="banner-content banner-content-right">
                      <h3 className="banner-subtitle">
                        <Link to="#">Amazing Value</Link>
                      </h3>
                      <h2 className="banner-title">
                        <Link to="#">High Performance 4K TVs</Link>
                      </h2>
                      <Link
                        to={`${process.env.PUBLIC_URL}/shop/sidebar/list`}
                        className="banner-link"
                      >
                        Shop Now <i className="icon-long-arrow-right"></i>
                      </Link>
                    </div>
                  </div>

                  <div className="banner banner-poster">
                    <Link to="#">
                      <div className="lazy-overlay"></div>

                      <LazyLoadImage
                        src={`${process.env.PUBLIC_URL}/assets/images/market/slider/slider-2.jpg`}
                        alt="Banner"
                        effect="blur"
                        width={400}
                        height={260}
                      />
                    </Link>

                    <div className="banner-content">
                      <h3 className="banner-subtitle">
                        <Link to="#">Weekend Deal</Link>
                      </h3>
                      <h2 className="banner-title">
                        <Link to="#">Apple & Accessories</Link>
                      </h2>
                      <Link
                        to={`${process.env.PUBLIC_URL}/shop/sidebar/list`}
                        className="banner-link"
                      >
                        Shop Now <i className="icon-long-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </OwlCarousel>

                <Brand
                  count={7}
                  sliderOption={mainSlider11}
                  adClass="owl-carousel owl-simple owl-nav-align pt-2 pb-2"
                />

                <div className="cat-blocks-container">
                  <div className="row">
                    {products.map((product, i) => (
                      <Product name={product.name} img={product.img} key={i} />
                    ))}
                  </div>
                </div>

                <div className="mb-2"></div>

                <ProductListThree />
              </div>
              <div className="col-lg-3 col-xl-5col order-lg-first">
                <ShopMarketSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickView />
    </Layout>
  )
}

const Product = ({ name, img, i }) => (
  <div className="col-6 col-md-4 col-lg-3" key={i}>
    <Link
      to={`${
        process.env.PUBLIC_URL
      }/shop/list?product=${name.toLowerCase().replace(' ', '-')}`}
      className="cat-block"
    >
      <figure>
        <span>
          <img src={img} alt="Category" />
        </span>
      </figure>

      <h3 className="cat-block-title">{name}</h3>
    </Link>
  </div>
)

const products = [
  {
    name: 'Desktop Computers',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/1.jpg`,
  },
  {
    name: 'Monitors',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/2.jpg`,
  },
  {
    name: 'Laptops',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/3.jpg`,
  },

  {
    name: 'iPads & Tablets',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/4.jpg`,
  },
  {
    name: 'Hard Drives & Storage',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/5.jpg`,
  },
  {
    name: 'Computer Accessories',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/7.jpg`,
  },
  {
    name: 'Printer and Supplies',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/6.jpg`,
  },
]

export default React.memo(ShopMarket)
