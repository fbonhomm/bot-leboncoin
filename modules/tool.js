
class Tool {

	setLocation(place) {
		/*
		* return region with slash or random region with the word 'occasions' who signifient 'toute la france'
		*/
		if (place === 'all') {
			return "ile_de_france/occasions/"
		} else {
			return place + "/"
		}
	}

	KWinResearch(research, keyWord) {
		/*
		* return 1 if key word in research if not 0
		*/
		for (var i = 0; keyWord[i]; i++) {
			if (research.indexOf(keyWord[i].toLowerCase()) != -1)
				return 1
		}
		return 0
	}

	priceRange(price, min, max) {
		/*
		* return 1 if the number is between min and max
		*/
		if (parseInt(price, 10) <= parseInt(max, 10) && parseInt(price, 10) >= parseInt(min, 10))
			return 1
		return 0
	}

	concateItem(items) {
		/*
		* return text for the mail
		*/
		for (var i=0, txt=''; i < items.count; i++)
			txt += `title: ${items.title[i]}\nprice: ${items.price[i]}\nlink: ${items.link[i]}\n\n`
		return txt
	}

	updateItem(items, title, price, link) {
		/*
		* add item
		*/
		items.count++
		items.title.push(title)
		items.price.push(price)
		items.link.push(link)
		return items
	}
}

module.exports = Tool
