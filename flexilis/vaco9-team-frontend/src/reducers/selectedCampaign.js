import { GET_CAMPAIGNS_SUCCESS } from './campaigns';

const CAMPAIGN_SELECTED = 'CAMPAIGN_SELECTED';

export const selectCampaign = (campaignId) => ({
  type: CAMPAIGN_SELECTED,
  payload: {
    campaignId,
  },
});

export default function reducer(state = '', action) {
  switch (action.type) {
    case CAMPAIGN_SELECTED: {
      return action.payload.campaignId;
    }
    case GET_CAMPAIGNS_SUCCESS: {
      const { allIds } = action.payload;
      return allIds[0];
    }
    default: {
      return state;
    }
  }
}
