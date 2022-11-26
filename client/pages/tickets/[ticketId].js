import useRequest from "../../hooks/use-request";
import Router from "next/router";
const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  return (
    <div className="container">
      <h2 className="col d-flex justify-content-center text-dark border rounded border-2 m-2 p-3">
        " The golden ticket of offers is here "
      </h2>
      <div>
        <div className="card text-center rounded">
          <div className="card-header">Featured Ticket</div>
          <div className="card-body">
            <h5 className="card-title">{ticket.title}</h5>
            <p className="card-text">
              Get your ticket at
              <span className="text-primary"> $ {ticket.price}</span>
            </p>
            <button onClick={() => doRequest()} className="btn btn-dark">
              <i className="bi bi-bag"></i> Buy Now
            </button>
          </div>
          <div className="card-footer text-muted">Just a one click away</div>
        </div>
      </div>
      <div className="p-3">{errors}</div>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};

export default TicketShow;
