import { useReducer, useState } from 'react';
import { Col, Layout, Row, Steps } from 'antd';
import InfluencerFilter from './InfluencerFilter';
import InfluencerList from './InfluencerList';
import InfluencerSummary from './InfluencerSummary';
import { InfluencerApi } from '../../api/influencer';
import { Influencer, State, Action } from '../../types';
const { Content } = Layout;
const { Step } = Steps;

const initialFiltersState: State = {
  costRange: [0, 50000],
  ratingRange: [0, 5],
  selectedFollowers: 'all',
  selectedGenders: 'all',
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'COST_RANGE':
      return { ...state, costRange: action.payload };
    case 'RATING_RANGE':
      return { ...state, ratingRange: action.payload };
    case 'SELECTED_FOLLOWERS':
      return { ...state, selectedFollowers: action.payload };
    case 'SELECTED_GENDER':
      return { ...state, selectedGenders: action.payload };
    default:
      return state;
  }
};

const InfluencerWizard = () => {
  const [current, setCurrent] = useState(0);
  const [influencerToBook, setInfluencerToBook] = useState<Influencer>();
  const [state, dispatch] = useReducer(reducer, initialFiltersState);
  const [influencersData, setInfluencersData] = useState<Influencer[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const filterInfluencers = (influencers: Influencer[]): Influencer[] => {
    return influencers.filter((influencer) => {
      const matchesCostRange =
        state.costRange[1] === 50000
          ? influencer.cost >= state.costRange[0]
          : influencer.cost >= state.costRange[0] &&
            influencer.cost <= state.costRange[1];
      const matchesRatingRange =
        influencer.rating >= state.ratingRange[0] &&
        influencer.rating <= state.ratingRange[1];
      const matchesFollowers =
        state.selectedFollowers === 'all' ||
        influencer.follower === Number(state.selectedFollowers);
      const matchesGenders =
        state.selectedGenders === 'all' ||
        influencer.gender === state.selectedGenders;

      return (
        matchesCostRange &&
        matchesRatingRange &&
        matchesFollowers &&
        matchesGenders
      );
    });
  };
  const goBack = () => {
    setCurrent(current - 1);
  };
  const onSearch = async () => {
    setCurrent(current + 1);
    setLoading(true);
    let data = await InfluencerApi.getInfluencers();
    let filteredData = filterInfluencers(data.Influencers);
    setInfluencersData(filteredData);
    setLoading(false);
  };

  const steps = [
    {
      title: 'Filter Influencers',
      content: (
        <InfluencerFilter
          state={state}
          dispatch={dispatch}
          onSearch={onSearch}
        />
      ),
    },
    {
      title: 'Select Influencer',
      content: (
        <>
          {influencersData && (
            <InfluencerList
              influencers={influencersData}
              onBook={(influencer) => {
                setInfluencerToBook(influencer);
                setCurrent(current + 1);
              }}
              goBack={goBack}
              loading={loading}
            />
          )}
        </>
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
              goBack={goBack}
            />
          )}
        </>
      ),
    },
  ];
  return (
    <Layout>
      <Content className="container">
        <div className="wizard">
          <Row gutter={16}>
            <Col xs={24} md={16} style={{ padding: '20px' }}>
              <Steps current={current}>
                {steps.map((item, index) => (
                  <Step key={index} title={item.title} />
                ))}
              </Steps>

              <div style={{ minHeight: '70vh' }}>{steps[current].content}</div>
            </Col>
            <Col xs={0} md={8} className="wizard_image_container"></Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default InfluencerWizard;
