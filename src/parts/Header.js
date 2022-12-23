import React from "react";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { Link, withRouter } from "react-router-dom";
import propTypes from "prop-types";

function Header({ onLight, location }) {
  const linkColor = onLight ? "text-gray-900" : "text-white";

  const linkCTA =
    location.pathname.indexOf("/login") > -1
      ? `/register`
      : `/login`;
  const textCTA = location.pathname.indexOf("/login") > -1 ? "Daftar" : "Masuk";
  const linkHome = `${process.env.REACT_APP_FRONTPAGE_URL}`;
  const linkCourses = `${process.env.REACT_APP_FRONTPAGE_URL}/courses`;
  return (
    <header className="flex justify-between items-center">
      <div style={{ height: 50 }}>
        <Logo className={onLight ? "on-light" : "on-dark"}></Logo>
      </div>
      <ul className="flex">
        <li>
          <a
            href={linkHome}
            rel="noopener noreferrer"
            className={[
              linkColor,
              "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
            ].join(" ")}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href={linkCourses}
            rel="noopener noreferrer"
            className={[
              linkColor,
              "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
            ].join(" ")}
          >
            Courses
          </a>
        </li>
        {/* <li>
          <Link
            to="/"
            className={[
              linkColor,
              "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
            ].join(" ")}
          >
            Features
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={[
              linkColor,
              "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
            ].join(" ")}
          >
            Story
          </Link>
        </li> */}
        <li>
          {/* <Link to="/"> */}
          <Link
            to={linkCTA}
            className="bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 text-white hover:text-teal-500 text-lg px-6 py-3 font-medium ml-6"
          >
            {textCTA}
          </Link>
          {/* </Link> */}
        </li>
      </ul>
    </header>
  );
}

Header.propTypes = {
  onLight: propTypes.bool,
};

export default withRouter(Header);
