const humps = require('humps');

module.exports = (pgPool) => {
    return {
        getDepartments() {
            return pgPool
                .query(`select DISTINCT department as department from users`)
                .then((res) => {
                    return humps.camelizeKeys(res.rows);
                });
        },

        getAllUsers() {
            return pgPool.query(`select * from users`).then((res) => {
                return humps.camelizeKeys(res.rows);
            });
        },

        getUser(apiKey) {
            return pgPool
                .query(
                    `
        select * from users
        where id = $1
      `,
                    [apiKey],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getTasks() {
            return pgPool.query(`select * from tasks`).then((res) => {
                return humps.camelizeKeys(res.rows);
            });
        },
        getUserTasks(user) {
            return pgPool
                .query(
                    `
        select * from tasks
        where assignedto = $1
      `,
                    [user],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows);
                });
        },

        addNewUser({ email, first_name, last_name, department, apikey }) {
            return pgPool
                .query(
                    `
                    INSERT INTO public.users(
                        email, first_name, last_name, department, apikey)
                        VALUES  ($1, $2, $3, $4, $5)
                    returning *
                    `,
                    [email, first_name, last_name, department, apikey],
                )
                .then((res) => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },
    };
};
