import ENV_CONFIG from '../config/enviroment.config.js'
import  gmailTransport  from '../config/mailer.config.js'
import { generateRecoveringToken, cookieExtractor } from '../utils/session.util.js'
import jwt from 'jsonwebtoken'

class MailController {

    static async sendEmail(req, res, next) {
        const userEmail = req.body.email
        const fullUrl = `${req.protocol}://${req.get('host')}/newpasswordform`
        const token = generateRecoveringToken(userEmail)
        try {
            let mailInfo = await gmailTransport.sendMail({
                from: 'E-commerce <aguslot19@gmail.com>',
                to: userEmail,
                subject: 'Password recovering',
                html: `
                <div>
                    <h1>Password recovering</h1>
                    <p>Enter the next link to restore your password</p>
                    <a href=${fullUrl + '?token=' + token} >Recovering link</a>
                    <p>ignore this email if you didn't send it</p>
                </div>`,
                attachments: []
            })
            req.logger.info('email sent => ' + JSON.stringify(mailInfo))
            return res.redirect('/login')
        } catch (error) {
            next(error)
        }
    }
}

export default MailController