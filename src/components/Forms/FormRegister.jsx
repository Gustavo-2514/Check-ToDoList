import { Container } from "reactstrap";
import AuthInput from "../Inputs/AuthInput/Authinput";
import { useContext, useRef, useState } from "react";
import { Context, useContextProvider } from "../../context/useContext";
import { Link, useNavigate } from "react-router-dom";
import { cleanErrors } from "../../helpers/cleanErrors";
import Terms from "../Alert";

export default function FormRegister() {
  const userDefault = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(userDefault);
  const errorsRef = useRef([]);
  const { register } = useContextProvider();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cleanErrors(errorsRef.current);
    const verifyExistsError = await register(user, navigate);

    if (verifyExistsError) {
      const error = verifyExistsError.error;
      if (error.includes("Email")) {
        errorsRef.current[0].style.border = "1px solid red";
        errorsRef.current[1].textContent = error;
        setUser((user) => {
          return { ...user, password: "", confirmPassword: "" };
        });
      } else {
        errorsRef.current[2].style.border = "1px solid red";
        errorsRef.current[3].textContent = error;
        setUser((user) => {
          return { ...user, password: "", confirmPassword: "" };
        });
      }
    }
  };

  return (
    <Container className="registerContainer">
      <div
        style={{ borderRadius: "15px" }}
        className=" containerForm bg-success py-4"
      >
        <h3 className="text-center text-light pb-2">Seja Bem-vindo!</h3>
        <form className="formRegister" onSubmit={handleSubmit}>
          <AuthInput
            htmlFor={"name"}
            labelText={"Nome"}
            type={"text"}
            placeholder={"Digite seu nome"}
            value={user.name}
            handleOnChange={handleChange}
            minCharacters={3}
          />
          <AuthInput
            htmlFor={"email"}
            labelText={"Email"}
            type={"email"}
            placeholder={"Digite seu email"}
            value={user.email}
            handleOnChange={handleChange}
            reference={(e) => (errorsRef.current[0] = e)}
          />

          <span
            className="text-danger"
            ref={(e) => (errorsRef.current[1] = e)}
          ></span>

          <AuthInput
            htmlFor={"password"}
            labelText={"Senha:"}
            type={"password"}
            placeholder={"Digite sua senha"}
            value={user.password}
            handleOnChange={handleChange}
            minCharacters={8}
          />
          <AuthInput
            htmlFor={"confirmPassword"}
            labelText={"Confirme sua senha"}
            type={"password"}
            placeholder={"Corfirme sua senha"}
            value={user.confirmPassword}
            handleOnChange={handleChange}
            minCharacters={8}
            reference={(e) => (errorsRef.current[2] = e)}
          />

          <span
            className="text-danger"
            ref={(e) => (errorsRef.current[3] = e)}
          ></span>

          <button className="btn btn-success" type="submit">
            Registrar
          </button>
          <span className="text-center">
            Já tem uma conta ?{" "}
            <Link className="text-success" to={"/login"}>
              Entrar
            </Link>
          </span>

          <Terms
            text={
              "Por favor, ao se cadastrar, evite o uso de informações pessoais sensíveis. Recomendamos utilizar dados de teste, pois esta aplicação é de código aberto e destinada a servir como um portfólio, visando a proteção da sua privacidade!"
            }
          />
        </form>
      </div>
    </Container>
  );
}
