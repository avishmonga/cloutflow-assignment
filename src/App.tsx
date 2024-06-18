import React, { useState } from 'react';
import { Col, Layout, Row, Steps } from 'antd';
import './App.css';
import InfluencerFilter from './components/InfluencerFilter';
import InfluencerList from './components/InfluencerList';
import InfluencerSummary from './components/InfluencerSummary';

const { Content } = Layout;
const { Step } = Steps;
interface Influencer {
  id: number;
  name: string;
  rating: number;
  cost: number;
  follower: number;
  availability: boolean;
}

const influencersData: Influencer[] = [
  {
    id: 1,
    name: 'Shahrukh Khan',
    rating: 5,
    cost: 50000,
    follower: 250000,
    availability: false,
  },
  {
    id: 2,
    name: 'Kritika',
    rating: 4.2,
    cost: 20000,
    follower: 3000,
    availability: true,
  },
  {
    id: 3,
    name: 'Rahul',
    rating: 3.4,
    cost: 4050,
    follower: 9090,
    availability: true,
  },
  {
    id: 3,
    name: 'Rahul',
    rating: 3.4,
    cost: 4050,
    follower: 9090,
    availability: true,
  },
  {
    id: 3,
    name: 'Rahul',
    rating: 3.4,
    cost: 4050,
    follower: 9090,
    availability: true,
  },
  {
    id: 3,
    name: 'Rahul',
    rating: 3.4,
    cost: 4050,
    follower: 9090,
    availability: true,
  },
];
const App: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [influencerToBook, setInfluencerToBook] = useState<Influencer>();

  const steps = [
    {
      title: 'Filter Influencers',
      content: (
        <InfluencerFilter
          onSearch={async () => {
            setCurrent(current + 1);
          }}
        />
      ),
    },
    {
      title: 'Select Influencer',
      content: (
        <InfluencerList
          influencers={influencersData}
          onBook={(influencer) => {
            setInfluencerToBook(influencer);
            setCurrent(current + 1);
          }}
        />
      ),
    },
    {
      title: 'Book',
      content: (
        <>
          {influencerToBook && (
            <InfluencerSummary
              influencer={influencerToBook}
              onConfirm={async () => {}}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <div className="App">
      <Layout>
        <Content
          style={{
            padding: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <div
            style={{
              width: '85%',
              backgroundColor: '#fff',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              borderRadius: '8px',
            }}
          >
            <Row gutter={16}>
              <Col xs={24} md={16} style={{ padding: '20px' }}>
                <Steps current={current}>
                  {steps.map((item, index) => (
                    <Step key={index} title={item.title} />
                  ))}
                </Steps>

                <div style={{ minHeight: '70vh' }}>
                  {steps[current].content}
                </div>
              </Col>
              <Col
                xs={0} // hidden on extra small devices
                md={8} // visible on medium and larger devices
                style={{
                  backgroundColor: 'red',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
