import React from 'react';
import { FunnelChart, Tooltip, LabelList, Funnel } from 'recharts';

const data = [
  {
    value: 100,
    name: '展现',
    fill: '#8884d8',
  },
  {
    value: 80,
    name: '点击',
    fill: '#83a6ed',
  },
  {
    value: 50,
    name: '访问',
    fill: '#8dd1e1',
  },
  {
    value: 40,
    name: '咨询',
    fill: '#82ca9d',
  },
  {
    value: 26,
    name: '订单',
    fill: '#a4de6c',
  },
];

const FunnelComp = () => {
  return (
    <FunnelChart width={730} height={250}>
      <Tooltip />
      <Funnel dataKey='value' data={data} isAnimationActive>
        <LabelList position='right' fill='#000' stroke='none' dataKey='name' />
      </Funnel>
    </FunnelChart>
  );
};

export default FunnelComp;
