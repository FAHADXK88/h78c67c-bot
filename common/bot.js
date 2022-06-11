import { mwn } from 'mwn';
import { config } from 'dotenv';
config();

const init = async ({
    apiUrl = process.env.APIURL,
    username = process.env.USERNAME,
    password = process.env.PASSWORD
}) => {
    return await mwn.init({
        apiUrl,
        username,
        password,
        userAgent: 'h78c67c-bot/1.0.0 (User h78c67c) mwn/1.11.4',
    });
};

export { init };