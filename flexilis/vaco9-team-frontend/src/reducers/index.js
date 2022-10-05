import { combineReducers } from 'redux';

import user from './user';
import campaigns from './campaigns';
import selectedCampaign from './selectedCampaign';
import estimate from './estimate';
import error from './error';

export default combineReducers({
  user,
  campaigns,
  selectedCampaign,
  estimate,
  error,
});
