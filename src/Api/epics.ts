import { PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { Observable, map, mergeMap } from 'rxjs';
import { RequestWeather } from './Requests';
import { getWeather } from './WeatherSlice';
import { Response } from '../Types/Response';

export const getWeatherByCity = (city: string) => ({
  type: 'getWeatherByCity',
  payload: city,
});
export const getWeatherByCityEpic: Epic = (action$: Observable<PayloadAction<string>>) =>
  action$.pipe(
    ofType('getWeatherByCity'),
    map((action) => action.payload),
    mergeMap((city) => RequestWeather(city).pipe(map((res: Response) => getWeather(res))))
  );
