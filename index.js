const TelegramBot = require('node-telegram-bot-api');
const token = 'TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/^\/start(@\w+)?(?: (\w+))?$/, (msg, match) => {
  if(match[2] == 'botstart') {
    bot.sendMessage(
    msg.chat.id,
    "拉入完成，請給Bot刪除訊息的權限。"
  );
  }
  bot.sendMessage(
    msg.chat.id,
    "用于删除用户加入或离开群的机器人,拉进群即可使用!!!",
    {
      reply_markup: {
        inline_keyboard: [[{
          text: '👉點我將Bot拉入群~',
          url:  'https://t.me/joincleannerbot?startgroup=botstart',
        }]],
      },
    }
  );
});

bot.on('new_chat_members', (msg) => {
  onServiceMessage(msg);
});

bot.on('left_chat_member', (msg) => {
  onServiceMessage(msg);
});

function onServiceMessage(msg){
  const chatId = msg.chat.id;
  bot.deleteMessage(chatId, msg.message_id);
}
