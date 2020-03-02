import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from '../actions/booking';
import data from '../../data/api/bookingData.json'

const initialState = {
  dataList: false,
  loaded: false,
  loading: false
};

function bookingReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOAD_SUCCESS:
      console.log('here reached', data);
      const dataObj = data;
      return {
        ...state,
        loading: false,
        loaded: true,
        dataList: dataObj
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default bookingReducer;
