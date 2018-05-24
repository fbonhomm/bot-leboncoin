
'use strict';

module.exports = {
	link: {
		tag: 'a',
		type: 'class',
		content: 'list_item clearfix trackable',
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
