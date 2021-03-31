const runSql = (pool, sql) => {
    pool.query(sql)
    .then(([data, fields]) => {
        console.log(sql);
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        pool.end();
    });
}

module.exports =  {
    list: (pool, request) => {
        let { source, fields, where, limit, order } = request;

        let whereSql = (where) ? `WHERE ${ where }` : '';
        let orderSql = (order) ? `ORDER BY ${ order }` : '';
        let limitSql = (limit) ? `LIMIT ${ limit }` : '';
        
        let sql = `SELECT ${ fields } FROM ${ source } ${ whereSql } ${ orderSql } ${ limitSql }`;
        runSql(pool, sql);
    },

    add: (pool, request) => {
        let { source, fields, data } = request;
        let sql = `INSERT INTO ${ source } (${ fields }) VALUES (${ data })`;
        runSql(pool, sql);
    },

    remove: (pool, request) => {
        let { source, where } = request;
        let sql = `DELETE FROM ${ source } WHERE ${ where }`;
        runSql(pool, sql);
    },
    
    change: (pool, request) => {
        let { source, set, where } = request;
        let sql = `UPDATE ${ source } SET ${ set } WHERE ${ where }`;
        runSql(pool, sql);
    }
};