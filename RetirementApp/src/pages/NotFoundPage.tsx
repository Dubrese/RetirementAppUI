import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <div>NotFoundPage</div>
      <Link to="/">go to Home</Link>
    </>
  );
}

export default NotFoundPage;
