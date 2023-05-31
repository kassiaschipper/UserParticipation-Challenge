const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const userSchema = require("./user/schema/user.graphql");
const userResolvers = require("./user/resolvers/userResolvers");
const UserAPI = require("./user/datasource/user");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const typeDefs = [userSchema];
const resolvers = [userResolvers];

const app = express();
app.use(bodyParser.json())

const corsOptions = {
    origin: "https://user-participation-challenge.vercel.app/", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Authorization",
    credentials: true,
    optionsSuccessStatus: 200, 
  };

app.use(cors(corsOptions));
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    usersAPI: new UserAPI(),
  }),
  introspection: true,
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://user-participation-challenge.vercel.app/");
    next();
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/api/graphql" });

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`MongoDB connected`);
      httpServer.listen({ port: process.env.PORT || 5001 }, () => {
      //app.listen({ port: process.env.PORT || 5001 }, () => {
        console.log(`Server listening at ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

startServer();