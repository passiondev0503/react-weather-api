import { PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { RequestWeather } from './Requests';
import { setErrorMessage, setWeather } from './WeatherSlice';
import { Response } from '../Types/Response';

export const getWeatherByCity = (city: string) => ({
  type: 'getWeatherByCity',
  payload: city,
});
export const getWeatherByCityEpic: Epic = (action$: Observable<PayloadAction<string>>) =>
  action$.pipe(
    ofType('getWeatherByCity'),
    map((action) => action.payload),
    mergeMap((city) =>
      RequestWeather(city).pipe(
        map((res: Response) => setWeather(res)),
        catchError((error) => of(setErrorMessage(error)))
      )
    )
  );
