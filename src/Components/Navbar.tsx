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
import { RequestLocation, getCookie, setCookie } from '../Api/Requests';
import { Dropdown, InputGroup } from 'react-bootstrap';
import { toast } from 'react-hot-toast';

const SwitchThemes = () => {
  var element = document.body;
  element.dataset.bsTheme = element.dataset.bsTheme == 'light' ? 'dark' : 'light';
};

function AppNavbar() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState(document.body.dataset.bsTheme);

  const error: String | undefined = useSelector((state: RootState) => {
    return state.weather.error;
  });

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
    if (search === '') return;
    dispatch(getWeatherByCity(search));
    if (error)
      toast.error(error.toString(), {
        duration: 1000,
        style: {
          background: '#333',
          color: '#fff',
        },
      });
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
                    setTheme(theme == 'light' ? 'dark' : 'light');
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
                onChange={(e) => setSearch(e.target.value)}
              />
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
