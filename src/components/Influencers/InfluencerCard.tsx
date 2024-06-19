import { Avatar, Button, Card, Tag, Tooltip } from 'antd';
import { Influencer } from '../../types';

import {
  UserOutlined,
  StarOutlined,
  PayCircleOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { formatAmount, formatNumber } from '../../utils/format';
interface InfluencerCardProps {
  influencer: Influencer;
  onBook: (influencer: Influencer) => void;
  suggestion: string;
}

const InfluencerCard = ({
  influencer,
  onBook,
  suggestion,
}: InfluencerCardProps) => {
  return (
    <Card key={influencer.id}>
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
          {formatNumber(influencer.follower, { notation: 'compact' })} Followers
        </p>
        <p>
          Availability:{' '}
          {influencer.availability ? (
            <CheckCircleOutlined style={{ color: 'green' }} />
          ) : (
            'Unavailable'
          )}
        </p>
        {suggestion && (
          <Tooltip placement="top" title={suggestion}>
            <Tag
              icon={<ExclamationCircleOutlined />}
              style={{ fontSize: '14px', cursor: 'help' }}
              color="success"
            >
              suggested
            </Tag>
          </Tooltip>
        )}
      </div>
    </Card>
  );
};

export default InfluencerCard;
