import React from "react";
import { Route, Routes } from "react-router-dom";
import Providers from "./context/Providers";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import CreateQuestion from "./pages/CreateQuestion";

const App = () => {
  return (
    <Providers>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/question" element={<CreateQuestion />} />
      </Routes>
    </Providers>
  );
};

export default App;

// import { useState, useEffect } from "react";

// const App = () => {
//   const [questions, setQuestions] = useState([]);
//   const [sort, setSort] = useState("asc");

//   useEffect(() => {
//     fetch(`http://localhost:3000/questions?sort=${sort}`)
//       .then((resp) => resp.json())
//       .then((response) => {
//         setQuestions(response);
//       });
//   }, [sort]);

//   return (
//     <div>
//       <button
//         onClick={() => setSort("asc")}
//         style={{ background: sort === "asc" ? "red" : "white" }}
//       >
//         ascending
//       </button>
//       <button
//         onClick={() => setSort("dsc")}
//         style={{ background: sort === "dsc" ? "red" : "white" }}
//       >
//         descending
//       </button>
//       {questions.map((post) => (
//         <div key={post._id}>
//           {post.name} date: {post.date}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;
