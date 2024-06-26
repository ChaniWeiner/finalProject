import nodemailer from 'nodemailer';
// פונקציה שמקבלת דואל של משתמש ושולחת לו אימייל
function sendRatingEmail(userEmail) {
  // יצירת ספק השירות של דוא"ל
  // let transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'achaiotbaam@gmail.com', // כתובת האימייל שלך
  //     pass: 'guyq iirx afyv eopp' // הסיסמה שלך
  //   }
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'achaiotbaam@gmail.com',
        pass: 'guyq iirx afyv eopp'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
 
 
  

  // הגדרות האימייל שיישלח
  // let mailOptions = {
  //   from: 'achaiotbaam@gmail.com',
  //   to: userEmail, // כתובת האימייל של המשתמש שקיבל את הדירוג
  //   subject: 'הבקשה שלך נלקחה', // נושא האימייל
  //   text: 'נעדכן אותך שהיא בדרך אליך' // תוכן האימייל
  // };
  let mailOptions = {
    from: 'achaiotbaam@gmail.com',
    to: userEmail, // כתובת האימייל של המשתמש שקיבל את הדירוג
    subject: 'עדכון לגבי בקשתך:)', // נושא האימייל
    html: `
      <div style="font-family: Arial, sans-serif; text-align: right; direction: rtl; color: #0066cc;">
        <p style="font-size: 18px;">הי אחותי!</p>
        <p>איך את?</p>
        <p>שמחות לבשר לך שבקשתך נלקחה ע"י אחות אחרת וכבר נעדכן אותך מה איתו...</p>
        <p>לכל שאלה או עזרה ניתן לפניות למייל <a href="mailto:achaiotbaam@gmail.com">achaiotbaam@gmail.com</a></p>
        <p>צוות אחיות בע"מ</p>
        <img src="cid:unique@nodemailer.com" alt="תמונה">
      </div>
    `,
    attachments: [{
      filename: 'the_logo.png',
      path: 'C:\\finalProject\\finalProject\\server\\the logo.png',
      cid: 'unique@nodemailer.com' // זיהוי ייחודי לתמונה בגוף האימייל
    }]
  };
  
  
  

  // שליחת האימייל
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error); // אם קיימת בעיה, הדפסתה ללוג
    } else {
      console.log('Email sent: ' + info.response); // הדפסת הסטטוס במקרה של שליחה בהצלחה
    }
  });
}
export {sendRatingEmail}
// כעת אפשר לקרוא לפונקציה כדי לשלוח אימייל למשתמש עם כתובת האימייל שלו
// לדוגמה:
// sendRatingEmail('user@example.com');
