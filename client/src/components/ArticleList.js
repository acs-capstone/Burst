import React from 'react'
import Article from './Article'

const ArticleList = props => {
  const articles = props.articles
  if (articles.length) {
    return articles.map(article => (
      <ul className=".list-unstyled" key={article.url}>
        <Article article={article} />
      </ul>
    ))
  } else return null
}
export default ArticleList
