import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ChecklistsUser from "../pages/checklist/ChecklistsUser";
import ViewChecklist from "../pages/checklist/ViewChecklist";
import { useContextProvider } from "../context/useContext";
import { useEffect } from "react";
import FormChecklist from "../pages/checklist/FormChecklist";
import FormTask from "../pages/task/FormTask";
import ErrorElement from "../components/ErrorElement";
import ErrorPage from "../pages/ErrorPage";

function CheckAuthenticatedIsTrue({ element }) {
  const navigate = useNavigate();
  const { authenticated } = useContextProvider();
  useEffect(() => {
    if (!authenticated) {
      navigate("/login", { replace: true });
    }
  }, [authenticated, navigate]);

  return authenticated ? element : null;
}

function CheckAuthenticatedIsFalse({ element }) {
  const navigate = useNavigate();
  const { authenticated } = useContextProvider();
  useEffect(() => {
    if (authenticated) {
      navigate("/user/checklists", { replace: true });
    }
  }, [authenticated, navigate]);

  return authenticated ? null : element;
}

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <CheckAuthenticatedIsFalse element={<Home />} />,
          errorElement: <ErrorElement />,
        },
        {
          path: "/user/checklists",
          element: <CheckAuthenticatedIsTrue element={<ChecklistsUser />} />,
          errorElement: (
            <ErrorElement textError={"Erro ao exibir Listas de Tarefas"} />
          ),
        },
        {
          path: "/user/checklist/:checklistId",
          element: <CheckAuthenticatedIsTrue element={<ViewChecklist />} />,
        },
        {
          path: "user/checklist/create",
          element: (
            <CheckAuthenticatedIsTrue
              element={
                <FormChecklist
                  label={"Criar lista de Tarefas"}
                  textBtn={"Criar"}
                />
              }
            />
          ),
        },
        {
          path: "/user/checklist/:checklistId/update",
          element: (
            <CheckAuthenticatedIsTrue
              element={
                <FormChecklist
                  label={"Atualizar lista de Tarefas"}
                  textBtn={"Atualizar"}
                />
              }
            />
          ),
        },
        {
          path: "user/checklist/:checklistId/task/create",
          element: (
            <CheckAuthenticatedIsTrue
              element={<FormTask label={"Criar Tarefa"} textBtn={"Criar"} />}
            />
          ),
        },
        {
          path: "user/checklist/:checklistId/task/:taskId/update",
          element: (
            <CheckAuthenticatedIsTrue
              element={
                <FormTask label={"Atualizar Tarefa"} textBtn={"Atualizar"} />
              }
            />
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <CheckAuthenticatedIsFalse element={<Login />} />,
    },
    {
      path: "/register",
      element: <CheckAuthenticatedIsFalse element={<Register />} />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
