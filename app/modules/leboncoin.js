
'use strict';

const annexe = require('./annexe_config');
const cheerio = require('cheerio');

class Leboncoin {

	constructor(setting, html) {
		let research = setting.research.replace(/[\s]/g, '%20')
		let place = (setting.region === 'all')
			? "ile_de_france/occasions/"
			: setting.region + "/";

		this.html = cheerio.load(html);
		this.setting = setting;
		this.url = `https://www.leboncoin.fr/annonces/offres/${place}?o=1&q=${research}&sp=0`;
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

	get_elements(limit=0) {
		const elements = [];
		const search = annexe.block.tag || ''
			+ format(annexe.block.type, annexe.block.content);

		$(search).each((index, element) {
			if (limit !== 0 && idx >= limit) break;
			else elements.psuh(element);
		}

		return elements;
	}

	get_title(element) {
		const search = annexe.title.tag || ''
			+ format(annexe.title.type, annexe.title.content);

		const title = this.html(element).children(search);

		const str = (annexe.title.exec === 'attribut')
			? $(title).attr(annexe.title.attribut)
			: title.text();

		return str.replace(/[\n\t]/g, '').trim();
	}

	get_price(element) {
		const search = annexe.price.tag || ''
			+ format(annexe.price.type, annexe.price.content);

		const price = this.html(element).children(search);

		const str = (annexe.price.exec === 'attribut')
			? $(price).attr(annexe.price.attribut)
			: price.text();

		return str.replace(/[\n\t]/g, '').trim();
	}

	get_link(element) {
		const search = annexe.price.tag || ''
			+ format(annexe.link.type, annexe.link.content);

		const link = this.html(element).children(search);

		const str = (annexe.link.exec === 'attribut')
			? $(link).attr(annexe.link.attribut)
			: link.text();

		return str.replace(/[\n\t]/g, '').trim();
	}

	key_word(title) {
		/*
		* return 1 if key word in research if not 0
		*/
		let check = false;

		for (let i=0; this.setting.key_word[i]; i++) {
			if (title.includes(this.setting.key_word[i].toLowerCase()) !== -1) {
				check = true;
			}
		}

		return check;
	}

	price_range(price) {
		/*
		* return 1 if the number is between min and max
		*/
		let check = false;
		let price = parseInt(price, 10);
		let min = parseInt(this.setting.min, 10);
		let max = parseInt(this.setting.max, 10);

		if (price <= max && price >= min) {
			check = true;
		}

		return check;
	}
}

module.exports = Tool
