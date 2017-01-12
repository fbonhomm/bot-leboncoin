# bot-leboncoin
Bot checking the new offer in terms of setting and send a mail with the info  
Simple bot for the fun

## Installation

install node.js

 - npm install  

## Language and Library

node.js  

- node-schedule (https://www.npmjs.com/package/node-schedule)  
- sync-request (https://www.npmjs.com/package/sync-request)  
- cheerio (https://www.npmjs.com/package/cheerio)  
- md5 (https://www.npmjs.com/package/md5)  

## Usage

Setting the file setting.json  

research: the text at research  
key_word: words at research in the title of offer  
region: region or all for 'toute la france'  
minus: minimal price  
more: maximal price  
time: checking time  
recipient: recipient mail  
service: email service (ex: gmail)  
user: mail address  
password: password user mail  

$> node index.js  

![alt tag](exemple.png)
