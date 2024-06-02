import 'dotenv/config'
import { executeQuery } from './query.js'

export class UserService {
    async getAll() {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.users`);
        return result;
    }
    async getById(id) {
        const result = await executeQuery(`select * from ${process.env.DB_NAME}.users where userId=?`, [id]);
        return result;
    }
   
    async update(item, type) {
        if (type != null) {
            const result = await executeQuery(`UPDATE ${process.env.DB_NAME}.users SET userId=?, userName=?, address=?, region=?  WHERE ${type}=?`, [item.userId,item.userName,item.address,item.region]);
            return result;
        }
        const result = await executeQuery(`UPDATE ${process.env.DB_NAME}.users SET userId=?, userName=?, address=?, region=? WHERE userId=?`, [item.userId,item.userName,item.address,item.region,item.userId]);
        return result;
    }
}