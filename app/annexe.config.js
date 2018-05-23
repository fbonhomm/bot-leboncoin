
'use strict';

module.exports = {
	bloc: {
		tag: 'li',
		type: 'itemscope',
		content: ''
	},
	link: {
		tag: 'a',
		type: 'class',
		content: 'item_item',
		exec: 'attribut',
		attribut: 'href'
	},
	title: {
		tag: 'h2',
		type: 'class',
		content: 'item_title',
		exec: 'text'
	},
	price: {
		tag: 'h3',
		type: 'class',
		content: 'item_price',
		exec: 'attribut',
		attribut: 'content'
	}
};
