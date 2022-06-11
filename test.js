import { init } from './common/bot.js';

(async function() {
    const bot = await init({});
    await bot.save('User:H78c67c-bot/sandbox', 'Test ' + Date.now(), '試機').catch(e => console.error(`Error saving page: ${e}`));
    console.log('Test completed');
})();