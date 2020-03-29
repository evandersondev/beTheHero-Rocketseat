import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

import { FiPower, FiTrash2 } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";

export default () => {
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  const [cases, setCases] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setCases(response.data);
      });
  }, [ongId]);

  const handleDeleteCase = async id => {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setCases(cases.filter(item => item.id !== id));
    } catch (err) {
      alert("Error to delete, try again!");
    }
  };

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("ongName");
    localStorage.removeItem("ongId");
    history.push("/");
  };

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Welcome, {ongName}</span>

        <Link className="button" to="/incidents/new">
          add new cases
        </Link>
        <button onClick={logout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Cases saved</h1>

      <ul>
        {cases.map(item => (
          <li key={item.id}>
            <strong>CASE:</strong>
            <p>{item.title}</p>

            <strong>DESCRIPTION</strong>
            <p>{item.description}</p>

            <strong>VALUE</strong>
            <p>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(item.value)}
            </p>

            <button onClick={() => handleDeleteCase(item.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
