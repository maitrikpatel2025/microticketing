import Router from "next/router";
import Link from "next/link";
import { useState } from "react";

import useRequest from "../../hooks/use-request";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="justify-content-center  p-5 shadow-lg p-3 m-5 bg-white rounded">
          <div className="row mb-4">
            <h2 className="col d-flex justify-content-center">Welcome Back</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center"></div>
          </div>
          {errors}
          <div className="text-center">
          <button className="btn btn-dark btn-block"><i className="bi bi-box-arrow-in-right"></i> Sign In</button>
            <p className="mt-3">
              not a member <Link href="/auth/signup"> sign up</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default signup;
