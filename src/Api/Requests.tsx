import { catchError, from, map, Observable } from 'rxjs';
import { Response } from '../Types/Response';

const configValue: string | undefined = process.env.REACT_APP_WEATHER_API_KEY;

interface CityRespose {
  city: string;
}
export function RequestWeather(city: string): Observable<any> {
  const apiCall = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${configValue}&units=metric`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson as Response;
    });
  return from(apiCall).pipe(
    map((res) => {
      if (res.cod === '404') {
        throw 'City not found';
      }
      return res;
    }),
    catchError((error) => {
      throw error;
    })
  );
}

export function RequestLocation() {
  const apiCall = fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then((responseJson: CityRespose) => {
      return responseJson.city;
    });
  return from(apiCall);
}

export function RequestCity(search: String) {
  const apiCall = fetch(`https://api.api-ninjas.com/v1/city?name=${search}`, {
    method: 'GET',
    headers: {
      'X-Api-Key': `${process.env.REACT_APP_NINJAS_API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.error !== undefined) throw 'error';
      if (responseJson.length === 0) return '';
      return responseJson[0].name;
    })
    .catch((error) => {
      throw 'error';
    });
  return from(apiCall);
}

export function getCookie(name: string) {
  name = name + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return null;
}

export function setCookie(cookieParams: setCookieParamas) {
  let s = cookieParams.name + '=' + encodeURIComponent(cookieParams.value) + ';';
  if (cookieParams.expires_second) {
    let d = new Date();
    d.setTime(d.getTime() + cookieParams.expires_second * 1000);
    s += ' expires=' + d.toUTCString() + ';';
  }
  if (cookieParams.path) s += ' path=' + cookieParams.path + ';';
  if (cookieParams.domain) s += ' domain=' + cookieParams.domain + ';';
  if (cookieParams.secure) s += ' secure;';
  document.cookie = s;
}

export function deleteCookie(name: string) {
  document.cookie = name + '=; expires=' + Date();
}

type setCookieParamas = {
  name: string;
  value: string;
  expires_second?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
};
