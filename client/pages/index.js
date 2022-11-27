import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <div className="col-sm-6 p-3" key={ticket.id}>
        <div className="card bg-light border-dark">
          <div className="card-header">Seek. Find. Enjoy.</div>
          <div className="card-body">
            <h5 className="card-title">{ticket.title}</h5>
            <p className="card-text font-weight-bold">
              Ticket Available Now at
              <span className="text-primary"> $ {ticket.price}</span>
            </p>
            <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
              <button className="btn btn-dark btn-block">
                <i className="bi bi-ticket-perforated lg"></i> View Ticket
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container mt-5">
      <h2 className="col d-flex justify-content-center text-dark border rounded border-2 m-2 p-3">
        " Make Someone Happy With Tickets "
      </h2>
      <h3 className="col p-1 text-dark">Recently Added </h3>
      <div className="row  p-2">{ticketList}</div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
// LandingPage.getInitialProps = async ({req}) => {
//   if (typeof window === 'undefined') {
//     // we are on the server!
//     // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
//     const { data } = await axios.get(
//       'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
//       {
//         headers: req.headers
//       }
//     );

//     return data;
//   } else {
//     // we are on the browser!
//     // requests can be made with a base url of ''
//     const { data } = await axios.get('/api/users/currentuser');

//     return data;
//   }
//   return {};
// };
