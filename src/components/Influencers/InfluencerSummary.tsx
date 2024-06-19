import React, { useState } from 'react';
import { Button, message, Flex, Typography } from 'antd';
import { formatAmount, formatNumber } from '../../utils/format';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Influencer } from '../../types';
const { Title, Text, Paragraph } = Typography;

type InfluencerSummaryProps = {
  influencer: Influencer;
  onConfirm: () => Promise<void>;
  goBack: () => void;
};

const InfluencerSummary: React.FC<InfluencerSummaryProps> = ({
  influencer,
  onConfirm,
  goBack,
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
          onClick={goBack}
          icon={<ArrowLeftOutlined />}
        />
        <Title level={2}>Summary</Title>
      </Flex>
      <Flex vertical>
        <Title level={1}>{influencer.name}</Title>
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Paragraph>
        <Paragraph>
          <Text strong>Followers:</Text>{' '}
          {formatNumber(influencer.follower, { notation: 'compact' })}
        </Paragraph>
        <Paragraph>
          <Text strong>Cost:</Text>{' '}
          {formatAmount(influencer.cost, { currency: 'INR' })}
        </Paragraph>
        <div>
          <Button
            type="primary"
            onClick={handleConfirm}
            loading={loading}
            style={{ marginTop: '20px' }}
          >
            Confirm Booking
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default InfluencerSummary;
