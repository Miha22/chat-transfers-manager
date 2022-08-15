import { Telegraf } from 'telegraf';
import config from '../keys/config.js';

function launchBot() {
    const bot = new Telegraf(config.BOT_TOKEN);

    bot.command('quit', (ctx) => {
        // Explicit usage
        ctx.telegram.leaveChat(ctx.message.chat.id);

        // Using context shortcut
        ctx.leaveChat();

    });

    bot.on('text', (ctx) => {
        console.log(`${ctx.message.from.username} (${ctx.message.from.first_name} ${ctx.message.from.last_name}) said: ` + ctx.message.text);
        // Explicit usage
        //ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

        // Using context shortcut
        //ctx.reply(`Hello ${ctx.state.role}`);
    });

    bot.on('callback_query', (ctx) => {
        // Explicit usage
        ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

        // Using context shortcut
        ctx.answerCbQuery();
    });

    bot.on('inline_query', (ctx) => {
        const result = []
        // Explicit usage
        ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

        // Using context shortcut
        ctx.answerInlineQuery(result);
    });

    bot.launch();
    console.log('Bot launched');

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

export default { launchBot };
export { launchBot };