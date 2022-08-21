import { Telegraf } from 'telegraf';
import config from '../keys/config.js';
import web from './web.cjs';
import collect from 'collect.js';

async function launchBot() {
    const bot = new Telegraf(config.BOT_TOKEN);
    //const searches = await web.searchWeb('Adata SSD M.2 PCIe Gen3x4 Pro', { title: true, similarityScore: true, minScore: 0.5, showResults: 5 });

    bot.command('quit', (ctx) => {
        // Explicit usage
        ctx.telegram.leaveChat(ctx.message.chat.id);

        // Using context shortcut
        ctx.leaveChat();

    });

    bot.on('text', (ctx) => {
        // console.log(`${ctx.message.from.username} 
        // (${ctx.message.from.first_name} ${ctx.message.from.last_name}) 
        // said: ` + ctx.message.text
        // );
        if(!containsTransfer(ctx.message.text)) {
            return;
        }
        const transfers = getTransfers(ctx.message.text);
        ctx.reply(transfersToString(transfers));
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

function transfersToString(json) {
    let str = '';
    let i = 0;

    for(let key in json){
        str += `[${i++}] ${json[key]} ${key} \n`;
    }

    return str;
}

function getTransfers(str) {
    const message = normalizeMessage(str);
    const regQuantity = /x[1-9]{1,2}(?![0-9]{1,2})/gi;
    const quantitiesCollection = collect(message.match(regQuantity));//quantities
    const namesCollection = collect(message.split(regQuantity)
        .filter(item => item.length > 2)
        .map(item => item.trim())
    );

    return namesCollection.combine(quantitiesCollection).all();
}

function containsTransfer(str) {
    return /([1-9]{1,2}(\u0078|\u0445))|((\u0078|\u0445)[1-9]{1,2})/gi.test(str);
}

function normalizeMessage(str) {
    let message = clearX(str);
    const re = /[1-9]{1,2}x/gi;
    let match = re.exec(message);
    while (match != null) {
        if(isNumeric(match.index + 1)) {
            message = swapChars(message, match.index + 1, match.index + 2);
        }
        message = swapChars(message, match.index, match.index + 1);
        match = re.exec(message);
    }

    return clearBefore(message);
}

function isNumeric(c){
    return /^\d$/.test(c);
}

function swapChars(str, index1, index2) {
    if(index1 > str.length - 1 || index2 > str.length - 1) {
        throw new Error("Index(-es) out of bounds");
    }
    const c1 = str[index1];
    const c2 = str[index2];

    return replaceAt(replaceAt(str, index1, c2), index2, c1);
}

function clearBefore(str) {
    const re = /x[1-9]{1,2}/g;
    const regIndex = indexOfRegex(str, re);

    if(regIndex > 0) {
        const s = str.substring(regIndex);
        return s;
    }

    return str;
}

function indexOfRegex(str, regex) {
    return regex.exec(str).index;
}

function clearX(str) {
    return replaceAll(replaceAll(str, 'х', 'x'), 'Х', 'x');
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function replaceAt(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

export default { launchBot };
export { launchBot };