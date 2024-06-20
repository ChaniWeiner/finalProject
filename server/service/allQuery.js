import 'dotenv/config';

function getAllQuery(tableName) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName}`;
    return query;
}


function getJoinTablesQuery(tableName1, tableName2, tableName3) {
    const query = `
    SELECT DISTINCT *
FROM ${process.env.DB_NAME}.${tableName1} NATURAL JOIN ${process.env.DB_NAME}.${tableName2} NATURAL JOIN ${process.env.DB_NAME}.${tableName3};
        `;
    return query;
}

function getJoinTwoTablesQuery(tableName1, tableName2) {
    const query = `
    SELECT DISTINCT *
FROM ${process.env.DB_NAME}.${tableName1} NATURAL JOIN ${process.env.DB_NAME}.${tableName2} ;
        `;
    return query;
}

function getByIdQuery(tableName) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName} WHERE userId=?`;
    return query;
}

function getByParameterQuery(tableName, conditions) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName} WHERE ${conditions}`;
    return query;
}

function updateQuery(tableName, details, type) {
    const query = `UPDATE ${process.env.DB_NAME}.${tableName} SET ${details} WHERE ${type}=?`;
    return query;
}

function deleteQuery(tableName) {
    const query = `DELETE from ${process.env.DB_NAME}.${tableName} WHERE userId=?`;
    return query;
}

// function addQuery(tableName) {
//     const query = `INSERT INTO ${process.env.DB_NAME}.${tableName} (userId, column1, column2, column3) VALUES (?, ?, ?, ?)`;
//      return query;

// }
export { getAllQuery, getByIdQuery, getByParameterQuery, updateQuery, deleteQuery, getJoinTablesQuery,getJoinTwoTablesQuery }