import React from "react";
import Layout from "./components/Layout/Layout";
import { Toaster, toast } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Layout />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
