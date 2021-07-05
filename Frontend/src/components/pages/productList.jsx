import React from 'react'
import { Helmet } from 'react-helmet'

// import Custom Components
import Layout from '../app'
import PageHeader from '../common/page-header'
import Breadcrumb from '../common/breadcrumb'
import ShopSidebar from '../features/sidebar/shop-sidebar'
import ProductList from '../features/product/list/product-list'

function ShopList() {
  return (
    <Layout>
      <Helmet>
        <title>Molla React eCommerce | Shop </title>
      </Helmet>

      <h1 className="d-none">Molla React eCommerce - Shop</h1>

      <div className="main">
        <PageHeader title="Product" subTitle="Shop" />
        <Breadcrumb title="Product List" parent1={['Shop']} adClass="mb-2" />

        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 skeleton-body skel-shop-products">
                <ProductList column="2cols" />
              </div>

              <div className="col-lg-3 order-lg-first skeleton-body skel-shop-sidebar">
                <div className="skel-widget"></div>

                <div className="skel-widget"></div>

                <div className="skel-widget"></div>

                <div className="skel-widget"></div>

                <ShopSidebar adClass="sidebar sidebar-shop" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default React.memo(ShopList)
