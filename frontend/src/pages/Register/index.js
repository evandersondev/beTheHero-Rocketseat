import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  const handleRegister = async e => {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post("/ongs", data);
      alert(`Your ID de access: ${response.data.id}`);
      history.push("/");
    } catch (err) {
      alert(`Something don't be right, please try again!`);
    }
  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Sign up</h1>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Already account? Sing in
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Name the of ONG"
          />
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="E-mail"
          />
          <input
            onChange={e => setWhatsapp(e.target.value)}
            value={whatsapp}
            placeholder="Whatsapp"
          />

          <div className="input-group">
            <input
              onChange={e => setCity(e.target.value)}
              value={city}
              placeholder="City"
            />
            <input
              onChange={e => setUf(e.target.value)}
              value={uf}
              placeholder="UF"
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
