// #5366FF

import React, { useState } from "react";
import { Navbar, Nav } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "../context/useContext";

function NavbarLayout() {
  const { authenticated, logout } = useContextProvider();
  const navigate = useNavigate();

  const handlerLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Navbar container="lg" expand={true} color="black" dark>
        {authenticated ? (
          <Link className="d-flex navbar-brand" to={`/user/checklists`}>
            Check <img src="logo.png" alt="" />
          </Link>
        ) : (
          <Link className="d-flex navbar-brand " to={"/"}>
            Check <img src="logo.png" alt="" />
          </Link>
        )}

        <Nav className="" navbar>
          {authenticated ? (
            <div className=" d-flex align-items-center gap-3 ">
              <Link className="btn btn-success" onClick={handlerLogout}>
                Sair
              </Link>
            </div>
          ) : (
            <Link className="btn btn-success py-2 px-3 fw-semibold" to="/login">
              Entrar
            </Link>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavbarLayout;
