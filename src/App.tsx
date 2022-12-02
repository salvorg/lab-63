import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import About from "./containers/About/About";
import Contacts from "./containers/Contacts/Contacts";
import PostForm from "./containers/PostForm/PostForm";

function App() {

  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={(<Home/>)}>
            <Route path=":id" element={(<PostForm/>)}/>
          </Route>
          <Route path="/new-post" element={(<PostForm/>)}/>
          <Route path="/about" element={(<About/>)}/>
          <Route path="/contacts" element={(<Contacts/>)}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
