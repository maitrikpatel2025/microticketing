<div align="center" style="margin-bottom:20px">
  <img src="/client/assets/microticket.png" alt="booking-microservices" />
    <div align="center">
           <a href="https://github.com/meysamhadeli/booking-microservices/actions/workflows/dotnet.yml"><img alt="build-status" src="https://github.com/meysamhadeli/booking-microservices/actions/workflows/dotnet.yml/badge.svg?branch=main&style=flat-square"/></a>
         <a href="https://gitpod.io/#https://github.com/meysamhadeli/booking-microservices"><img src="https://img.shields.io/badge/Gitpod-live--code-blue?logo=gitpod&style=flat-square&color=ff69b4"/></a>
                 <a href="https://github.com/meysamhadeli/booking-microservices/blob/main/LICENSE"><img alt="build-status"          src="https://img.shields.io/github/license/meysamhadeli/booking-microservices?color=%234275f5&style=flat-square"/></a>
    </div>
</div>

> **The major goal of this project is to incorporate the newest technology and architecture, in a distributed system infrastructure. The app is made up of 6 distinct services that work together asynchronously. Services are developed with NextJS (front-end), Express and MongoDB (back-end), and NATS Streaming Server to communicate via events. All of these components run on NodeJS and are written in TypeScript. Each service has its own Docker container, which Kubernetes is in charge of managing. The ingress-nginx controller is used for routing. I won't talk mostly about business.** 🚀

## Overview

Created a multi-service application from scratch. Analyze whether a microservices approach is a good fit for your app. Recognize and address the issues with async, event-based service communication. A multi-service app can be deployed to any cloud provider using Docker and Kubernetes. Enhance the productivity and reuse of code in huge projects.


### Functionality

App has tickets for events (concerts, sporting events, etc.) can be listed for sale by users. This ticket may be purchased by other users. Anyone with an account can sell tickets and buy tickets. The ticket is "locked" for three minutes when a user tries to buy it. To submit their payment information, the user has three minutes. No other user may buy the ticket while it is locked. The ticket should 'unlock' after 3 minutes. If a ticket's price is not locked, it can be changed and for handling credit card payments the app uses Stripe API.

### Architecture

The app is made up of 6 distinct services that interact asynchronously with one another. TypeScript is used to create the services, which are created with NextJS for the front end, Express and MongoDB for the back end, and NATS Streaming Server for event-based communication. Every service has a separate Docker container that is controlled by Kubernetes. It uses the "ingress-nginx" controller for routing.

The shared library '@microticketingapp/common', which is a dependency on all services, contains all essential type definitions. This repository also includes this shared library as a submodule.

List of microservices:

- `client` - Service responsible for the front-end.
- `auth` - Service responsible for authentication.
- `tickets` - Service responsible tickets.
- `orders` - Service responsible for orders.
- `payments` - Service managing payments.
- `expiration` - Service handling an order expiration time.

Kubernetes and Docker help to containarize all the services and orchastrate them. Each service contains a dockerfile whilst the infra folder contains all the kubernetes manifests for deployments, services, ingress, secrets etc

![image](https://user-images.githubusercontent.com/59853047/204151825-3c429811-c8d4-4f24-a3d8-4220ca414ee0.png)

### Deployment

The project uses Skaffold to manage all the Docker containers inside the Kubernetes cluster and streamline the development process.

Make sure Docker, Kubernetes, and Skaffold are installed on your local PC in order to run the app in a development environment.

The Kubernetes cluster's environment variables must be set before the app can run. Run the following commands to set the following environment variables:

```bash
# kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=<your_stripe_key>

# kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<your_jwt_key>

```

Be sure to expose the ingress-nginx-controller with:

```bash
# kubectl expose deployment ingress-nginx-contoller --target-port=80 --type=NodePort -n kube-system
```

Start the app with `skaffold dev`.

### Support

If you like my work, feel free to:

- ⭐ this repository. And we will be happy together :)

Thanks a bunch for supporting me!

### Credit
(https://www.udemy.com/course/microservices-with-node-js-and-react/)

A massive thanks for a great course! thanks Stephen! I'm planning on starting a project from scratch using this project as a guide to really cement some of the information we've covered here.
