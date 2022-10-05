const TelegramAPI = require("node-telegram-bot-api")
const {gameOptions, againOptions} = require ('./options')
const token = '5797444513:AAE4HX6E4hNeukwbD7R-plt16hUx9wnqMqA' 

const bot = new TelegramAPI(token, {polling: true} )

const chat = {};



const startGame = async (chatId) =>{
  await bot.sendMessage(chatId,  "You wanna play? Let's play!")
  const randomNumber = Math.floor(Math.random() * 10);
  chat[chatId] = randomNumber;
  await bot.sendMessage(chatId,  "Отгадывай", gameOptions);
}

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'First meeteng greetings'},
    {command: '/info', description: 'Provide some info'},
    {command: '/game', description: 'Let\'s play'},
  ])

  bot.on('message', async msg=>{
    const text = msg.text;
    const chatId = msg.chat.id;

    if(text === '/start'){
      return bot.sendMessage(chatId, `Thank you for joing our channel!`)
    } else if(text === '/info'){
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/320/625/3206250e-cee1-4819-9061-668f394a9df6/3.webp');
      return bot.sendMessage(chatId, `Сейчас посмотри какую инфу вам можно дать)`)
    } else if( text === '/game' ){
      return startGame(chatId)
    } else{
      return bot.sendMessage(chatId, `Я тебя не понимаю! ты что русский?`)
    }
  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again'){
        return startGame(chatId);
    }
    if( data === chat[chatId]  ){
        return bot.sendMessage(chatId, `Поздравляем ты угадал цифру ${chat[chatId]}`, againOptions)
    } else {
        return bot.sendMessage(chatId, `Ты не угадал! Бот загадал цифру ${chat[chatId]}`, againOptions)
    }
  })
}

start() 