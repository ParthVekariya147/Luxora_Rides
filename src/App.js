import React from "react";
import Layout from "./components/Layout/Layout";
import { Toaster, toast } from "react-hot-toast";

function App() {
  return (
    <>
      <Layout />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
