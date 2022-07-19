# Twitter reply bot - Heroku
A simple twitter bot that will reply when summoned, that is also ready to be deployed to Heroku.

## To run
To run the app locally, install the node dependencies.

```
npm install
```

Then, start the server with the command:

```
npm start
```

## To deploy
To deploy the master branch of the app to heroku, just run the following command:

```
git push heroku master
```

If you want to deploy another branch, use the following command:

```
git push heroku <BRANCH-NAME>:master
```

## How was implemented
This repository was developed using the following resources:
- [Create a simple yet effective twitter bot in nodejs](https://dev.to/lelouchb/create-a-simple-yet-effective-twitter-bot-in-nodejs-javascript-71m)
- [Twit package](https://www.npmjs.com/package/twit)
- [Twitter reply bot](https://github.com/analog-nico/twitter-reply-bot)
- [10 - Twitter reply bot](https://github.com/shiffman/A2Z-F15/blob/gh-pages/week9/10_twitter_replier_bot/bot.js)
- [Twitter-API-v2-sample-code](https://github.com/twitterdev/Twitter-API-v2-sample-code)
- [twitter-api-typescript-sdk](https://github.com/twitterdev/twitter-api-typescript-sdk)

If the app is not able to twit because of `Error 401 - Read-only application cannot POST`, follow the following documents:
- [Stackoverflow answer](https://stackoverflow.com/questions/8389796/why-this-error-read-only-application-cannot-post#:~:text=May%20be%20issue%20with%20your,Access%22%20%2D%3E%20Save%20it.)
- [Github issue](https://github.com/DocNow/diffengine/issues/20)

## How to configure Heroku
To configure and deploy to Heroku, use the following resources:
- [How to deploy your twitter bot or other worker app to heroku](https://www.757colorcoded.org/how-to-deploy-your-twitter-bot-or-other-worker-app-to-heroku/)
- [Deploying twitter bot to heroku](https://hackernoon.com/deploying-twitter-bot-to-heroku-6b143uaj)

**Important:** Do not forget to add the credentials to the Heroku app in the Dashboard.