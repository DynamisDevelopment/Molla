import React, { useEffect, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LoadingOverlay from '../components/features/loading-overlay'

import { scrollTop } from '../utils'
const HomePage = React.lazy(() => import('../components/home/index'))
const Market = React.lazy(() => import('../components/pages/market'))
const Blog = React.lazy(() => import('../components/pages/blog'))
const About = React.lazy(() => import('../components/pages/about'))
const Contact = React.lazy(() => import('../components/pages/contact'))
const Categories = React.lazy(() => import('../components/pages/categories'))
const Account = React.lazy(() => import('../components/pages/dashboard'))
const Wishlist = React.lazy(() => import('../components/pages/wishlist'))
const Cart = React.lazy(() => import('../components/pages/cart'))
const Checkout = React.lazy(() => import('../components/pages/checkout'))
const ProductList = React.lazy(() => import('../components/pages/productList'))
const Login = React.lazy(() => import('../components/pages/others/login'))
const noMatch = React.lazy(() => import('../components/pages/404'))
const Post = React.lazy(() => import('../components/postPage'))
const Product = React.lazy(() => import('../components/pages/product'))

export default function AppRoot() {
  useEffect(() => scrollTop(), [])

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            component={HomePage}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/shop`}
            component={Market}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/blog`}
            component={Blog}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/blog/post/:id`}
            component={Post}
          />
          <Route path={`${process.env.PUBLIC_URL}/about`} component={About} />
          <Route
            path={`${process.env.PUBLIC_URL}/contact`}
            component={Contact}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/account`}
            component={Account}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/wishlist`}
            component={Wishlist}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/cart`}
            component={Cart}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/checkout`}
            component={Checkout}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/categories`}
            component={Categories}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/shop/list`}
            component={ProductList}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/login`}
            component={Login}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/product/:id`}
            component={Product}
          />

          <Route exact path="*" component={noMatch} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}
