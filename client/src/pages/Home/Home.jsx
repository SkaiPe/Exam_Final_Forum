import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/question`)
      .then((resp) => resp.data)
      .then((response) => {
        setAllQuestions(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? <div>Kraunasi...</div> : ""}
      {allQuestions.map((item, index) => (
        <div className="question" key={index}>
          <div>Vartotojas: {item.name}</div>
          <div>{item.date}</div>
          <div>{item.text}</div>
          <div>{item.edited ? "Redaguota" : ""}</div>
        </div>
      ))}
    </div>
  );
};

export default Home;
