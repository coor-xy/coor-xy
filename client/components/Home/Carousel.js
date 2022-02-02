import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import PieComp from '../chartComponents/PieComp';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel className ="carousel-container" activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <img
          className="carousel-img"
          src="https://media.istockphoto.com/photos/glowing-light-market-chart-of-business-glowing-stock-graph-or-data-picture-id1322479796?b=1&k=20&m=1322479796&s=170667a&w=0&h=PJ6S3mR5Tpkj7HyN4PRhlLVlAc-CMp8vq5lm_wEYxEY="
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h3>Welcome to Coor|xy!</h3>
          <p>We provide creative designing for .csv files, where you can upload and customize your data</p>
        </Carousel.Caption>
        </Carousel.Item>
      <Carousel.Item>
      <img
          className="carousel-img"
          src="https://user-images.githubusercontent.com/4280312/48332539-2526c180-e64c-11e8-9482-d7e97cc50b93.png"
          alt="Second slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h3>Bar Chart</h3>
          <p>Bar chart description</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img"
          src="https://blackmixture.com/wp-content/uploads/2018/04/black-mixture-background-2018.jpg"
          alt="Third slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h3>Pie Chart</h3>
          <p>Pie chart description</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-img"
          src="https://grafana.com/static/assets/img/blog/scatterplot.png"
          alt="Fourth slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h3>Scatter Chart</h3>
          <p>
           Scatter chart description
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}


export default ControlledCarousel
