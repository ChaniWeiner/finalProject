import nodemailer from 'nodemailer';
// פונקציה שמקבלת דואל של משתמש ושולחת לו אימייל
function sendRatingEmail(userEmail) {
  // יצירת ספק השירות של דוא"ל
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'achaiotbaam@gmail.com', // כתובת האימייל שלך
      pass: 'ueax xamk troa flvl!' // הסיסמה שלך
    }
  });

  // הגדרות האימייל שיישלח
  let mailOptions = {
    from: 'achaiotbaam@gmail.com',
    to: userEmail, // כתובת האימייל של המשתמש שקיבל את הדירוג
    subject: 'הודעת דירוג', // נושא האימייל
    text: ' הבקשה שלך נלקחה לעשיה' // תוכן האימייל
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
