
const fs = require('fs');
const crypto = require('crypto');

const Mail = require('./modules/mail.class');
const Leboncoin = require('./modules/leboncoin.class');
const request = require('./request');

const mail_config = require('./config/mail.config');
const leboncoin_config = require('./config/setting.config');

let hashed;
const promises = [];
const mail = new Mail(mail_config);

if (fs.existsSync('./tmp/file_hash.json')) {
	try {
		let file_hash = fs.readFileSync('./tmp/file_hash.json');

		hashed = JSON.parse(file_hash);
	}
	catch (err) {
		console.error(err);
	}
}

function compare_title(articles, research, hashed) {
	let newest = [];

	if (hashed) {
		for (key in hashed) {
			if (research === key) {

				for (item of articles) {
					if (!hashed[key].includes(item.hash)) {
						newest.push(item);
					}
				}

			}
		}
	}
	else newest = articles;

	return newest;
}

function handling(leboncoin) {
	return new Promise((resolve, reject) => {
		const url = leboncoin.get_url();

		request(url, (err, html) => {
			if (err) console.error(err);
			else {
				leboncoin.set_html(html);

				const articles = [];
				const elements = leboncoin.get_elements();

				// console.log(elements);
				for (let idx=0; elements[idx]; idx++) {
					const title = leboncoin.get_title(elements[idx]);
					const price =leboncoin.get_price(elements[idx]);
					const link = leboncoin.get_link(elements[idx]);

					// console.log('TITLE: ', title);
					// console.log('PRICE: ', price);
					// console.log('LINK: ', link);
					if (leboncoin.key_word(title) && leboncoin.price_range(price)) {
						let hash = crypto.createHash('md5').update(title).digest('hex');

						// console.log('HASH: ', hash);
						articles.push({ hash, title, price, link });
					}
				}

				const research = leboncoin.get_research();
				const newest = compare_title(articles, research, hashed || false);

				resolve({
					research,
					articles,
					newest
				});
			}
		})
	})
}

for (setting of leboncoin_config) {
	const leboncoin = new Leboncoin(setting);

	promises.push(handling(leboncoin));
}

Promise.all(promises)
	.then(results => {
		let data = {};
		let text = '';

		for (let idx=0; results[idx]; idx++) {
			data[results[idx].research] = results[idx].articles.map(el => el.hash);

			if (results[idx].newest && results[idx].newest.length) {
				text += ` -------------- ${results[idx].research.toUpperCase()} --------------\n\n`;
				for (let n of results[idx].newest) {
					text += `TITLE: ${n.title}\nPRICE: ${n.price}\nLINK: ${n.link}\n\n`;
				}
				text += '\n\n';
			}
		}

		fs.writeFileSync('./tmp/file_hash.json', JSON.stringify(data));

		if (text && text.length) {
			mail.setMail(text);
			mail.sendMail();
		}
		// process.exit(0);
	})
	.catch(console.error);
