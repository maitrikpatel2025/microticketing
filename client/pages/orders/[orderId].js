import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => console.log(payment),
  });
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return (
      <div>
        <div className="container">
          <h2 className="col d-flex p-4 justify-content-center text-dark ">
            Oooops!!! Sorry your order expired
          </h2>
          <h2 className="col d-flex p-4 justify-content-center text-dark ">
            Please Try Again
          </h2>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="container">
        <h2 className="col d-flex p-4 justify-content-center text-dark ">
          Payment
        </h2>
        <div>
          <div className="card text-center rounded">
            <div className="card-body">
              <h5 className="card-title">{order.ticket.title}</h5>
              <p className="card-text">
                You have
                <span className="text-danger"> {timeLeft} </span>
                seconds left to Pay
              </p>
              <StripeCheckout
                token={({ id }) => doRequest({ token: id })}
                stripeKey="pk_test_51M7U36AYBoDHrmOdCpD9rdztpG1KUADkwriwdFUDQTv3XASPCY5Nt6NV4qGftSlpZLRHlwf5yLvGhLgyrWAw467q002NGJ6rN5"
                amount={order.ticket.price * 100}
                email={currentUser.email}
              />
            </div>
          </div>
        </div>
        <div className="p-3"> {errors}</div>
      </div>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
