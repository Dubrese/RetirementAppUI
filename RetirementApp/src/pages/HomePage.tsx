import React, { useState } from "react";
import UserInputForm from "../components/UserInputForm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "../components/navbar/NavBar"

function HomePage() {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID + ".apps.googleusercontent.com"}>
      <NavBar user={user} setUser={setUser}/>
      <UserInputForm />
    </GoogleOAuthProvider>
  );
}

export default HomePage;
