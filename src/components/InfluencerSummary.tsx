import React, { useState } from 'react';
import { Button, message, Flex } from 'antd';
import { formatAmount, formatNumber } from '../utils/format';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface Influencer {
  id: number;
  name: string;
  rating: number;
  cost: number;
  follower: number;
  availability: boolean;
}
type InfluencerSummaryProps = {
  influencer: Influencer;
  onConfirm: () => Promise<void>;
};

const InfluencerSummary: React.FC<InfluencerSummaryProps> = ({
  influencer,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      message.success('Booking confirmed successfully!');
    } catch (error) {
      message.error(
        'There was an error confirming the booking. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

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
        <h2>Summary</h2>
      </Flex>
      <Flex vertical justify="center">
        <div>
          <h1>{influencer.name}</h1>
          <p>
            Discription about {influencer.name} is hskdaldf
            sdjfnakjfdnjadsfnkdsjf aodifasdfoas aidffadsfa iosdfasdf
          </p>
          <p>
            Followers:{' '}
            {formatNumber(influencer.follower, { notation: 'compact' })}
          </p>
          <p>Cost: {formatAmount(influencer.cost, { currency: 'INR' })}</p>
          <Button type="primary" onClick={handleConfirm} loading={loading}>
            Confirm Booking
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default InfluencerSummary;
