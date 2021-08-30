import Layout from "./Container/Layout";
import "./App.css";
import React from "react";
import Header from "./Component/Header/Header";
const App = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Layout />
    </React.Fragment>
  );
};

export default App;
