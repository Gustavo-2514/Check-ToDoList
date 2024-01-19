import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function Terms({ text }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <div className=" d-flex justify-content-center">
      <Button className=" d-flex" color="warning" onClick={toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
          viewBox="0 0 16 16"
          role="img"
          aria-label="Warning:"
          width={'22px'}
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        Termos de Uso
      </Button>
      <Modal isOpen={modal} >
        <ModalHeader className="text-danger justify-content-center" >AVISO IMPORTANTE!</ModalHeader>
        <ModalBody className="fs-5">{text}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Entendido
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
