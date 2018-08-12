import React from 'react'
import Article from './Article'

const ArticleList = props => {
  const articles = props.articles
  if (articles.inBubble && articles.inBubble.articles) {
    return articles.inBubble.articles.map(article => (
      <ul className=".list-unstyled">
        <Article key={article.title} article={article} />
      </ul>
    ))
  } else return null
}
export default ArticleList
