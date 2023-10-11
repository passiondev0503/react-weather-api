import { combineEpics, Epic } from 'redux-observable';
import { catchError } from 'rxjs';
import { getWeatherByCityEpic } from './epics';

export const rootEpic: Epic = (action$, store$, dependencies) =>
  combineEpics(getWeatherByCityEpic)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      return source;
    })
  );
