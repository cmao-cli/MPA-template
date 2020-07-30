import { store, AppState } from '../store';
import { apiCommon } from '../../../../common/scripts/base/fetch';

export const actions = {
  updateLocalTime(state:AppState):AppState {
    return { ...state, localTime: Date.now() };
  },

  async updateServerTime(state:AppState):Promise<void> {
    const res = await apiCommon.get('/tiger/canonical_time');
    store.setState({ ...state, serverTime: new Date(res.data.unix_utc_now * 1000).getTime() });
  },
};
