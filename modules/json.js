
'use strict'

class Json {
    constructor() {
        this.jsonfile = require('jsonfile');
        this.fs = require('fs');
    }

    createJson(file, json) {
		/*
		* create json and initialize if json something contain
		*/
		this.fs.closeSync(this.fs.openSync(file, 'w+'));
		if (json)
			this.jsonfile.writeFileSync(file, json);
	}

	readJson(file) {
		/*
		* return object json
		*/
		return this.jsonfile.readFileSync(file);
	}

	writeJson(file, obj) {
		/*
		* write object in json
		*/
		this.jsonfile.writeFileSync(file, obj);
	}

	insertJson(file, str) {
		/*
		* read json update object and write
		*/
		var obj = this.jsonfile.readFileSync(file);
		obj.title.push(str)
		this.jsonfile.writeFileSync(file, obj);
	}

	isInsideJson(file, str) {
		/*
		* verify is str in object json
		*/
		var obj = this.jsonfile.readFileSync(file);
		for (var i=0; obj.title[i]; i++) {
			if (obj.title[i] === str)
				return 1
		}
		return 0
	}

	checkSizeJson(file, max) {
		/*
		* verify the size of field title of object json not depassed size max.
		* if depassed so cut of half 
		*/
		var obj = this.jsonfile.readFileSync(file);
		if (obj.title.length >= 80)
			obj.title.splice(0, 40);
		this.jsonfile.writeFileSync(file, obj);
	}
}

module.exports = Json
