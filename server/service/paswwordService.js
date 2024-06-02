import 'dotenv/config'
import { executeQuery } from './query.js'

export class PaswwordService {
    async getById(id) {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.passwords where userId=?`, [id]);
        return result;
    }
    async delete(id) {
        const result = await executeQuery(`DELETE from ${process.env.DB_NAME}.passwords where userId=? `, [id]);
        return result;
    }
    async update( item, type) {
        if (type != null) {
            const result = await executeQuery(`UPDATE ${process.env.DB_NAME}.passwords SET userId=?,password=? WHERE ${type}=?`, [item.userId,item.password]);
            return result;
        }
        const result = await executeQuery(`UPDATE ${process.env.DB_NAME}.passwords SET userId=?,password=? WHERE userId=?`, [item.userId,item.password,item.userId]);
        return result;
    }
    async getByParameter(type, parameter, orderBy = 'userId', limit = Number.MAX_SAFE_INTEGER) {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.passwords where ${type}=? order by ${orderBy} limit ${limit}`, [parameter]);
        return result;
    }

}