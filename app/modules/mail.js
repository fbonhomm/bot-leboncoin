
'use strict'

const nodemailer = require('nodemailer');

class Mail {

	construtor(setting) {
		this.setting = setting;
		this.transporter = nodemailer.createTransport({
			service: setting.service_mail,
		    auth: {
		    	user: setting.address,
		      pass: setting.password
		    }
		});
	}

	setMail(content) {
		/*
		* setting mail. exp: sender, dst: recipient, sub: subject, txt: content of mail
		*/
		this.options = {
			from: `Bot-Leboncoin <${this.setting.address}>`,
			to: this.setting.recipient,
			subject: 'bot_leboncoin - ${} items',
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
