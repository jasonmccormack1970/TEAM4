const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const cors = require('cors');
const chalk = require('chalk');
const app = require('express')();
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');
const config_data = require('../config/express_config.json');

// enable `cors` to set HTTP response header:
// Access-Control-Allow-Origin: *
app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: ncSchema,
        graphiql: true,
        context: { pgPool },
    }),
);

const PORT = process.env.PORT || config_data.express_port;
app.listen(PORT, () => {
    console.log(
        'Express GraphQL Server Started ... Listening on Port',
        chalk.yellow(PORT),
        '-',
        chalk.magenta(`http://localhost:${PORT}/graphql`),
    );
});
