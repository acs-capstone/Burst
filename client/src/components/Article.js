import React from 'react'

const Article = props => {
  const { article } = props
  return (
    article.description && (
      <li class="media border-primary col-lg-11 ">
        <img
          class="mr-3 .img-thumbnail img-small img-fluid"
          src={
            article.urlToImage || 'https://bitcoin.org/img/icons/opengraph.png'
          }
          alt=""
        />
        <div className="media-body">
          <a href={article.url}>
            <h6>{article.title}</h6>
          </a>

          <p>{article.description}</p>

          <small>
            Source: {article.source.name} | published at: {article.publishedAt}
          </small>
        </div>
      </li>
    )
  )
}

export default Article
