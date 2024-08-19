import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  // const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3">
      <Container>
        <nav className="flex justify-between items-center">
          <Link className="mr-4" to="/">
            <Logo />
          </Link>
          <ul className="flex items-center gap-12">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={(isActive) =>
                        `text-lg font-semibold hover:text-orange-500 ${
                          isActive ? "" : "text-black"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
