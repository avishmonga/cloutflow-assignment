import React, { useState } from 'react';
import { Pagination, Button } from 'antd';
import { Flex } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import { Influencer } from '../../types';
import EmptyScreen from '../EmptyScreen';
import InfluencerCard from './InfluencerCard';
import { formatAmount, formatNumber } from '../../utils/format';
import Title from 'antd/es/typography/Title';
const pageSize = 6;
interface InfluencerListProps {
  influencers: Influencer[];
  onBook: (influencer: Influencer) => void;
  goBack: () => void;
  loading: boolean;
}

const getSuggestion = (influencer: Influencer) => {
  return influencer.rating >= 4 &&
    influencer.cost <= 10000 &&
    influencer.availability
    ? `This influencer has high rating ${
        influencer.rating
      }, low cost ${formatAmount(influencer.cost, {
        currency: 'INR',
        notation: 'standard',
      })}, and a significant following ${formatNumber(influencer.follower, {
        notation: 'compact',
      })} followers`
    : '';
};
const InfluencerList: React.FC<InfluencerListProps> = ({
  influencers,
  onBook,
  goBack,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastInfluencer = currentPage * pageSize;
  const indexOfFirstInfluencer = indexOfLastInfluencer - pageSize;
  const paginatedInfluencers = influencers.slice(
    indexOfFirstInfluencer,
    indexOfLastInfluencer
  );
  const onPageChange = (page: number) => {
    setCurrentPage(page);
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
        <Title level={2}>Influencers</Title>
      </Flex>
      {loading ? (
        <Skeleton />
      ) : influencers.length === 0 ? (
        <EmptyScreen
          description="No influencers found matching the selected criteria. Please adjust your filters and try again."
          handleButton={goBack}
          buttonText="Edit filters"
        />
      ) : (
        <>
          <Flex wrap="wrap" gap={10}>
            {paginatedInfluencers.map((influencer) => (
              <InfluencerCard
                key={influencer.id}
                influencer={influencer}
                onBook={onBook}
                suggestion={getSuggestion(influencer)}
              />
            ))}
          </Flex>
          <Flex style={{ marginTop: '1rem' }} justify="center">
            <Pagination
              simple
              current={currentPage}
              pageSize={pageSize}
              total={influencers.length}
              onChange={onPageChange}
            />
          </Flex>
        </>
      )}
    </div>
  );
};

export default InfluencerList;
