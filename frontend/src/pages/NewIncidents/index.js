import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

export default () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  const handleAdd = async e => {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("/incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch (err) {
      alert("Error to add new incidents!");
    }
  };

  return (
    <div className="incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Add new case</h1>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Back home
          </Link>
        </section>
        <form onSubmit={handleAdd}>
          <input
            onChange={e => setTitle(e.target.value)}
            value={title}
            placeholder="Title of case"
          />
          <textarea
            onChange={e => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
          />
          <input
            onChange={e => setValue(e.target.value)}
            value={value}
            placeholder="Value in real (BR)"
          />

          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
