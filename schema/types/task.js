const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');

const TaskStatusType = require('./task_status');

module.exports = new GraphQLObjectType({
    name: 'taskType',
    fields: {
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
        status: { type: GraphQLString },
        assignedto: { type: new GraphQLNonNull(GraphQLInt) },
        // status: { type: new GraphQLNonNull(TaskStatusType) },
    },
});
