import React from 'react';
import { Card, Pagination, Avatar, Button } from 'antd';
import { Flex } from 'antd';
import {
  UserOutlined,
  StarOutlined,
  PayCircleOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { formatAmount, formatNumber } from '../utils/format';

interface Influencer {
  id: number;
  name: string;
  rating: number;
  cost: number;
  follower: number;
  availability: boolean;
}

interface InfluencerListProps {
  influencers: Influencer[];
  onBook: (influencer: Influencer) => void;
}

const InfluencerList: React.FC<InfluencerListProps> = ({
  influencers,
  onBook,
}) => {
  return (
    <div style={{ padding: '10px 20px' }}>
      <Flex align="baseline">
        <Button
          style={{ color: 'black' }}
          type="link"
          size="large"
          onClick={() => {}}
          icon={<ArrowLeftOutlined />}
        />
        <h2>Influencers</h2>
      </Flex>
      <Flex wrap="wrap" gap={10}>
        {influencers.map((influencer) => (
          <Card>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Avatar size={64} icon={<UserOutlined />} />
              {influencer.availability && (
                <div style={{ textAlign: 'right' }}>
                  <Button type="primary" onClick={() => onBook(influencer)}>
                    Book
                  </Button>
                </div>
              )}
            </div>
            <div>
              <h3>{influencer.name}</h3>
              <p>
                <StarOutlined /> {influencer.rating} | <PayCircleOutlined />{' '}
                {formatAmount(influencer.cost, {
                  currency: 'INR',
                  notation: 'standard',
                })}{' '}
                | <TeamOutlined />{' '}
                {formatNumber(influencer.follower, { notation: 'compact' })}{' '}
                Followers
              </p>
              <p>
                Availability:{' '}
                {influencer.availability ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  'Unavailable'
                )}
              </p>
            </div>
          </Card>
        ))}
      </Flex>
      <Flex style={{ marginTop: '1rem' }} justify="center">
        <Pagination simple defaultCurrent={2} total={50} />
      </Flex>
    </div>
  );
};

export default InfluencerList;
