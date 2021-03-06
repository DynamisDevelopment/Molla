import React from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import OwlCarousel from './features/owl-carousel'

function PostSeven(props) {
  const { post, isIsotope = false } = props

  if (post) {
    let date = new Date(post.createdAt)
    let options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      timeZone: 'UTC',
    }

    return (
      <article className="entry entry-grid text-center">
        {'video' === post.type ? (
          <figure className="entry-media entry-video">
            <Link to={`${process.env.PUBLIC_URL}/blog/post/${post._id}`}>
              {isIsotope ? (
                <img
                  src={`https://placeimg.com/300/300/any`}
                  alt="post_image"
                  width="300"
                  height="300"
                />
              ) : (
                <>
                  <div className="lazy-overlay bg-3"></div>

                  <LazyLoadImage
                    alt="post_image"
                    src={`https://placeimg.com/300/300/any`}
                    threshold={500}
                    effect="blur"
                    width={300}
                    height={300}
                  />
                </>
              )}
            </Link>
          </figure>
        ) : Array.isArray(post.image) && 'gallery' === post.type ? (
          <figure className="entry-media">
            <OwlCarousel
              adClass="owl-simple owl-light owl-nav-inside cols-1"
              carouselId={'post_seven' + post._id}
            >
              {post.image.map((item, index) => (
                <Link
                  to={`${process.env.PUBLIC_URL}/blog/post/${post._id}`}
                  key={index}
                >
                  {isIsotope ? (
                    <img
                      src={`${process.env.PUBLIC_URL +
                        '/' +
                        post.image[index]}`}
                      alt="post_image"
                      width="300"
                      height="300"
                    />
                  ) : (
                    <>
                      <div className="lazy-overlay bg-3"></div>

                      <LazyLoadImage
                        alt="post_image"
                        src={`${process.env.PUBLIC_URL +
                          '/' +
                          post.image[index]}`}
                        threshold={500}
                        effect="blur"
                        width={300}
                        height={300}
                      />
                    </>
                  )}
                </Link>
              ))}
            </OwlCarousel>
          </figure>
        ) : (
          <figure className="entry-media">
            <Link to={`${process.env.PUBLIC_URL}/blog/post/${post._id}`}>
              {isIsotope ? (
                <img
                  src={`https://placeimg.com/300/300/any`}
                  alt="post_image"
                  width="300"
                  height="300"
                />
              ) : (
                <>
                  <div className="lazy-overlay bg-3"></div>

                  <LazyLoadImage
                    alt="post_image"
                    src={`https://placeimg.com/300/300/any`}
                    threshold={500}
                    effect="blur"
                    width={300}
                    height={300}
                  />
                </>
              )}
            </Link>
          </figure>
        )}

        <div className="entry-body">
          <div className="entry-meta">
            <Link to="#">{date.toLocaleDateString('en-US', options)}</Link>
            <span className="meta-separator">|</span>
            <Link to="#">{post.comments.length} Comments</Link>
          </div>

          <h2 className="entry-title">
            <Link to={`${process.env.PUBLIC_URL}/blog/post/${post._id}`}>
              {post.title}
            </Link>
          </h2>

          <div className="entry-cats">
            in&nbsp;
            {post.categories.map((cat, index) => (
              <span key={index}>
                <Link to="#">{cat}</Link>
                {index < post.categories.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
          <div className="entry-content">
            <p>{post.content}</p>
            <Link
              to={`${process.env.PUBLIC_URL}/blog/post/${post._id}`}
              className="read-more"
            >
              Continue Reading
            </Link>
          </div>
        </div>
      </article>
    )
  } else return ''
}

export default React.memo(PostSeven)
