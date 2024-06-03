import 'dotenv/config';

function getAllQuery(tableName) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName}`;
    return query;
}

function getByIdQuery(tableName) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName} WHERE userId=?`;
    return query;
}

function getByParamQuery(tableName, conditions) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName} WHERE ${conditions}`;
    return query;
}

function updateQuery(tableName, type) {
    const query = `UPDATE ${process.env.DB_NAME}.${tableName} SET userId=?, userName=?, address=?, region=? WHERE ${type}=?`;
    return query;
}

export { getAllQuery, getByIdQuery, getByParamQuery,updateQuery }