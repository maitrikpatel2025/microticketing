import buildClient from "../api/built-client";


const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>
      Your are signed in 
    </h1>
  ): (
    <h1>
      Your are Not Sign in
    </h1>
  )

};


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
LandingPage.getInitialProps = async context => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};
export default LandingPage;
