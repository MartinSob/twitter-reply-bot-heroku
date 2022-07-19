import { Client } from "twitter-api-sdk";
import axios from 'axios';
import * as dotenv from 'dotenv'

dotenv.config({ path: './config.env' })

/**
 * This is a function that listents to tweets containing a keyword 
 * obtaining the bearer token for the authentication using the OAuth2 API.
 */
async function main() {
  const bearerTokenCredentials =
    Buffer.from(`${encodeURI(process.env.API_KEY)}:${encodeURI(process.env.API_SECRET_KEY)}`).toString('base64')

  const result = await axios.post('https://api.twitter.com/oauth2/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Authorization': 'Basic ' + bearerTokenCredentials,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })

  if (result.data.token_type !== 'bearer') {
    throw 'BEARER ERROR'
  }

  const bearerToken = result.data.access_token;

  const client = new Client(bearerToken);

  await client.tweets.addOrDeleteRules(
    {
      add: [
        { value: "The Medium tin test", tag: "text_filtered_tag" }
      ],
      // delete: {
      //   ids: [
      //     '',
      //   ]
      // }
    }
  );

  const rules = await client.tweets.getRules();
  console.log('rules', rules);

  const stream = client.tweets.searchStream({
    "tweet.fields": ["author_id", "created_at"],
  });

  for await (const tweet of stream) {
    console.log('🔷 TWEET', tweet);
  }
}

main();