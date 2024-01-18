import { useEffect, useState } from "react";
const url = import.meta.env.VITE_API_URL;

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("token") || false
  );

  const verifyAuthentication = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setAuthenticated(false);
      return;
    }

    const response = await fetch(
      url + `/${JSON.parse(userId)}/checkAuthorization`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }
    );
    if (response.status === 403 || response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      const data = await response.json()
      console.log(data)
      setAuthenticated(false);
      return;
    }

    const data = await response.json();

    setAuthenticated(data);
  };

  useEffect(() => {
    verifyAuthentication();
  }, []);

  async function login(user, navigate) {
    const response = await fetch(url + "/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (data.error) {
      return data;
    }

    if (data.token) {
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userId", JSON.stringify(data.userId));

      setAuthenticated(true);

      navigate(`/user/checklists`, { replace: true });
    }
  }

  async function register(user, navigate) {
    const response = await fetch(url + "/register", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (data.error) {
      return data;
    }

    if (data.token && data.userId) {
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userId", JSON.stringify(data.userId));
      setAuthenticated(true);
      navigate(`/user/checklists`);
    }
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  async function createChecklist(token, userId, checklistObj, navigate) {
    try {
      await fetch(`${url}/${userId}/checklist/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(checklistObj),
      });

      navigate(`/user/checklists`);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateChecklist(
    token,
    userId,
    checklistId,
    checklistObj,
    navigate
  ) {
    try {
      await fetch(`${url}/${userId}/checklist/${checklistId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(checklistObj),
      });

      navigate("/user/checklists");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteChecklist(token, userId, checklistId) {
    try {
      const response = await fetch(
        `${url}/${userId}/checklist/${checklistId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.log(error);
    }
  }

  async function createTask(token, userId, checklistId, taskObj, navigate) {
    try {
      await fetch(`${url}/${userId}/checklist/${checklistId}/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskObj),
      });

      navigate(`/user/checklist/${checklistId}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  const updateDone = async (
    token,
    checklist,
    userId,
    checklistId,
    taskId,
    index
  ) => {
    try {
      const done = { done: !checklist.taskId[index].done };
      const response = await fetch(
        `${url}/${userId}/checklist/${checklistId}/task/${taskId}/updateDone`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(done),
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  async function updateTask(
    token,
    userId,
    checklistId,
    taskId,
    taskObj,
    navigate
  ) {
    try {
      const teste = await fetch(
        `${url}/${userId}/checklist/${checklistId}/task/${taskId}/updateTitle`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskObj),
        }
      );

      navigate(`/user/checklist/${checklistId}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteTask(token, userId, checklistId, taskId) {
    try {
      const response = await fetch(
        `${url}/${userId}/checklist/${checklistId}/task/${taskId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const checklist = await response.json();
      return checklist;
    } catch {
      return error.message;
    }
  }

  return {
    authenticated,
    login,
    register,
    logout,
    createChecklist,
    updateChecklist,
    deleteChecklist,
    createTask,
    updateTask,
    updateDone,
    deleteTask,
  };
}
