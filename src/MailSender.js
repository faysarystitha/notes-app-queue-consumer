const nodemailer = require('nodemailer')

class MailSender {
  constructor () {
    this._transporter = nodemailer.createTransport({ // dibutuhkan agar nodemailer dapat menggunakan SMTP server yang sudah disiapkan
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  sendEmail (targetEmail, content) {
    const message = { // untuk mendefinisikan identitas dan isi dari email
      from: 'Notes App',
      to: targetEmail,
      subject: 'Ekspor Catatan',
      text: 'Terlampir hasil dari ekspor catatan',
      attachments: [
        {
          filename: 'notes.json',
          content
        }
      ]
    }

    return this._transporter.sendMail(message) // mengembalikan promise yang membawa status pengiriman email
  }
}

module.exports = MailSender
