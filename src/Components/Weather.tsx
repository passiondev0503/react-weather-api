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
import { toDateTime } from '../Api/WeatherSlice';

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
  return shour + ':' + sminute;
};

function Weather() {
  const dispatch = useDispatch();
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [list, setList] = useState<ListElement[]>();
  const city: City = useSelector((state: RootState) => {
    return state.weather.City;
  });
  const weather: Days = useSelector((state: RootState) => {
    return state.weather.Days;
  });

  useEffect(() => {
    setDay(0);
    setHour(0);
  }, [city]);

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
                  <h3 className="m-0">
                    {getDateSting(toDateTime(weather.days[0].day[hour]?.dt + city.timezone + new Date().getTimezoneOffset() * 60))}
                  </h3>
                  <h3 className="m-0">
                    {getTimeSting(toDateTime(weather.days[0].day[hour]?.dt + city.timezone + new Date().getTimezoneOffset() * 60))}
                  </h3>
                </Col>
                <Col className="mb-3">
                  <Row>
                    <Col className="d-flex justify-content-end">
                      <div className="w-75">
                        <WeatherIcon id={weather.days[0].day[hour]?.weather[0].icon}></WeatherIcon>
                      </div>
                    </Col>
                    <Col className="d-flex justify-content-start flex-column p-0">
                      <h2 className="m-0">
                        {Math.round(weather.days[0].day[hour]?.main.temp)}
                        {'\u00b0'}
                      </h2>
                      <h5 className="m-0">{weather.days[0].day[hour]?.weather[0].description}</h5>
                    </Col>
                  </Row>
                </Col>
                <Col className="d-flex flex-column text-end">
                  <h5 className="m-0">Wind: {weather.days[0].day[hour]?.wind.speed} m/s</h5>
                  <h5 className="m-0">Humidity: {weather.days[0].day[hour]?.main.humidity}%</h5>
                  <h5 className="m-0">Clouds: {weather.days[0].day[hour]?.clouds.all}%</h5>
                </Col>
              </Row>
              <Row className="mt-3">
                {weather.days[0]?.day.map((e, index) => (
                  <Card
                    key={index}
                    className={
                      index === hour ? 'text-white bg-customblue rounded-0 w-25 p-0' : 'text-white bg-customlightblue rounded-0 w-25 p-0 customhover'
                    }
                    onClick={() => setHour(index)}
                  >
                    <Card.Body className="p-1">
                      <p className="m-0 text-center">
                        {Math.round(e.main.temp)}
                        {'\u00b0'}
                      </p>
                      <div className="d-flex justify-content-center">
                        <p className="m-0 w-25 text-center">
                          <WeatherIcon id={e.weather[0].icon}></WeatherIcon>
                        </p>
                      </div>
                      <p className="m-0 text-center">{getTimeSting(toDateTime(e.dt + city.timezone + new Date().getTimezoneOffset() * 60))}</p>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
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
