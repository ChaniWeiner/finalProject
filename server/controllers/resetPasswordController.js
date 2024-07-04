// // controllers/passwordController.js
// const passwordService = require('../services/resetPasswordService');

// async function sendOtp_a(req, res) {

//     async function requestOtp(req, res) {
//         const { userId } = req.body;
    
//         try {
//             await passwordService.sendOtp(userId);
//             res.json({ message: 'OTP sent to email.' });
//         } catch (error) {
//             console.error('Error sending OTP:', error);
//             res.status(500).json({ message: 'Error sending OTP' });
//         }
//     }
    
//     async function resetPassword(req, res) {
//         const { userId, otp, newPassword } = req.body;
    
//         try {
//             const success = await passwordService.verifyOtp(userId, otp, newPassword);
//             if (!success) {
//                 return res.status(400).json({ message: 'Invalid OTP' });
//             }
//             res.status(200).json({ message: 'Password reset successfully' });
//         } catch (error) {
//             console.error('Error resetting password:', error);
//             res.status(500).json({ message: 'Error resetting password' });
//         }
//     }
    
//     // module.exports = {
//     //     requestOtp,
//     //     resetPassword
//     // };
    

//     try {
//         await passwordService.sendOtp(userId);
//         res.status(200).json({ message: 'OTP sent successfully' });
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         res.status(500).json({ message: 'Error sending OTP' });
//     }
// }

// async function verifyOtp_a(req, res) {
//     const { userId, otp, newPassword } = req.body;

//     try {
//         const result = await passwordService.verifyOtp(userId, otp, newPassword);
//         if (result) {
//             res.status(200).json({ message: 'Password reset successfully' });
//         } else {
//             res.status(400).json({ message: 'Invalid OTP' });
//         }
//     } catch (error) {
//         console.error('Error verifying OTP:', error);
//         res.status(500).json({ message: 'Error verifying OTP' });
//     }
// }

// export default {
//     sendOtp_a,
//     verifyOtp_a
// };

// controllers/passwordController.js
// import { ResetPasswordService } from "../service/resetPasswordService";
// export default class ResetPasswordController {
//     async sendOtp(req, res) {
//         const { userId } = req.body;
//         try {
//             const service = new ResetPasswordService();

//             await service.sendOtp(userId);
//             res.status(200).json({ message: 'OTP sent successfully' });
//         } catch (error) {
//             console.error('Error sending OTP:', error);
//             res.status(500).json({ message: 'Error sending OTP' });
//         }
//     }

//     async requestOtp(req, res) {
//         const { userId } = req.body;
//         try {
//             const service = new ResetPasswordService();

//             await service.sendOtp(userId);
//             res.status(200).json({ message: 'OTP sent to email.' });
//         } catch (error) {
//             console.error('Error sending OTP:', error);
//             res.status(500).json({ message: 'Error sending OTP' });
//         }
//     }

//     async resetPassword(req, res) {
//         const { userId, otp, newPassword } = req.body;
//         try {
//             const service = new ResetPasswordService();

//             const success = await service.verifyOtp(userId, otp, newPassword);
//             if (!success) {
//                 return res.status(400).json({ message: 'Invalid OTP' });
//             }
//             res.json({ message: 'Password reset successfully' });
//         } catch (error) {
//             console.error('Error resetting password:', error);
//             res.status(500).json({ message: 'Error resetting password' });
//         }
//     }

//     async verifyOtp(req, res) {
//         const { userId, otp, newPassword } = req.body;
//         try {
//             const service = new ResetPasswordService();
//             const result = await service.verifyOtp(userId, otp, newPassword);
//             if (result) {
//                 res.status(200).json({ message: 'Password reset successfully' });
//             } else {
//                 res.status(400).json({ message: 'Invalid OTP' });
//             }
//         } catch (error) {
//             console.error('Error verifying OTP:', error);
//             res.status(500).json({ message: 'Error verifying OTP' });
//         }
//     }
// }



// import {ResetPasswordService} from '../service/resetPasswordService.js';

// class ResetPasswordController {
//     static async sendOtp(req, res) {
//         const { userId } = req.body;
//         try {
//             await ResetPasswordService.sendOtp(userId);
//             res.status(200).json({ message: 'OTP sent successfully' });
//         } catch (error) {
//             console.error('Error sending OTP:', error);
//             res.status(500).json({ message: 'Error sending OTP' });
//         }
//     }

//     static async requestOtp(req, res) {
//         const { userId } = req.body;
//         try {
//             await ResetPasswordService.sendOtp(userId);
//             res.status(200).json({ message: 'OTP sent to email.' });
//         } catch (error) {
//             console.error('Error sending OTP:', error);
//             res.status(500).json({ message: 'Error sending OTP' });
//         }
//     }

//     static async resetPassword(req, res) {
//         const { userId, otp, newPassword } = req.body;
//         try {
//             const success = await ResetPasswordService.verifyOtp(userId, otp, newPassword);
//             if (!success) {
//                 return res.status(400).json({ message: 'Invalid OTP' });
//             }
//             res.json({ message: 'Password reset successfully' });
//         } catch (error) {
//             console.error('Error resetting password:', error);
//             res.status(500).json({ message: 'Error resetting password' });
//         }
//     }

//     static async verifyOtp(req, res) {
//         const { userId, otp, newPassword } = req.body;
//         try {
//             const result = await ResetPasswordService.verifyOtp(userId, otp, newPassword);
//             if (result) {
//                 res.status(200).json({ message: 'Password reset successfully' });
//             } else {
//                 res.status(400).json({ message: 'Invalid OTP' });
//             }
//         } catch (error) {
//             console.error('Error verifying OTP:', error);
//             res.status(500).json({ message: 'Error verifying OTP' });
//         }
//     }
// }

// export default ResetPasswordController;
import { ResetPasswordService } from '../service/resetPasswordService.js';

class ResetPasswordController {
    // constructor() {
    //     this.resetPasswordService = ResetPasswordService;  // אם אתה צריך גישה לשירות
    // }

    // async sendOtp(req, res) {
    //     const { userId } = req.body;
    //     try {
    //         const service=new ResetPasswordService()
    //         await service.sendOtp(userId);
    //         res.status(200).json({ message: 'OTP sent successfully' });
    //     } catch (error) {
    //         console.error('Error sending OTP:', error);
    //         res.status(500).json({ message: 'Error sending OTP' });
    //     }
    // }

    async requestOtp(req, res) {
        const { userId } = req.body;
        try {
            const service=new ResetPasswordService()
            await service.sendOtp(userId);
            res.status(200).json({ message: 'OTP sent to email.' });
        } catch (error) {
            console.error('Error sending OTP:', error);
            res.status(500).json({ message: 'Error sending OTP' });
        }
    }

    async resetPassword(req, res) {
        const { userId, otp, newPassword } = req.body;
        try {
            const service=new ResetPasswordService()
            const success = await service.verifyOtp(userId, otp, newPassword);
            if (!success) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }
            res.json({ message: 'Password reset successfully' });
        } catch (error) {
            console.error('Error resetting password:', error);
            res.status(500).json({ message: 'Error resetting password' });
        }
    }

    // async verifyOtp(req, res) {
    //     const { userId, otp, newPassword } = req.body;
    //     try {
    //         const service=new ResetPasswordService()
    //         const result = await service.verifyOtp(userId, otp, newPassword);
    //         if (result) {
    //             res.status(200).json({ message: 'Password reset successfully' });
    //         } else {
    //             res.status(400).json({ message: 'Invalid OTP' });
    //         }
    //     } catch (error) {
    //         console.error('Error verifying OTP:', error);
    //         res.status(500).json({ message: 'Error verifying OTP' });
    //     }
    // }
}

export default ResetPasswordController;
