import React from 'react'
import { useSelector } from 'react-redux'
import ControlledCarousel from './Carousel'
import { SliderData } from './SliderData'
import Page from './Page'
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
      <h2 className="homepage-title">
        Make a beautiful data visualizations with Coor|xy
      </h2>
      <p ></p>
    </div>
  )
}

export default Home
