import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherByCity } from '../Api/epics';
import { RootState } from '../Api/store';
import { RequestLocation, getCookie, setCookie, RequestCity } from '../Api/Requests';
import { Dropdown, InputGroup } from 'react-bootstrap';

const SwitchThemes = () => {
  var element = document.body;
  element.dataset.bsTheme = element.dataset.bsTheme === 'light' ? 'dark' : 'light';
};

function AppNavbar() {
  const dispatch = useDispatch();

  const [showPredictions, setShowPredictions] = useState(false);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState(document.body.dataset.bsTheme);
  const [cityHint, setCityHint] = useState('');

  const GetCityPredict = (city: string) => {
    if (city.trim() === '') {
      setCityHint('');
    }
    RequestCity(city.trim()).subscribe({
      next(x) {
        setCityHint(x);
      },
      error() {
        if (city.trim() === '') setCityHint('');
      },
    });
  };

  useEffect(() => {
    if (getCookie('City') !== null) {
      dispatch(getWeatherByCity(getCookie('City')!));
    }
    RequestLocation().subscribe({
      next(x) {
        setCookie({ name: 'City', value: x, expires_second: 365 * 24 * 60 * 60, path: '/' });
        dispatch(getWeatherByCity(x));
      },
    });
  }, []);
  const searchCity = () => {
    if (search.trim() === '') return;
    dispatch(getWeatherByCity(search.trim()));
    setSearch('');
    setCityHint('');
  };

  const city = useSelector((state: RootState) => {
    return state.weather.City;
  });

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container fluid>
        <Navbar.Brand className="text-customlightblue disabled">React Test App (Patrick Grogor)</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="disabled" id="dropdown-basic">
              Settings
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="d-flex p-2">
                <p className="m-0">Dark theme</p>
                <Form.Check
                  type="switch"
                  className="ms-auto"
                  checked={theme === 'dark'}
                  onClick={() => {
                    SwitchThemes();
                    setTheme(theme === 'light' ? 'dark' : 'light');
                  }}
                ></Form.Check>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Form
            className="d-flex me-2"
            onSubmit={(e) => {
              e.preventDefault();
              searchCity();
            }}
          >
            <InputGroup>
              <Form.Control
                type="search"
                placeholder={city ? city.name : ''}
                className="shadow-sm"
                aria-label="Search"
                id="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  GetCityPredict(e.target.value);
                }}
                onFocus={() => setShowPredictions(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setShowPredictions(false);
                  }, 300)
                }
                autoComplete="off"
              />
              <Dropdown.Menu show={showPredictions && cityHint !== ''} className="p-0">
                <Button
                  className="p-2 m-0 w-100"
                  variant="outline"
                  type="submit"
                  onClick={() => {
                    setSearch(cityHint);
                  }}
                >
                  {cityHint}
                </Button>
              </Dropdown.Menu>
              <Button variant="outline-customlightblue shadow-sm" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
