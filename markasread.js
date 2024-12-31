const imap = require('imap-simple');

const config = {
    imap: {
        user: 'example@gmail.com', // mail
        password: 'example', // apps password
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 3000,
    },
};

async function markAllAsRead() {
    try {
        const connection = await imap.connect({ imap: config.imap });

        await connection.openBox('INBOX');

        const searchCriteria = ['UNSEEN'];

        const messages = await connection.search(searchCriteria);

        if (messages.length === 0) {
            console.log('Нет непрочитанных писем.');
        } else {
            const uids = messages.map((msg) => msg.attributes.uid);
            await connection.addFlags(uids, '\\Seen');
            console.log(`Помечено как прочитанное: ${uids.length} писем.`);
        }

        connection.end();
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

markAllAsRead();