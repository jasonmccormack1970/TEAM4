const { GraphQLEnumType } = require('graphql');

module.exports = new GraphQLEnumType({
    name: 'TaskStatusType',

    values: {
        Pending_task: { value: 'Pending' },
        Completed_task: { value: 'Completed' },
        Deferred_task: { value: 'Deferred' },
    },
});
