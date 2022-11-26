import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };
  const onBlur = async () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="justify-content-center p-2 shadow-lg  m-5 bg-white rounded">
          <h2 className="col d-flex justify-content-center text-dark border rounded border-2 m-2 p-3">
            Create A New Ticket
          </h2>
        </div>
        <div className="justify-content-center  p-5 shadow-lg p-3 m-5 bg-white rounded">
          <div className="row mb-4"></div>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price</label>
            <input
              type="price"
              onBlur={onBlur}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center"></div>
          </div>
          {errors}
          <button className="btn btn-dark btn-block">
            {" "}
            <i className="bi bi-plus-square"></i> Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
