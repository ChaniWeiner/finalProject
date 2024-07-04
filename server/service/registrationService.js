import { executeQuery } from './query.js'; // וודא שהנתיב לקובץ query.js נכון
import jwt from 'jsonwebtoken';

export class RegistrationService {

    async login(user) {
        console.log("hellooofvkf");
        const userT = {
            userId: user.userId,
        };
        console.log("bbbbbbbbbbbb");

        // יצירת הטוקן
        const token = jwt.sign(userT, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log("Generated token:", token); // הוספת הדפסה של הטוקן

        const result = await executeQuery('SELECT U.userId, U.username, U.address, U.region FROM db_fp.users U, db_fp.passwords P WHERE U.userId = P.userId AND P.userId=? AND P.password=?', [user.userId, user.password]);
        return { user: result, token: token };
    }
    async addUser(item) {
      
        const userT = {
            userId: item.userId,
        };
        // יצירת הטוקן
        const token = jwt.sign(userT, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        await this.adduser(item[0]);
      
        let pswd = { userId: item[0].userId, password: item[1].password };
        //let user = item[0];
      const result=  await this.addPassword(pswd);
       
        return { user: result, token: token };
    }

    async addPassword(item) {
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.passwords (userId, password) VALUES (?, ?)`, [item.userId, item.password]);
        return result;
    }

    async adduser(item) {
       // הוספת הדפסה של הטוקן
        const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.users (userId, userName, address, region,email,phoneNumber) VALUES (?, ?, ?, ?,?,?)`, [item.userId, item.userName, item.address, item.region,item.email,item.phoneNumber]);
        return  result;
     
    
    }
}
``
