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

function AppNavbar() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (getCookie('City') === null) {
      RequestLocation();
    }
    dispatch(getWeatherByCity(getCookie('City')!));
  }, []);
  const searchCity = () => {
    if (search === '') return;
    dispatch(getWeatherByCity(search));
  };

  const city = useSelector((state: RootState) => {
    return state.weather.City;
  });

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container fluid>
        <Navbar.Brand className="text-customlightblue disabled">
          YourWeather
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
          <Navbar.Brand>{city ? city.name : ''}</Navbar.Brand>
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              searchCity();
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search city"
              className="me-2 shadow-sm"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-customlightblue shadow-sm" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
