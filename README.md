# GoogleMeetAPI
 A Javascript package for interacting with a Google Meet, using Puppeteer.

## Install

At the moment there's no npm package. So to use this package, just clone the git repository and `require()` it in your code.

```bash
git clone https://github.com/ShaunB56/GoogleMeetAPI.git
```

## Usage

> examples/start.js

```javascript
const { Meet } = require('../meet');
const client = new Meet();

config = { meetingLink: 'https://meet.google.com/xyz-wxyz-xyz', email: '', pw: '' };

async function command(client, message) {
    if (message.content.startsWith("!quote")) {
        await client.sendMessage(`${message.author} said, "${message.content.replace("!quote ", "")}" at ${message.time}`);
    }

}

(async () => {

    await client.once('ready', async () => {
        console.log('ready');
    })

    await client.login(config);

    await client.on('message', async (message) => {
        command(client, message);
    })

    await client.on('memberJoin', async (member) => {
        await client.sendMessage(`Welcome, ${member.name}!`);
    })

    await client.on('memberLeave', async (member) => {
        await client.sendMessage(`Goodbye, ${member.name}!`);
    })

})()

/*
 Async/await syntax is required if you need to execute specific actions with Puppeteer or don't want to be limited to only the events already implemented.
*/

// If errors like "Node is detached" get thrown, restarting almost always fixes most errors
```

## License

Copyright © 2022 [Shaun Bharat](https://github.com/ShaunB56).

This project is licensed with the [MIT](https://github.com/ShaunB56/GoogleMeetAPI/blob/main/LICENSE) license.
