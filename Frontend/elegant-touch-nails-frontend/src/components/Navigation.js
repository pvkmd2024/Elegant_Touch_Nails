import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/clients">Clients</Link>
      </li>
      <li>
        <Link to="/services">Services</Link>
      </li>
      <li>
        <Link to="/appointments">Appointments</Link>
      </li>
      <li>
        <Link to="/payments">Payments</Link>
      </li>
      <li>
        <Link to="/staff">Staff</Link>
      </li>
      <li>
        <Link to="/staff-schedule">Staff Schedule</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
