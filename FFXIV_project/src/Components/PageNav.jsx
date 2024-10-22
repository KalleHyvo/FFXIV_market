import {Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function PageNav() {
  return (
    <Nav defaultActiveKey="/" as="ul">
      <Nav.Item as="li">
        {/* Use NavLink from react-router-dom for routing */}
        <Nav.Link as={NavLink} to="/" exact>
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link as={NavLink} to="/graph">
          Graph Page
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link as={NavLink} to="/reference">
          Reference Page
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default PageNav;