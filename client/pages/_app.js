import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import builtClient from "../api/built-client";
import Header from "../components/Header.js";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Head>
        <meta name="title" content="Microticketing " />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../favicon_package/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../favicon_package/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../favicon_package/favicon-16x16.png"
        />
        <link rel="manifest" href="../favicon_package/site.webmanifest" />
        <link
          rel="mask-icon"
          href="../favicon_package/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta name="robots" content="noindex, nofollow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes"
        />
        <meta
          name="keywords"
          content="Event-Based Architecture, Server side rendering with React, Scalable, production-ready code, Node, React, Docker and Kubernetes, Redis, Typescript, JWT-based authentication"
        />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Header currentUser={currentUser} />
      <div className="container"></div>
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};
AppComponent.getInitialProps = async (appContext) => {
  const client = builtClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
