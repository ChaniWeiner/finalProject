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
    async add(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.users VALUES (${Object.keys(item).map(() => '?')})`, [...Object.values(item)]);
        return result;
    }
    async update(item, type, id) {
        if (type != null) {
            const result = await executeQuery(`UPDATE ${process.env.DB_NAME}.users SET ${Object.keys(item).map(column => column + '=?')} WHERE ${type}=?`, [...Object.values(item), id]);
            return result;
        }
        const result = await executeQuery(`UPDATE ${process.env.DB_NAME}.users SET ${Object.keys(item).map(column => column + '=?')} WHERE userId=?`, [...Object.values(item), id]);
        return result;
    }
}