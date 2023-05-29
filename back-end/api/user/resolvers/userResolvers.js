const { GraphQLScalarType } = require('graphql'); 

const userResolvers = {
    respostaCustom :{
        __resolveType(obj, context, info) {
            return false
          },
    },

    DateTime: new GraphQLScalarType({
        name: "DateTime",
        description: "String de data e hora no formato ISO-8601",
        serialize: (value) => new Date(value).toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
    }), 

    Query:{
        users: async (root, args, { dataSources } ) => {
            return await dataSources.usersAPI.getUsers()
        },
        userById: async (root, { id }, { dataSources }) => {
            return await dataSources.usersAPI.getUserById(id)
        },
    },

    Mutation: {
        addUser: async (root, { user }, { dataSources} ) => {
            return await dataSources.usersAPI.addUser(user)
        }, 

        updateUser: async (root, {id, user}, { dataSources } ) => {
            return await dataSources.usersAPI.updateUser(id, user)
        },

    
    }
};

module.exports = userResolvers;