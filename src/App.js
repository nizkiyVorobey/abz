import React, { useState, useEffect } from "react";
import "./App.scss";
import "./reset.scss";
import { Header } from "./components/Header/Header";
import { InitialBanner } from "./components/InitialBanner/InitialBanner";
import { Acquainted } from "./components/Acquainted/Acquainted";
import { OurUsers } from "./components/OurUsers/OurUsers";
import { Register } from "./components/Register/Register";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [lastPage, setLastPage] = useState(false)

  return (
    <div className="app">
      <header>
        <Header />
      </header>
      <InitialBanner />
      <Acquainted />
      <OurUsers
        userList={userList}
        setUserList={setUserList}
        lastPage={lastPage}
        setLastPage={setLastPage}
      />
      <Register setUserList={setUserList} userList={userList} />
    </div>
  );
}

export default App;
