export interface City {
  id: number;
  city: {
    id: {
      $numberLong: string;
    };
    name: string;
    findname: string;
    country: string;
    coord: {
      lon: number;
      lat: number;
    };
    zoom: {
      $numberLong: string;
    };
  };
}
