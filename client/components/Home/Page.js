import React from 'react'
import Cards, { Card, Row } from 'react-bootstrap'
import { SliderData } from './SliderData'
const Page = () => {
  return (
    <div>
        <h3 className="page-header">Make a great data visualization with Coor|xy!</h3>
        <p className="page-description">unlike excel or other online graph making websites, you can upload your .csv files and customize it yourself. It is very easy to transform your data into graph within a minute!</p>
    <div className="card-container">
    <Row xs={1} md={2} className="row-examples">
      {SliderData.map(graph => {
        return (
          <Card className="card-examples" style={{width: '20rem'}} key={graph.id}>
            <Card.Img variant="top" src={graph.image} />
            <Card.Body>
              <Card.Title>{graph.type}</Card.Title>
              <Card.Text>
                This is where the description of the graph goes.
              </Card.Text>
            </Card.Body>
            </Card>
        )
      })}
      </Row>
      </div>
    </div>
  )
}

export default Page
