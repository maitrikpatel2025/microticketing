import Link from "next/link";
import Image from "next/image";
import logo from "../assets/microticket.png";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && {
      icon: "bi bi-person-plus-fill",
      label: "Sign Up",
      href: "/auth/signup",
    },
    !currentUser && {
      icon: "bi bi-person-fill-down",
      label: "Sign In",
      href: "/auth/signin",
    },
    currentUser && {
      icon: "bi bi-ticket",
      label: "Sell Tickets",
      href: "/tickets/new",
    },
    currentUser && {
      icon: "bi bi-list-ul",
      label: "My Orders",
      href: "/orders",
    },

    currentUser && {
      icon: "bi bi-box-arrow-right",
      label: "Sign Out",
      href: "/auth/signout",
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, icon }) => {
      return (
        <li key={href} className="nav-item p-1 m-2">
          <Link
            href={href}
            className="nav-link fs-5 border border-2 border-white rounded-pill"
          >
            <span className="text-white">
              {label}
              {"  "}
              <i className={icon}></i>
            </span>
          </Link>
        </li>
      );
    });

  return (
    <div>
      <nav className="navbar  navbar-light  bg-dark shadow-sm">
        <div className="container container-fluid">
          <div className="navbar-header">
            <Link href="/" className="navbar-brand ">
              {" "}
              <Image src={logo} alt="Picture of the author" />
            </Link>
          </div>
          <div>
            <div className="d-flex justify-content-end">
              <ul className="nav d-flex align-items-center p-1">{links}</ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
