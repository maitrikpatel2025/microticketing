{
  /* <thead className="thead-dark">
            <tr>
              <th scope="col">Ticket Title</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
           */
}

const OrderIndex = ({ orders }) => {
  return (
    <div className="container p-5 shadow-lg p-3 m-5">
        <h2 className="col d-flex justify-content-center bg-dark text-white border rounded border-2 p-3">
        My Orders
      </h2>
      <table className="table table-striped rounded mt-3">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Ticket Title</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>{order.ticket.price}</td>
                <td>{order.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
