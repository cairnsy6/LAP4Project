import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { URL } from "../../serverUrl";
import { NavBar } from "../../components";

function EditProfile() {
  const userDetails = useSelector((state) => state.currentUser);

  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    if (form.password.value !== form.confirmpassword.value) {
      setError("Please ensure your passwords match");
    } else {
      try {
        const options = {
          method: "POST",
          body: {
            username: form.username.value,
            password: form.password.value,
          },
          headers: { "Content-type": "application/json" },
        };
        const response = await fetch(`${URL}/users/${id}`, options);
        const data = await response.json();
        // do I need to convert it to json when I'm not displaying it? ^
        navigate(`/profile`, { replace: true });
      } catch (error) {
        console.warn(error);
      }
    }
  };
  // check the body keys in right format (server)
  // maybe /users/id
  // this fetch won't work until server up
  return (
    <div>
      <NavBar />
      <h1>Update your profile {userDetails.username}</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Name</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="password-confirm">Confirm password</label>
        <input type="password" name="passwordconfirm" id="passwordconfirm" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditProfile;
