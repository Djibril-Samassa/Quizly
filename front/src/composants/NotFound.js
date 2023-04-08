import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <div style={{
        backgroundColor: '#f1f1f1',
        padding: "2em",
        width: '50%',
        margin: "2em auto",
        borderRadius: '10px'
      }}>
        <h1>Erreur 404</h1>
        <h2>La page que vous cherchez n'existe pas :(</h2>
        <div>
          <a className="yellow button" href="/">
            Revenir à la page d'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
