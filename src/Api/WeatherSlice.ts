import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Day, Days, Response } from '../Types/Response';

export interface weatherState {
  City: City;
  Days: Days;
  error?: String;
}
const initialState: weatherState = {
  City: {} as City,
  Days: {} as Days,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<Response>) => {
      if (action.payload.cod === '404') {
        state.error = 'City not found';
      } else {
        state.City = action.payload.city;
        state.Days = GetDays(action.payload);
      }
    },
    clearErrorMessage: (state) => {
      state.error = '';
    },
  },
});

function GetDays(response: Response) {
  let days: Days = { days: [{ day: [] }] };
  let index: number = 0;

  const now = new Date();
  now.setHours(now.getHours() + now.getTimezoneOffset() / 60 + response.city.timezone / 3600);
  for (let i = 0; i < response.list.length; i++) {
    const date = toDateTime(response.list[i].dt + response.city.timezone + now.getTimezoneOffset() * 60);
    if (now.toString().slice(0, 16) === date.toString().slice(0, 16)) {
      days.days[0]?.day?.push(response.list[i]);
    } else {
      index = i;
      break;
    }
  }
  for (let i = 0; i < 4; i++) {
    let day: Day = {
      day: response.list.slice(index, index + 8),
    };
    days.days.push(day);
    index = index + 8;
  }
  return days;
}

export const toDateTime = (secs: number) => {
  var t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t;
};

export const { setWeather, clearErrorMessage } = weatherSlice.actions;
export default weatherSlice.reducer;
