import React from 'react'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const Article = props => {
  const { article } = props
  if (article.description) {
    return (
      <Card>
        <CardHeader
          title={
            <a href={article.url} target="_blank">
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
          {article.out ? (
            <span className="badge badge-danger">Burst Your Bubble!</span>
          ) : null}

          <Typography component="p">{article.description}</Typography>
        </CardContent>
      </Card>
    )
  } else return null
}

export default Article

// article.description.length > 50 && (
//   <li className="media border-primary col-lg-11 ">
//     <img
//       className="mr-3 .img-thumbnail img-small img-fluid"
//       src={article.urlToImage}
//       alt=""
//     />
//     <div className="media-body">
//       {article.out ? (
//         <span className="badge badge-danger">Burst Your Bubble!</span>
//       ) : null}
//       <a href={article.url} target="_blank">
//         <h6>{article.title}</h6>
//       </a>

//       <p>{article.description}</p>

//       <small>
//         {article.source.name} | published at: {article.publishedAt}
//       </small>
//     </div>
//   </li>
// )

{
  /* <Card>
{article.urlToImage ? (
  <CardMedia
    style={{ height: 0, paddingTop: '56.25%' }}
    image={article.urlToImage}
    title={article.title}
  />
) : null}
<CardContent>
  <a href={article.url} target="_blank">
    <Typography gutterBottom variant="headline" component="h2">
      {article.title}
    </Typography>
    {article.out ? (
      <span className="badge badge-danger">Burst Your Bubble!</span>
    ) : null}
  </a>
  <Typography component="p">{article.description}</Typography>
  <Typography component="h5">
    {' '}
    {article.source.name} | published at: {article.publishedAt}
  </Typography>
</CardContent>
</Card> */
}
