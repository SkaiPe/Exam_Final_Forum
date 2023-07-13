import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import EditPost from "../../components/EditPost";

const Home = () => {
  const [allQuestions, setAllQuestions] = useState([]);

  const [editInputId, setEditInputId] = useState(-1);

  const [loading, setLoading] = useState(false);

  const [filterDate, setFilterDate] = useState("dsc");
  const [editedText, setEditedText] = useState("");

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/question?filterDate=${filterDate}`)
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
  }, [filterDate]);

  const deleteQuestion = async (questionId) => {
    try {
      await axios
        .delete(`http://localhost:3000/question/${questionId}`)
        .then(() => window.location.reload());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        Filtruoti pagal:
        <button onClick={() => setFilterDate("dsc")}>Naujausi</button>
        <button onClick={() => setFilterDate("asc")}>Seniausi</button>
      </div>
      {loading ? <div>Kraunasi...</div> : ""}
      {allQuestions.map((item, index) => (
        <div className="question" key={index}>
          <div onClick={() => navigate(`/question/${item._id}`)}>
            {" "}
            <div>Vartotojas: {item.name}</div>
            <div>{item.date}</div>
            <div>{item.text}</div>
            <div>{item.edited ? "Redaguota" : ""}</div>
          </div>

          {user && (
            <div>
              <button type="button" onClick={() => deleteQuestion(item._id)}>
                Ištrinti
              </button>
              <button type="button" onClick={() => setEditInputId(index)}>
                Redaguoti
              </button>
              <button
                type="button"
                onClick={() => navigate(`/question/${item._id}`)}
              >
                Komentuoti
              </button>

              {index === editInputId ? (
                <EditPost
                  item={item}
                  editedText={editedText}
                  setEditedText={setEditedText}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
