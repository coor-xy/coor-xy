import React from 'react'
import { useSelector } from 'react-redux'
import ControlledCarousel from './Carousel'
import { SliderData } from './SliderData'
import Page from './Page'
import { CardGroup, Card } from 'react-bootstrap'
/**
 * COMPONENT
 */
const Home = props => {
  const username = useSelector(state => state.auth.username)

  return (
    <div className="homepage-container">
      {/* <h3 className="welcome"> Welcome, {username}</h3> */}
      <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossOrigin="anonymous"
/>
      <ControlledCarousel/>
      <Page />
      <h2 className="homepage-title">Key Features</h2>
      <CardGroup>
  <Card>
    <Card.Img variant="top" src="https://learnsql.com/blog/how-to-import-csv-to-postgresql/how-to-import-csv-to-postgresql.png" />
    <Card.Body>
      <Card.Title>Import</Card.Title>
      <Card.Text>
        Import your data from Excel spreadsheet (.csv) from your computer.
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="/example1.png" />
    <Card.Body>
      <Card.Title>Create a Graph / Charts</Card.Title>
      <Card.Text>
        Create graphs and charts with your own data.
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://screenshots.imgix.net/recharts/recharts/pie-chart/1.6.2/5ceced9916ee3000144d62cb/ea294af8-63a3-42af-83a6-5e28dff81044.png" />
    <Card.Body>
      <Card.Title>Edit</Card.Title>
      <Card.Text>
        Edit the diagram as your own liking.
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://cdn-web.jifo.co/_next/static/images/slides-80c1ad7a1f7ed26e24327a6a3dfac920.png" />
    <Card.Body>
      <Card.Title>Save</Card.Title>
      <Card.Text>
        You can save your personal diagram and see your previous work!
      </Card.Text>
    </Card.Body>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://www.apkmirror.com/wp-content/uploads/2020/09/16/5f50ce65458ff.png"/>
    <Card.Body>
      <Card.Title>Share</Card.Title>
      <Card.Text>
        Share your personal diagram with your co-workers, friends, and family!
      </Card.Text>
    </Card.Body>
  </Card>
</CardGroup>
</div>
  )
}

export default Home
