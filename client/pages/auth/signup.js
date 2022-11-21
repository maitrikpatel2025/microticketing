import Router from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from "./signup.module.css";
import useRequest from "../../hooks/use-request";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
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
    <div>
      <form onSubmit={onSubmit}>
        <div className={styles.container}>
          <div className="row mb-4">
            <h2 className="col d-flex justify-content-center">Sign Up</h2>
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
          <button className={styles.submitButton}>Sign Up</button>

          <div className="text-center">
            <p>
              already a member  
              <Link href="/auth/signin">sign in</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default signup;
