import React, { useState } from 'react';
import { Slider, Row, Col, Select, Button } from 'antd';

const { Option } = Select;

interface InfluencerFilterProps {
  onSearch: () => Promise<void>;
}

const InfluencerFilter: React.FC<InfluencerFilterProps> = ({ onSearch }) => {
  const [costRange, setCostRange] = useState<[number, number]>([0, 50000]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);
  const [selectedFollowers, setSelectedFollowers] = useState<string>('all');

  const [selectedGenders, setSelectedGenders] = useState<string>('all');

  const onCostChange = (value: number[]) => {
    setCostRange([value[0], value[1]]);
  };

  const onRatingChange = (value: number[]) => {
    setRatingRange([value[0], value[1]]);
  };
  const onFollowersChange = (value: string) => {
    setSelectedFollowers(value);
  };

  const onGenderChange = (value: string) => {
    setSelectedGenders(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Filter Influencers</h2>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h3>Cost (₹)</h3>
          <Slider
            range
            step={1000}
            min={0}
            max={50000}
            defaultValue={costRange}
            onChange={onCostChange}
          />
          <div>
            Selected Range: ₹{costRange[0]} - ₹
            {costRange[1] === 50000 ? '50000+' : costRange[1]}
          </div>
        </Col>

        <Col span={24}>
          <h3>Rating</h3>
          <Slider
            range
            step={0.5}
            min={0}
            max={5}
            defaultValue={ratingRange}
            onChange={onRatingChange}
          />
          <div>
            Selected Range: {ratingRange[0]} - {ratingRange[1]}
          </div>
        </Col>

        <Col span={24}>
          <h3>Followers</h3>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Followers"
            onChange={onFollowersChange}
            defaultValue={selectedFollowers}
          >
            <Option value="all">All</Option>
            <Option value="1000+">1k+</Option>
            <Option value="5000+">5k+</Option>
            <Option value="10000+">10k+</Option>
            <Option value="50000+">50k+</Option>
            <Option value="100000+">100k+</Option>
            <Option value="1000000+">1M+</Option>
          </Select>
        </Col>

        <Col span={24}>
          <h3>Gender</h3>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Gender"
            onChange={onGenderChange}
            defaultValue={selectedGenders}
          >
            <Option value="all">All</Option>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Col>
        <Col span={24}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '20px 0px',
            }}
          >
            <Button
              style={{ alignSelf: 'flex-start' }}
              type="primary"
              onClick={onSearch}
            >
              Search
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InfluencerFilter;
