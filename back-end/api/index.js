const { ApolloServer } =  require('apollo-server');
const mongoose = require('mongoose');
const userSchema = require("./user/schema/user.graphql");
const userResolvers = require("./user/resolvers/userResolvers");
const UserAPI = require('./user/datasource/user')
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const typeDefs = [userSchema];
const resolvers = [userResolvers];

const server = new ApolloServer({
    typeDefs,
    resolvers, 
    dataSources: () => {
        return {
            usersAPI: new UserAPI()
        }
    }
});

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     })
    .then(()=> {
        console.log(`MongoDB connected`);
        return server.listen({ port: Number.parseInt(process.env.PORT) || 5001});
    })
    .then((res) => {
        console.log(`Server lintening at ${res.url}}`)
    })
    .catch(err => {
        console.log(err.message);
    });


