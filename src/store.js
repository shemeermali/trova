import { createStore, applyMiddleware } from 'redux';
import { multiClientMiddleware } from 'redux-axios-middleware';
import axios from 'axios';
import rootReducer from './redux/reducers/rootReducer';

export default function configureStore(initialState = {}) {
    const client = {
        default: {
          client: axios.create({
            baseURL: '../public/api/bookingData.json',
            responseType: 'json',
            withCredentials: true,
            headers: {
              Accept: '*/*'
            }
          })
        }
      };

  const middlewareConfig = {
    onError(action) {
    },
    emptyObject: {},
    interceptors: {}
  };

  const axiosMiddleware = multiClientMiddleware(client, middlewareConfig);

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      axiosMiddleware
    )
  );
}
