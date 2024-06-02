import 'dotenv/config'
import { executeQuery } from './query.js'

export class RegistrationService {

    async login(user) {
        const result = await executeQuery('SELECT U.userId,U.username,U.address,U.region FROM db_fp.users U, db_fp.passwords P WHERE U.userId = P.userId AND P.password=?',[user.password]);
        console.log("result login: "+result[0])   
        return result[0];
    }
    async addPswd(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.passwords (userId, password) VALUES (? ,?)`, [item.userId,item.password]);
        return result;
    }
    async addUser(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.users (userId, userName, address, region) VALUES (?,?, ?, ?)`, [item.userId,item.userName,item.address,item.region]);
        return result;
    }
}