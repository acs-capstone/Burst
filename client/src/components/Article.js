import React from 'react'

const Article = props => {
  const { article } = props

  return (
    article.description.length > 50 && (
      <li className="media border-primary col-lg-11 ">
        <img
          className="mr-3 .img-thumbnail img-small img-fluid"
          src={article.urlToImage}
          //  || default URL?
          alt=""
        />
        <div className="media-body">
          {article.out ?
            <div className="p-3 mb-2 bg-danger text-white">
              Burst Your Bubble!
            </div>
            : null
          }
          <a href={article.url}>
            <h6>{article.title}</h6>
          </a>

          <p>{article.description}</p>

          <small>
            {article.source.name} | published at: {article.publishedAt}
          </small>
        </div>
      </li>
    )
  )
}

export default Article
