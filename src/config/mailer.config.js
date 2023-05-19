import nodemailer from 'nodemailer'
import ENV_CONFIG from './enviroment.config.js'

const gmailTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: ENV_CONFIG.EMAIL,
        pass: ENV_CONFIG.EMAIL_PASSWORD
    }
})

export default gmailTransport
