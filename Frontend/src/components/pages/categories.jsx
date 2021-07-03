import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import CategoryFilter from '../features/sidebar/category-filter'

import Layout from '../app'
import { initSettings } from '../../utils'
import data from '../../mock_data/data'
import { getCountByCategory } from '../../services'
import PageHader from '../common/page-header'

function ProductCategory(props) {
  const { products } = props
  const grid = 'Fullwidth'

  const breadcrumbs = { boxed: 'Boxed', fullwidth: 'Fullwidth' }
  let counts = []

  useEffect(() => {
    initSettings()
  })

  function showSideBar() {
    document.querySelector('body').classList.add('sidebar-filter-active')
  }

  if (!products) return ''

  data.shop_categories.map((item, index) => {
    counts.push(getCountByCategory(products, item.name))

    return null
  })

  return (
    <Layout>
      <Helmet>
        <title>Molla React eCommerce | Product Category</title>
      </Helmet>

      <h1 className="d-none">Molla React eCommerce - Product Category</h1>

      <div className="main">
        <PageHader title="Categories" subTitlte="Shop" />

        <nav
          aria-label="breadcrumb"
          className="breadcrumb-nav breadcrumb-with-filter"
        >
          <div className={'container'}>
            <button
              className="sidebar-toggler"
              onClick={showSideBar}
              style={{ padding: '0' }}
            >
              <i className="icon-bars"></i>Filters
            </button>

            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`${process.env.PUBLIC_URL}/shop`}>Shop</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`${process.env.PUBLIC_URL}/shop/list`}>
                  Product Category
                </Link>
              </li>
              {/* <li className="breadcrumb-item active" aria-current="page">
                {breadcrumbs[grid]}
              </li> */}
            </ol>
          </div>
        </nav>

        <div className="page-content">
          <div className="categories-page" key={grid}>
            <div className="container-fluid">
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  400: 1,
                  600: 2,
                  750: 3,
                  900: 4,
                  1200: 4,
                }}
              >
                <Masonry gutter="10px">
                  {productsList.map((product, i) => (
                    <ProductList
                      name={product.name}
                      img={product.img}
                      amount={product.amount}
                      key={i}
                    />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          </div>
        </div>
      </div>

      <CategoryFilter />
    </Layout>
  )
}

const ProductList = ({ name, img, i, amount }) => (
  <div className="banner banner-cat banner-badge" key={i}>
    <Link to={`${process.env.PUBLIC_URL}/shop/list?product=${name}`}>
      <div className="lazy-overlay bg-4"></div>

      <LazyLoadImage
        src={img}
        alt="banner"
        width={210}
        height={450}
        effect="blur"
        threshold={500}
      />
    </Link>

    <Link
      className="banner-link"
      to={`${process.env.PUBLIC_URL}/shop/list?product=${name}`}
    >
      <h3 className="banner-title">{name}</h3>
      <h4 className="banner-subtitle">{amount} Product</h4>
      <span className="banner-link-text">Shop Now</span>
    </Link>
  </div>
)

const productsList = [
  {
    name: 'Jackets',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-1.jpg`,
    amount: 21,
  },
  {
    name: 'Jeans',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/1.jpg`,
    amount: 58,
  },
  {
    name: 'Sportwear',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-2.jpg`,
    amount: 25,
  },
  {
    name: 'Laptops',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/3.jpg`,
  },
  {
    name: 'Dresses',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-5.jpg`,
    amount: 12,
  },
  {
    name: 'Shoes',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-6.jpg`,
    amount: 3,
  },
  {
    name: 'T-Shirts',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-7.jpg`,
    amount: 3,
  },
  {
    name: 'Jumpers',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-8.jpg`,
    amount: 6,
  },
  {
    name: 'Jackets',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-1.jpg`,
    amount: 21,
  },
  {
    name: 'Jeans',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/1.jpg`,
    amount: 58,
  },
  {
    name: 'Sportwear',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-2.jpg`,
    amount: 25,
  },
  {
    name: 'Laptops',
    img: `${process.env.PUBLIC_URL}/assets/images/market/cats/3.jpg`,
  },
  {
    name: 'Dresses',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-5.jpg`,
    amount: 12,
  },
  {
    name: 'Shoes',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-6.jpg`,
    amount: 3,
  },
  {
    name: 'T-Shirts',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-7.jpg`,
    amount: 3,
  },
  {
    name: 'Jumpers',
    img: `${process.env.PUBLIC_URL}/assets/images/category/fullwidth-page/banner-8.jpg`,
    amount: 6,
  },
]

export const mapStateToProps = state => {
  return {
    products: state.data.products ? state.data.products : [],
  }
}

export default connect(mapStateToProps)(ProductCategory)
