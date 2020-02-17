const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
} = require('graphql');

const pgdb = require('../../database/pgdb');
const TaskType = require('./task');

module.exports = new GraphQLObjectType({
    name: 'MeType',

    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        fullName: {
            type: GraphQLString,
            resolve: (obj) => `${obj.firstName} ${obj.lastName}`,
        },
        department: { type: GraphQLString },
        apikey: { type: GraphQLString },
        active: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLString },
        task: {
            type: new GraphQLList(TaskType),
            resolve(obj, args, { pgPool }) {
                return pgdb(pgPool).getTasks(obj);
            },
        },
    },
});
