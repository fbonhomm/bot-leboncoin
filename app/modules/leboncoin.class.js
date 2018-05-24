
'use strict';

const cheerio = require('cheerio');
const querystring = require('querystring');

const annexe = require('../config/annexe.config');

class Leboncoin {

	constructor(setting) {
		let research = (setting.research) ? setting.research.replace(/[\s]/g, '%20') : '';
		let category = (setting.category || setting.category === 'all')
			? 'annonces'
			: setting.category || '';
		let place = (setting.region && setting.region === 'all')
			? ''
			: (setting.region || '') + "/";

		this.setting = setting;
		this.url = setting.url || `https://www.leboncoin.fr/${category}/offres/${place}?o=1&q=${research}&sp=0`;

		if (setting.url) {
			const queryparse = querystring.parse(setting.url);

			this.setting.research = queryparse.q;
		}
	}

	_format(type, content) {
		return (!type || !content)
			? ''
			: (type === 'id')
				? `#${content.trim().replace(/\s+/g, '#')}`
				: (type === 'class')
					? `.${content.trim().replace(/\s+/g, '.')}`
					: `[${type.trim()}=${content.trim()}]`;
	};

	get_url() {
		return this.url;
	}

	get_research() {
		return this.setting.research;
	}

	get_elements(limit=0) {
		const elements = [];
		const search = (annexe.link.tag || '')
			+ this._format(annexe.link.type, annexe.link.content);

		this.html(search).each((idx, element) => {
			if (limit === 0 || idx < limit) elements.push(element);
		});

		return elements;
	}

	get_title(element) {
		const search = (annexe.title.tag || '')
			+ this._format(annexe.title.type, annexe.title.content);

		const title = this.html(element).find(search)

		const str = (annexe.title.exec === 'attribut')
			? this.html(title).attr(annexe.title.attribut)
			: this.html(title).text();

		return (str) ? str.toString().replace(/[\n\t]/g, '').trim() : '';
	}

	get_price(element) {
		const search = (annexe.price.tag || '')
			+ this._format(annexe.price.type, annexe.price.content);

		const price = this.html(element).find(search);

		const str = (annexe.price.exec === 'attribut')
			? this.html(price).attr(annexe.price.attribut)
			: this.html(price).text();

		return (str) ? str.toString().replace(/[\n\t]/g, '').trim() : '';
	}

	get_link(link) {
		const str = (annexe.link.exec === 'attribut')
			? this.html(link).attr(annexe.link.attribut)
			: this.html(link).text();

		return (str) ? 'https:' + str.toString().replace(/[\n\t]/g, '').trim() : '';
	}

	set_html(html) {
		this.html = cheerio.load(html);
	}

	key_word(title) {
		/*
		* return 1 if key word in research if not 0
		*/
		let check = false;

		for (let i=0; this.setting.key_word[i]; i++) {
			if (title.toLowerCase().includes(this.setting.key_word[i].toLowerCase())) {
				check = true;
			}
		}

		return check;
	}

	price_range(price_str) {
		/*
		* return 1 if the number is between min and max
		*/
		let check = false;
		let price = parseInt(price_str, 10);
		let min = parseInt(this.setting.min, 10);
		let max = parseInt(this.setting.max, 10);

		if (price <= max && price >= min) {
			check = true;
		}

		return check;
	}
}

module.exports = Leboncoin;
