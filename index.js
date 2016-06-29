	var TelegramBot = require('node-telegram-bot-api');

	// Устанавливаем токен, который выдавал нам бот.
	var token = '253411366:AAF_Ays092pMByxbQUSINjE79ti_LuSkEuc';
	// Включить опрос сервера
	var bot = new TelegramBot(token, [polling: true]);

	// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
	bot.onText(/\/echo (.+)/, function (msg, match) {
	  var fromId = msg.from.id;
	  var resp = match[1];
	  bot.sendMessage(fromId, resp);
	});

	// Простая команда без параметров.
	bot.on('message', function (msg) {
	  var chatId = msg.chat.id;
	  // Фотография может быть: путь к файлу, поток(stream) или параметр file_id
	  var photo = 'cats.png';
	  bot.sendPhoto(chatId, photo, {caption: 'Милые котята'});
	});

	var notes = [];

	bot.onText(/\/напомни (.+) в (.+)/, function (msg, match) {
	  var userId = msg.from.id;
	  var text = match[1];
	  var time = match[2];

	  notes.push( { 'uid':userId, 'time':time, 'text':text } );

	  bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
	});

	setInterval(function(){
		for (var i = 0; i < notes.length; i++){
			var curDate = new Date().getHours() + ':' + new Date().getMinutes();
				if ( notes[i]['time'] == curDate ) {
					bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
					notes.splice(i,1);
				}
			}
	},1000);