import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherByCity } from '../Api/epics';
import { RootState } from '../Api/store';
import { RequestLocation, getCookie } from '../Api/Requests';
import { Card, Col, Row } from 'react-bootstrap';
import { City, Day, Days, ListElement, Response } from '../Types/Response';
import WeatherIcon from './WeatherIcon';

const getDateSting = (time: Date) => {
  const day = time.getDate();
  const sday = day <= 9 ? '0' + day : day;
  const month = time.getMonth() + 1;
  const smonth = month <= 9 ? '0' + month : month;
  const year = time.getFullYear();
  return sday + '.' + smonth + '.' + year;
};

const getTimeSting = (time: Date) => {
  const hour = time.getHours();
  const shour = hour <= 9 ? '0' + hour : hour;
  const minute = time.getMinutes();
  const sminute = minute <= 9 ? '0' + minute : minute;
  const second = time.getSeconds();
  const ssecond = second <= 9 ? '0' + second : second;
  return shour + ':' + sminute + ':' + ssecond;
};

function Weather() {
  const dispatch = useDispatch();
  const [list, setList] = useState<ListElement[]>();
  const city: City = useSelector((state: RootState) => {
    return state.weather.City;
  });
  const weather: Days = useSelector((state: RootState) => {
    return state.weather.Days;
  });

  let time = new Date();
  const [ctime, setCTime] = useState<Date>();

  time.setHours(
    time.getHours() + city?.timezone / 3600 + time.getTimezoneOffset() / 60
  );

  useEffect(() => {
    const interval = setInterval(() => {
      time = new Date();
      time.setHours(
        time.getHours() + city?.timezone / 3600 + time.getTimezoneOffset() / 60
      );
      setCTime(time);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //     if (weather) {
  //         const List = weather.list;
  //         List?.map(e => {
  //             if (new Date().toUTCString().slice(0, 16) === toDateTime(e.dt + weather?.city?.timezone).toUTCString().slice(0, 16)) {
  //                 console.log(e)
  //             }
  //         })
  //         // List?.map(e => {
  //         //     if (toDateTime(e.dt + weather?.city?.timezone).toUTCString().slice(0, 16) === time.toUTCString().slice(0, 16)) {
  //         //         console.log(toDateTime(e.dt + weather?.city?.timezone).toUTCString())
  //         //     }
  //         // }
  //         //)
  //         setList(List)
  //     }
  // }, [weather]);

  return (
    <Container>
      {city && weather?.days ? (
        <>
          <Card className="mt-3 bg-customblue text-white customshadow">
            <Card.Body className="p-3 pb-1">
              <Row className="Row">
                <Col className="mb-3">
                  <h3 className="m-0 mb-2">
                    {city.name}, {city.country}
                  </h3>
                  <h3 className="m-0">{getDateSting(time)}</h3>
                  <h3 className="m-0">{getTimeSting(time)}</h3>
                </Col>
                <Col className="mb-3">
                  <Row>
                    <Col className="d-flex justify-content-end">
                      <div className="w-75">
                        <WeatherIcon
                          id={weather.days[0].day[0]?.weather[0].icon}
                        ></WeatherIcon>
                      </div>
                    </Col>
                    <Col className="d-flex justify-content-start flex-column p-0">
                      <h2 className="m-0">
                        {Math.round(weather.days[0].day[0]?.main.temp)}
                        {'\u00b0'}
                      </h2>
                      <h5 className="m-0">
                        {weather.days[0].day[0]?.weather[0].description}
                      </h5>
                    </Col>
                  </Row>
                </Col>
                <Col className="d-flex flex-column text-end">
                  <h5 className="m-0">
                    Wind: {weather.days[0].day[0]?.wind.speed} m/s
                  </h5>
                  <h5 className="m-0">
                    Humidity: {weather.days[0].day[0]?.main.humidity}%
                  </h5>
                  <h5 className="m-0">
                    Clouds: {weather.days[0].day[0]?.clouds.all}%
                  </h5>
                </Col>
              </Row>
              <Row></Row>
              <Row>
                <Col className="m-0 p-0">
                  <Card className="mt-3 bg-customlightblue text-white">
                    <Card.Body></Card.Body>
                  </Card>
                </Col>
                <Col className="m-0 p-0">
                  <Card className="mt-3 bg-customlightblue text-white">
                    <Card.Body></Card.Body>
                  </Card>
                </Col>
                <Col className="m-0 p-0">
                  <Card className="mt-3 bg-customlightblue text-white">
                    <Card.Body></Card.Body>
                  </Card>
                </Col>
                <Col className="m-0 p-0">
                  <Card className="mt-3 bg-customlightblue text-white">
                    <Card.Body></Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Weather;
