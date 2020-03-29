import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

import { FiLogIn } from "react-icons/fi";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default () => {
  const [id, setId] = useState("");

  const history = useHistory();

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await api.post("/session", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Error on login, try again!");
    }
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Heroes" />

        <form onSubmit={handleLogin}>
          <h1>Faca seu Logon</h1>

          <input
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Sua ID"
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register">
            <FiLogIn size={16} color="#E02041" />
            Nao tenho cadastro
          </Link>
        </form>
      </section>

      <img className="heroesImg" src={heroesImg} alt="Heroes" />
    </div>
  );
};
