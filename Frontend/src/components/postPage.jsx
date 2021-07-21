import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import axios from 'axios'

import { showModal } from '../actions'

// import Custom Components
import Layout from './app'
import Breadcrumb from './common/breadcrumb'
import BlogSidebar from './features/sidebar/blog-sidebar'
import OwlCarousels from './features/owl-carousel'
import Comments from './pages/blogs/partials/comments'
import Reply from './pages/blogs/partials/reply'
import RelatedPosts from './pages/blogs/partials/related-posts'
import { isIEBrowser } from '../utils'

import posts from '../mock_data/posts'
import VideoModal from './features/modal/video-modal'

function SingleFullWidthSidebar(props) {
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])

  const { showModal } = props
  const postId = props.match.params.id
  let nextId, prevId
  const nextPost = posts.filter(item => item.id > parseInt(postId))[0]
  const prevPost = posts.filter(item => item.id < parseInt(postId))[0]

  if (nextPost) {
    nextId = parseInt(postId) + 1
  } else {
    nextId = parseInt(postId)
  }

  if (prevPost) {
    prevId = parseInt(postId) - 1
  } else {
    prevId = parseInt(postId)
  }

  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }

  const showVideoModal = e => {
    showModal('video')
    e.preventDefault()
  }

  function toTop() {
    window.scroll({
      top: 0,
    })
  }

  const getPost = () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${postId}`)
      .then(res => {
        if (!res.data) window.location = process.env.PUBLIC_URL + '/pages/404'
        // res.data.assets = []
        res.data.type = 'gallery'
        setPost(res.data)
        setComments(res.data.comments)
      })
      .catch(err => console.log(err))

  useEffect(() => {
    getPost()
  }, [])

  return (
    <Layout>
      <Helmet>
        <title>Molla React eCommerce | Blog</title>
      </Helmet>

      <h1 className="d-none">Molla React eCommerce - Blog</h1>

      {post && (
        <div className="main single-2">
          <Breadcrumb
            title={post.title}
            parent1={['Blog', 'blog']}
            adClass="mb-0 border-bottom-0"
          />
          <div className="page-content">
            <div className="container">
              {post.type === 'gallery' ? (
                <figure className="entry-media">
                  <OwlCarousels adClass="owl-simple owl-light owl-nav-inside">
                    {post.assets.map((item, index) => (
                      <div key={'blog' + index}>
                        <div className="lazy-overlay bg-3"></div>
                        <LazyLoadImage
                          src={`${process.env.REACT_APP_API_URL}/${item}`}
                          alt="blog"
                          width={100}
                          height={400}
                          effect="blur"
                        />{' '}
                      </div>
                    ))}
                  </OwlCarousels>
                </figure>
              ) : post.type === 'image' ? (
                <figure className="entry-media">
                  <div className="lazy-overlay bg-3"></div>

                  <LazyLoadImage
                    src={`${process.env.REACT_APP_API_URL}/${post.assets[0]}`}
                    alt="blog"
                    width={100}
                    height={400}
                    effect="blur"
                  />
                </figure>
              ) : (
                <figure className="entry-media entry-video">
                  <Link to="#" onClick={showVideoModal}>
                    <div className="lazy-overlay bg-3"></div>

                    <LazyLoadImage
                      alt="post_image"
                      src={`${process.env.REACT_APP_API_URL}/${post.assets[0]}`}
                      threshold={100}
                      effect="blur"
                      width={300}
                      height={300}
                    />
                  </Link>
                </figure>
              )}
              <div className="row">
                <div className="col-lg-9">
                  <article className="entry single-entry">
                    <div className="entry-body">
                      <div className="entry-meta">
                        <span className="entry-author">
                          by <Link to="#">{post.author}</Link>
                        </span>
                        <span className="meta-separator">|</span>
                        <Link to="#">
                          {/* {post.createdAt.toLocaleDateString('en-US', options)} */}
                        </Link>
                        <span className="meta-separator">|</span>
                        <Link to="#">{post.comments.length} Comments</Link>
                      </div>

                      <h2 className="entry-title entry-title-big">
                        {post.title}
                      </h2>

                      {post.category ? (
                        <div className="entry-cats">
                          in&nbsp;
                          {post.category.map((cat, index) => (
                            <span key={index}>
                              <Link to="#">{cat}</Link>
                              {index < post.category.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </div>
                      ) : (
                        ''
                      )}

                      <div
                        className="entry-content editor-content"
                        dangerouslySetInnerHTML={{
                          __html: post.body,
                        }}
                      />

                      <div className="entry-footer row no-gutters flex-column flex-md-row">
                        <div className="col-md">
                          <div className="entry-tags">
                            <span>Tags:</span>{' '}
                            {post.meta.keywords.map((tag, i) => (
                              <Link to="#" key={i}>
                                {tag}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="col-md-auto mt-2 mt-md-0">
                          <div className="social-icons social-icons-color">
                            <span className="social-label">
                              Share this post:
                            </span>
                            <Link
                              to="#"
                              className="social-icon social-facebook"
                              title="Facebook"
                              target="_blank"
                            >
                              <i className="icon-facebook-f"></i>
                            </Link>
                            <Link
                              to="#"
                              className="social-icon social-twitter"
                              title="Twitter"
                              target="_blank"
                            >
                              <i className="icon-twitter"></i>
                            </Link>
                            <Link
                              to="#"
                              className="social-icon social-pinterest"
                              title="Pinterest"
                              target="_blank"
                            >
                              <i className="icon-pinterest"></i>
                            </Link>
                            <Link
                              to="#"
                              className="social-icon social-linkedin"
                              title="Linkedin"
                              target="_blank"
                            >
                              <i className="icon-linkedin"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="entry-author-details">
                      <figure className="author-media">
                        <Link to="#">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/blog/single/author.jpg`}
                            alt="User name"
                          />{' '}
                        </Link>
                      </figure>

                      <div className="author-body">
                        <div className="author-header row no-gutters flex-column flex-md-row">
                          <div className="col">
                            <h4>
                              <Link to="#">John Doe</Link>
                            </h4>
                          </div>
                          {isIEBrowser() ? <div className="mb-1"></div> : ''}
                          <div className="col-auto mt-1 mt-md-0">
                            <Link to="#" className="author-link">
                              View all posts by John Doe{' '}
                              <i className="icon-long-arrow-right"></i>
                            </Link>
                          </div>
                        </div>

                        <div className="author-content">
                          <p>
                            Praesent dapibus, neque id cursus faucibus, tortor
                            neque egestas auguae, eu vulputate magna eros eu
                            erat. Aliquam erat volutpat.{' '}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>

                  <nav
                    className="pager-nav"
                    aria-label="Page navigation"
                    style={isIEBrowser() ? { flexFlow: 'wrap' } : {}}
                  >
                    <Link
                      onClick={toTop}
                      className="pager-link pager-link-prev"
                      to={`${process.env.PUBLIC_URL}/blog/single/${prevId}`}
                      aria-label="Previous"
                      tabIndex="-1"
                    >
                      Previous Post
                      <span className="pager-link-title">
                        Cras iaculis ultricies nulla
                      </span>
                    </Link>

                    <Link
                      onClick={toTop}
                      className="pager-link pager-link-next"
                      to={`${process.env.PUBLIC_URL}/blog/single/${nextId}`}
                      aria-label="Next"
                      tabIndex="-1"
                    >
                      Next Post
                      <span className="pager-link-title">
                        Praesent placerat risus
                      </span>
                    </Link>
                  </nav>

                  <RelatedPosts />
                  <Comments comments={comments} />
                  <Reply postId={postId} setComments={setComments} />
                </div>

                <aside className="col-lg-3">
                  <BlogSidebar post={post} />
                </aside>
              </div>
            </div>
          </div>

          <VideoModal />
        </div>
      )}
    </Layout>
  )
}

export default connect(null, { showModal })(SingleFullWidthSidebar)
