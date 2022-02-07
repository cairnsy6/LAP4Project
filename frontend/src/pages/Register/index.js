import React from "react";
import { NavBar } from "../../components";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const options = {
        method: "POST",
        body: {
          username: e.target.form.username.value,
          password: e.target.form.password.value,
          email: e.target.form.email.value,
          passwordconfirm: e.target.form.passwordconfirm.value,
        },
        headers: { "Content-type": "application/json" },
      };

      const response = await fetch(
        `http://test-django-34.herokuapp.com/users`,
        options
      );

      const data = await response.json();
      // need this?
      navigate(`/profile`, { replace: true });
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <div>
      <NavBar />
      <h1>Register</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Name</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="passwordconfirm">Confirm password</label>
        <input type="password" name="passwordconfirm" id="passwordconfirm" />
        <p>Account type:</p>
        <label htmlFor="personal-account">Personal</label>
        <input
          type="radio"
          name="account-type"
          id="personal-account"
          value="personal-account"
        />
        <label htmlFor="business-account">Business</label>
        <input
          type="radio"
          name="account-type"
          id="business-account"
          value="business-account"
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
