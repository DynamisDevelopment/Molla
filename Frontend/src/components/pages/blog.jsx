import React, { useEffect, useState } from 'react'
import isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import { Helmet } from 'react-helmet'
import axios from 'axios'

// import Custom Components
import Layout from '../app'
import PageHeader from '../common/page-header'
import Breadcrumb from '../common/breadcrumb'
import PostSeven from '../post'
import Pagination from '../features/pagination'

import { isotopeLoad } from '../../utils'

export default function Grid4Cols() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    isotopeLoad(
      isotope,
      imagesLoaded,
      '.entry-container',
      '.entry-item',
      '.entry-filter'
    )
  })

  const getPosts = () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/post`)
      .then(res => setPosts(res.data))

  const getCategories = () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/categories`)
      .then(res => setCategories(res.data))

  useEffect(() => {
    getPosts()
    getCategories()
  }, [])

  return (
    <Layout>
      <Helmet>
        <title>Molla React eCommerce - Blog</title>
      </Helmet>

      <h1 className="d-none">Molla React eCommerce - Blog</h1>

      <div className="main">
        <PageHeader title="Blog Grid 4 Columns" subTitle="Blog" />
        <Breadcrumb title="Blog" adClass="mb-2" />

        {posts && (
          <div className="page-content">
            <div className="container">
              <Categories categories={categories} />

              <Posts posts={posts} />

              <Pagination aclass="justify-content-center" count={8} unit={8} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

const Categories = ({ categories }) => {
  return (
    <nav className="blog-nav">
      <ul className="menu-cat entry-filter justify-content-center">
        <li className="active">
          <a href="#1" data-filter="*">
            All Blog Posts<span>8</span>
          </a>
        </li>
        {categories.map((category, i) => (
          <li key={i}>
            <a href={`#${i + 1}`} data-filter={`.${category}`}>
              {category}
              <span>3</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const Posts = ({ posts }) => {
  return (
    <div className="entry-container max-col-4" data-layout="fitRows">
      {posts.map((post, i) => (
        <div
          className={`entry-item col-sm-6 col-md-4 col-lg-3 ${post.categories.join(
            ' '
          )}`}
          key={i}
        >
          <PostSeven post={post} isIsotope={true} />
        </div>
      ))}
    </div>
  )
}
