import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './rootEpic';
import { useDispatch } from 'react-redux';
import WeatherReducer from './WeatherSlice';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    weather: WeatherReducer,
  },
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = ReturnType<typeof useDispatch>;
export default store;
