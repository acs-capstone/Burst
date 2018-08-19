import React from 'react'
import Article from './Article'
import Grid from '@material-ui/core/Grid'

const ArticleList = props => {
  const articles = props.articles
  if (articles.length) {
    return (
      <div>
        {articles.map(article => (
          <ul className=".list-unstyled" key={article.url}>
            <Article article={article} />
          </ul>
        ))}
      </div>
    )
  } else return null
}
export default ArticleList
