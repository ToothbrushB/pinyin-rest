#!/usr/bin/env node

'use strict'
//import getType from 'pinyin-or-hanzi' as blah

//const blah = require('pinyin-or-hanzi')
const port = process.env.PORT || 3001;
const fs = require('fs')
const pinyinLookup = JSON.parse(fs.readFileSync('kMandarin.json'));
const definitionLookup = JSON.parse(fs.readFileSync('kDefinition.json'));

const express = require('express')
const corser = require('corser')
const app = express()
app.use(corser.create())

app.get('/', (req, res) => {
	res.send('<a href="https://github.com/ToothbrushB/pinyin-rest">View GitHub Repository</a>')
})


app.get('/pinyin/:query', async (req, res) => {
	const list = []
	for (let char of req.params.query) {
		console.log(char)
		console.log(pinyinLookup[char])
		list.push(pinyinLookup[char])
	}
	res.status(200).send({pinyin:list.join(' ')})
})

app.get('/definition/:query', async (req, res) => {
	const list = []
	for (let char of req.params.query) {
		console.log(char)
		console.log(definitionLookup[char])
		list.push(definitionLookup[char])
	}
	res.status(200).send({pinyin:list})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//const port = Number(process.env.PORT || 8080)
//http.createServer(app).listen(port, ip.address(), async err => {
//	if (err) {
//		console.error(err)
//		process.exit(1)
//	} else {
//		console.log(`Server running on http://${ip.address()}:${port}`)
//		convertPinyin.init(await hanziToZhuyin.init(await mdbg.init()))
//	}
//})
