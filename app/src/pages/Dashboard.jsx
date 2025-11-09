import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import api from "../config/api";

export default function Dashboard() {
  const { authState } = useAuth();
  const [dashboardText, setDashboardText] = useState("");

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => {
        setDashboardText(res.data.text);
      })
      .catch((error) => {
        let dadosRetorno = error.response.data;

        console.log(dadosRetorno);
      });
  }, []);

  return (
    <div>
      <h2 id="dashboard-title">Olá, {authState.user?.name}!</h2>
      <p>{dashboardText}</p>
    </div>
  );
}
