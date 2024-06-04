import 'dotenv/config';

function getAllQuery(tableName) {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName}`;
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

function updateQuery(tableName,details, type) {
    const query = `UPDATE ${process.env.DB_NAME}.${tableName} SET ${details} WHERE ${type}=?`;
    return query;
}

function deleteQuery(tableName) {
    const query = `DELETE from ${process.env.DB_NAME}.${tableName} WHERE userId=?`;
    return query;
}

export { getAllQuery, getByIdQuery, getByParameterQuery,updateQuery,deleteQuery }