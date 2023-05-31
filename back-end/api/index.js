const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const userSchema = require("./user/schema/user.graphql");
const userResolvers = require("./user/resolvers/userResolvers");
const UserAPI = require("./user/datasource/user");
const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const typeDefs = [userSchema];
const resolvers = [userResolvers];

const app = express();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    usersAPI: new UserAPI(),
  }),
  introspection: true,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/" });

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`MongoDB connected`);
      app.listen({ port: process.env.PORT || 5001 }, () => {
        console.log(`Server listening at ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

startServer();