export interface Response {
  list: ListElement[];
  city: City;
  cod: string;
}

export interface City {
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export interface ListElement {
  dt: number;
  dt_txt: string;
  weather: Weather[];
  main: Main;
  wind: Wind;
  clouds: Clouds;
}

export interface Days {
  days: Day[];
}

export interface Day {
  day: ListElement[];
}

interface Main {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface Wind {
  deg: number;
  gust: number;
  speed: number;
}

interface Clouds {
  all: number;
}
