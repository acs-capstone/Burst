import React from 'react'
import Article from './Article'

const ArticleList = props => {
  const articles = props.articles
  return articles.map(article => (
    <ul className=".list-unstyled">
      <Article key={article.title} article={article} />
    </ul>
  ))
}
export default ArticleList
