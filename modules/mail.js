
'use strict'

class Mail {

    constructor() {
        this.nodemailer = require('nodemailer')
    }

	setAccount(email, address, password) {
		/*
		* setting account mail. email: email service, user: address mail and pass: the password of address amil
		*/
		this.transporter = this.nodemailer.createTransport({
			service: email,
		    auth: {
		        user: address,
		        pass: password
		    }
		});
	}

	setMail(sender, recipient, subject, content) {
		/*
		* setting mail. exp: sender, dst: recipient, sub: subject, txt: content of mail
		*/
		this.options = {
			from: `Bot-Leboncoin <${sender}>`,
			to: recipient,
			subject: subject,
			text: content
		};
	}

	sendMail() {
		/*
		* send mail
		*/
		this.transporter.sendMail(this.options, function(error, info) {
		    if (error)
		        console.log(error)
	    	console.log(`[${Date()}] Message sent: ${info.response}.`)
		})
	}
}

module.exports = Mail
