import React from 'react';
import Cards, { Card, Row } from 'react-bootstrap';
import { SliderData } from './SliderData';
import DummyChart from '../DummyChart';

const Page = () => {
  return (
    <div className="homepage-grid-container">
      <h2 className="homepage-title" >Make a beautiful data visualizations with Coor|xy</h2>

    <div className='homepage-chart-grid'>
      <div className='homepage-chart-tile'>
        <DummyChart type={'Bar'} />
      </div>
      <div className='homepage-chart-tile'>
        <DummyChart type={'Line'} />
      </div>
      <div className='homepage-chart-tile'>
        <DummyChart type={'Scatter'} />
      </div>
      <div className='homepage-chart-tile'>
        <DummyChart type={'Area'} />
      </div>
      <div className='homepage-chart-tile'>
        <DummyChart type={'Stacked Bar'} />
      </div>
      <div className='homepage-chart-tile'>
        <DummyChart type={'Stacked Area'} />
      </div>
      <div className='homepage-chart-tile'>
        <DummyChart type={'Pie'} />
      </div>
    </div>
    </div>
  );
};

export default Page;
