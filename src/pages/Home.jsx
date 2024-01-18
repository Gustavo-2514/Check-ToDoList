import { Container } from "reactstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Container className="mt-5  text-light text-center">
        <section className="pb-3">
          <h1 className="titleHome mb-5">
            Organize sua Vida, uma Tarefa de Cada Vez!
          </h1>
          <p className="paragraphHome">
            Bem-vindo ao seu novo parceiro na jornada da produtividade!
            Acreditamos que uma lista de tarefas bem gerenciada é a chave para
            desbloquear seu potencial máximo. Imagine alcançar seus objetivos,
            grandes ou pequenos, com facilidade e eficiência. Com a nossa
            plataforma intuitiva e poderosa, você pode fazer exatamente isso.
          </p>
        </section>

        <Container className="containerHome d-flex ">
          <Container className="">
            <img className="img-fluid" src="check.png" width={420}></img>
          </Container>

          <Container className=" d-flex flex-column gap-4">
            <span
              className="mt-5"
              style={{
                fontSize: "26px",
                fontWeight: "100",
                textDecoration: "underline",
                textDecorationThickness: "1px",
              }}
            >
              Ainda não possui conta?
            </span>
            <Link className="homeBtn btn btn-success" to={"/register"}>
              Comece Gratuitamente
            </Link>
          </Container>
        </Container>
      </Container>
    </>
  );
}
