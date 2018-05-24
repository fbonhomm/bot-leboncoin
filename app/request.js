'use strict';

const https = require('https');

module.exports = function(url, cb) {
	https.get(url, res => {
		const { statusCode } = res;

		if (statusCode === 200) {
			let rawData = '';

			res.on('data', (chunk) => {
				rawData += chunk;
			});

			res.on('end', () => {
				cb(null, rawData);
			});
		}
		else {
			cb(`Status Code: ${statusCode}`, null);
		}

	})
	.on('error', (err) => {
		cb(err, null);
	});
};
