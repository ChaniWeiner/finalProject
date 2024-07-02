// registrationService.js
import { executeQuery } from './query.js'; // וודא שהנתיב לקובץ query.js נכון

export class RegistrationService {

    async login(user) {
        const result = await executeQuery('SELECT U.userId, U.username, U.address, U.region FROM db_fp.users U, db_fp.passwords P WHERE U.userId = P.userId AND P.userId=? AND P.password=?', [user.userId, user.password]);
        return result[0];
    }

    async addPassword(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.passwords (userId, password) VALUES (?, ?)`, [item.userId, item.password]);
        return result;
    }

    async addUser(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.users (userId, userName, address, region) VALUES (?, ?, ?, ?)`, [item.userId, item.userName, item.address, item.region]);
        return result;
    }
}
