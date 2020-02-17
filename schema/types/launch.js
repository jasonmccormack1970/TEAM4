const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
} = require('graphql');

// https://docs.spacexdata.com/?version=latest
module.exports = new GraphQLObjectType({
    name: 'LaunchType',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: rocket },
        launch_site: { type: launch_site },
    }),
});

const rocket = new GraphQLObjectType({
    name: 'rocket',
    fields: {
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString },
    },
});

const launch_site = new GraphQLObjectType({
    name: 'launch_site',
    fields: {
        site_id: { type: GraphQLString },
        site_name: { type: GraphQLString },
        site_name_long: { type: GraphQLString },
    },
});
