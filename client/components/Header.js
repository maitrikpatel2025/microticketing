import Link from "next/link";

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
      icon: "bi bi-box-arrow-right",
      label: "Sign Out",
      href: "/auth/signout",
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, icon }) => {
      return (
        <li key={href} className="nav-item p-2">
          <Link href={href} className="nav-link fs-6 border border-2 border-primary rounded-pill">
            {label}
            {"  "}
            <i className={icon}></i>
          </Link>
        </li>
      );
    });

  return (
    <div>
      <nav className="navbar  navbar-light  bg-light" >
        <div className="container-fluid">
          <div className="navbar-header">
            <Link href="/" className="navbar-brand fs-4">
              {" "}
              MicroTicketing{" "}
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
