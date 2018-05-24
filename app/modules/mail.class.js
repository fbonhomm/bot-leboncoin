
'use strict'

const nodemailer = require('nodemailer');

class Mail {

	constructor(setting) {
		this.setting = setting;
		this.transporter = nodemailer.createTransport({
			service: setting.service,
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
			subject: 'bot_leboncoin - New Offers',
			text: content
		};
	}

	sendMail() {
		/*
		* send mail
		*/
		this.transporter.sendMail(this.options, (err, info) => {
		    if (err) console.error(err);
				else console.log(info);
		})
	}
}

module.exports = Mail;
