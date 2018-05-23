
const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

const hash = crypto.createHash('md5');

const Mail = require('./modules/mail.js');
const Leboncoin = require('./modules/tool.js');

const setting_config = require('./setting.config');
const mail_config = require('./mail.config');

const promises = [];

function compare_title(articles) {

}

for (setting of setting_config) {
	promises.push(() => {
		return new Promise((resolve, reject) => {
			https.get(url, (err, html) => {
				if (html) {
					const articles = [];
					const mail = new Mail(mail_config);
					const leboncoin = new Leboncoin(html, setting, annexe_config);

					const elements = leboncoin.get_elements();

					for (let idx=0; elements[idx]; idx++) {
						const title = leboncoin.get_title(elements[idx]);
						const price = leboncoin.get_price(elements[idx]);
						const link = leboncoin.get_link(elements[idx]);

						if (leboncoin.key_word(title) && leboncoin.price_range(price)) {
							articles.push(title, price, link);
						}
					}

					const newest = compare_title(articles);
					if (newest.lenght()) {
						// new file
					}

					resolve({
						object: url,
						items: newest
					});
				}
			})
		})
	})
}

Promise.all(promises)
	.then(() => {
		hash.update(title);
		hash.digest('hex');

			let text = '';

			for (let n of newest) {
				text = text + `title: ${n.title}, price: ${n.price}, link: ${n.link}\n`;
			}

			mail.setMail(text);
			mail.sendMail();
		}
	})
