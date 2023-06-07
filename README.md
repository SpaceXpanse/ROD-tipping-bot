## ROD Tipping Bot for Discord

Allow you tip rod in your discord chat.

### Deployment

Using docker
```
$ docker build -t rod_tipping_bot .
$ docker run -d -v "${PWD}/config:/usr/src/app/config" rod_tipping_bot
```

with in `./config` your `config.json` and your optional `vouchers.json` file if you want to support voucher.

### Development

Copy the `config.json.example` file and rename it to `config.json`

You need to get a Discord ID, Secret and Token (https://discord.com/developers/applications). Optionaly you will need a Giphy API key.

#### Setting up regtest rod node

You will need docker installed.

Fill your `config.json` with the following value to connect to your regtest node:
```json
  ...
  "rpc": {
    "host": "127.0.0.1",
    "port": 11999,
    "user": "node",
    "password": "pass"
  },
  ...
```

#### Create a Discord app

Go on the Discord page create an app. You will see your bot ID and secret.

Now make your bot an user. You can then get your token.

#### Get a Giphy API key

Go on the [Giphy developers dashboard](https://developers.giphy.com/dashboard/) and create an app to get started on development. Then, request a production key when putting the bot on production.

If you don't want this feature, set `giphy.key` to blank in the `config.json`.

#### Add your bot to your discord server

Click on `Generate OAuth2 URL` and open this url in your browser. It is asking you on which server you want to add your bot.

You should see your bot under `offline`.

#### Launch in devmode

Go in your working directory and launch `npm install` to load dependencies

Then launch your bot with `npm run dev` and prey!

Go on the dev/test channel and test your code

#### spacexpansed RPC username/password/hostname

