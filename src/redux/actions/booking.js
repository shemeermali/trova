export const LOAD = 'trova/booking/LOAD';
export const LOAD_SUCCESS = 'trova/booking/LOAD_SUCCESS';
export const LOAD_FAIL = 'trova/booking/LOAD_FAIL';

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],

    payload: {
      request: {
        method: 'get',
        url: '../../../public/api/bookingData.json'
        // url: '/api/content-edit/queue/user-buckets'
      }
    }
  };
}
