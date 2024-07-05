// import { executeQuery } from './query.js'; // וודא שהנתיב לקובץ query.js נכון
// import jwt from 'jsonwebtoken';

// export class RegistrationService {

//     async login(user) {
//         console.log("hellooofvkf");
//         const userT = {
//             userId: user.userId,
//         };
//         console.log("bbbbbbbbbbbb");

//         // יצירת הטוקן
//         const token = jwt.sign(userT, process.env.JWT_SECRET, {
//             expiresIn: '1h',
//         });
//         console.log("Generated token:", token); // הוספת הדפסה של הטוקן

//         const result = await executeQuery('SELECT U.userId, U.username, U.address, U.region FROM db_fp.users U, db_fp.passwords P WHERE U.userId = P.userId AND P.userId=? AND P.password=?', [user.userId, user.password]);
//         return { user: result, token: token };
//     }
//     async addUser(item) {
      
//         const userT = {
//             userId: item.userId,
//         };
//         // יצירת הטוקן
//         const token = jwt.sign(userT, process.env.JWT_SECRET, {
//             expiresIn: '1h',
//         });

//         await this.adduser(item[0]);
      
//         let pswd = { userId: item[0].userId, password: item[1].password };
//         //let user = item[0];
//       const result=  await this.addPassword(pswd);
       
//         return { user: result, token: token };
//     }

//     async addPassword(item) {
//         const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.passwords (userId, password) VALUES (?, ?)`, [item.userId, item.password]);
//         return result;
//     }

//     async adduser(item) {
//        // הוספת הדפסה של הטוקן
//         const result = await executeQuery(`INSERT INTO ${process.env.DB_NAME}.users (userId, userName, address, region,email,phoneNumber) VALUES (?, ?, ?, ?,?,?)`, [item.userId, item.userName, item.address, item.region,item.email,item.phoneNumber]);
//         return  result;
     
    
//     }
// }
// ``

import { executeQuery } from './query.js'; // וודא שהנתיב לקובץ query.js נכון
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class RegistrationService {

    async login(user) {
        const userT = {
            userId: user.userId,
        };
        // שליפת הסיסמה המוצפנת מהמאגר
        const result = await executeQuery('SELECT U.userId, U.username, U.address, U.region, P.password FROM db_fp.users U JOIN db_fp.passwords P ON U.userId = P.userId WHERE U.userId=?', [user.userId]);
        
        if (result.length === 0) {
            throw new Error('User not found');
        }
        
        const storedPassword = result[0].password;

        // השוואת הסיסמה המוזנת עם הסיסמה המוצפנת
        const isMatch = await bcrypt.compare(user.password, storedPassword);

        if (!isMatch) {
            throw new Error('Invalid password');
        }

        // יצירת הטוקן
        const token = jwt.sign(userT, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log("Generated token:", token); // הוספת הדפסה של הטוקן

        return { user: result[0], token: token };
    }

    async addUser(item) {
        const userT = {
            userId: item.userId,
        };
        // יצירת הטוקן
        const token = jwt.sign(userT, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // הצפנת הסיסמה
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
