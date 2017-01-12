
var schedule = require('node-schedule')
var request = require('sync-request')
var cheerio = require('cheerio')
var md5 = require('md5')

var jsonClass = require('./modules/json.js')
var mailClass = require('./modules/mail.js')
var toolClass = require('./modules/tool.js')

var init = true
var setting = "json/setting.json"
var annex = "json/annex.json"

var json = new jsonClass()
var mail = new mailClass()
var tool = new toolClass()

var set = json.readJson(setting)
var annex = json.readJson(annex)

json.createJson(annex.file.article, {title: []})

var place = tool.setLocation(set.region)
var research = set.research.replace(/[\s]/g, '%20')
var url = 'https://www.leboncoin.fr/annonces/offres/'+place+'?o=1&q='+research+'&sp=0'

mail.setAccount(set.mail.account.service, set.mail.account.user, set.mail.account.password)

console.log(`[${Date()}] Initialize (checking all ${set.time} minutes).`)
schedule.scheduleJob(`*/${set.time} * * * *`, function(){
	var body = request('GET', url).getBody()

	var items = {'count': 0, 'title': [], 'price': [], 'link': []}

	if (body) {
	    var $ = cheerio.load(body)
		$(annex.balise.loop).each(function(index, element) {
			var title = $(this).children(annex.balise.children).children(annex.balise.title).text().replace(/[\n\t]/g, '').trim()
			var price = $(this).children(annex.balise.children).children(annex.balise.price).text().replace(/[\n\t\s€]/g, '')
			var link = $(this).attr('href').substr(2, this.length);

			set.research = set.research.replace(/\s\s+/g, ' ')
			if (tool.KWinResearch(title.toLowerCase(), set.key_word) && tool.priceRange(price, set.minus, set.more)) {
				if (init)
					json.insertJson(annex.file.article, md5(title))
				else {
					if (!json.isInsideJson(annex.file.article, md5(title))) {
						items= tool.updateItem(items, title, price, link)
						json.insertJson(annex.file.article, md5(title))
					}
				}
			}
		})
	}
	else
		console.log(error)
	if (items.count) {
		var txt = tool.concateItem(items)
		mail.setMail(set.mail.account.user, set.mail.recipient, `[${items.count} items] ${set.research}`, txt)
		mail.sendMail()
	}
	json.checkSizeJson(annex.file.article, 80)
	init = false
	console.log(`[${Date()}] Checked.`)
})
