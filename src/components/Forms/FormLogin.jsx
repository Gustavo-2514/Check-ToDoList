import { Container } from "reactstrap";
import AuthInput from "../Inputs/AuthInput/Authinput";
import { useRef, useState } from "react";
import { useContextProvider } from "../../context/useContext";
import { Link, useNavigate } from "react-router-dom";
import { cleanErrors } from "../../helpers/cleanErrors";

export default function FormLogin() {
  const navigate = useNavigate();
  const userDefault = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userDefault);
  const { login } = useContextProvider();

  const errosRef = useRef([]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cleanErrors(errosRef.current);
    const verifyExistsError = await login(user, navigate);

    if (verifyExistsError) {
      const error = verifyExistsError.error;
      if (error.includes("Usuário")) {
        errosRef.current[0].style.border = "1px solid red";
        errosRef.current[1].textContent = error;
      } else if (error.includes("Senha")) {
        errosRef.current[2].style.border = "1px solid red";
        errosRef.current[3].textContent = error;
      }
    }
  };

  return (
    <>
      <Container className="loginContainer">
        <div
          style={{ borderRadius: "15px" }}
          className="containerForm bg-success py-4 "
        >
          <h4 className="text-center text-light pb-2">
            Seja bem vindo novamente!
          </h4>
          <form className="formLogin " onSubmit={handleSubmit}>
            <AuthInput
              htmlFor={"email"}
              labelText={"Email:"}
              type={"email"}
              placeholder={"Digite seu email"}
              reference={(e) => (errosRef.current[0] = e)}
              handleOnChange={handleChange}
            />

            <span
              className="text-danger"
              ref={(e) => (errosRef.current[1] = e)}
            ></span>

            <AuthInput
              htmlFor={"password"}
              labelText={"Senha:"}
              type={"password"}
              placeholder={"Digite sua senha"}
              reference={(e) => (errosRef.current[2] = e)}
              handleOnChange={handleChange}
            />

            <span
              className="text-danger"
              ref={(e) => (errosRef.current[3] = e)}
            ></span>

            <button
              type="submit"
              onSubmit={handleSubmit}
              className="btn btn-success"
            >
              Entrar
            </button>

            <span className="text-center">
              Ainda não possui conta ?{" "}
              <Link to={"/register"} className=" text-success">
                Cadastrar
              </Link>
            </span>
          </form>
        </div>
      </Container>
    </>
  );
}
