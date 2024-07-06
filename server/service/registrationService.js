import { executeQuery } from './query.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class RegistrationService {

    async login(user) {
        const userT = {
            userId: user.userId,
        };        const result = await executeQuery('SELECT U.userId, U.username, U.address, U.region, P.password FROM db_fp.users U JOIN db_fp.passwords P ON U.userId = P.userId WHERE U.userId=?', [user.userId]);
        
        if (result.length === 0) {
            throw new Error('User not found');
        }
        
        const storedPassword = result[0].password;
        const isMatch = await bcrypt.compare(user.password, storedPassword);

        if (!isMatch) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign(userT, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return { user: result[0], token: token };
    }

    async addUser(item) {
        const userT = {
            userId: item.userId,
        };
        const token = jwt.sign(userT, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const hashedPassword = await bcrypt.hash(item.password, 10);

        await this.addUserToDb(item[0]);
      
        let pswd = { userId: item[0].userId, password: hashedPassword };
        const result = await this.addPassword(pswd);
       
        return { user: result, token: token };
    }

    async addPassword(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.passwords (userId, password) VALUES (?, ?)`, [item.userId, item.password]);
        return result;
    }

    async addUserToDb(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.users (userId, userName, address, region, email, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)`, [item.userId, item.userName, item.address, item.region, item.email, item.phoneNumber]);
        return result;
    }
}
