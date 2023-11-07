import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AddProof } from "./Add-Proof";
import App from "./App";
import { ProofView } from "./Proof-View";
import { View } from "./View";
import "./index.css";

import { ViewAllMembers } from "./screens/view-team/view-members.screen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={App} /> 
      <Route path="/add-proof/:nsid" Component={AddProof} />
      <Route path="/view/:nsid" Component={View} />
      <Route path="/proof-view/:nsid" Component={ProofView} />
      <Route path="/all-members" Component={ViewAllMembers} />
    </Routes>
  </BrowserRouter>
);
