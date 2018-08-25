import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const Article = props => {
  const { article } = props
  if (article.description) {
    return (
      <Card>
        <div>
          {article.out ? (
            <span className="badge badge-danger" id="burst-bubble">Burst Your Bubble!</span>
          ) : null}
        </div>
        <CardHeader
          title={
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {' '}
              {article.title}{' '}
            </a>
          }
          subheader={`${article.source.name} | published at: ${
            article.publishedAt
            }`}
        />
        {article.urlToImage ? (
          <CardMedia
            style={{ height: 0, paddingTop: '56.25%' }}
            image={article.urlToImage}
            title={article.title}
          />
        ) : null}
        <CardContent>
          <Typography component="p">{article.description}</Typography>
        </CardContent>
      </Card>
    )
  } else return null
}

export default Article
