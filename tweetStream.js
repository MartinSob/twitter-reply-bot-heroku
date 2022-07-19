import { Client } from "twitter-api-sdk";
import * as dotenv from 'dotenv'

dotenv.config({ path: './config.env' })

/**
 * This is a function that listents to tweets containing a keyword 
 * with simple bearer token authentication.
 */
async function main() {
  const client = new Client(process.env.BEARER_TOKEN);

  await client.tweets.addOrDeleteRules(
    {
      add: [
        { value: "The Medium test", tag: "text_filtered_tag" }
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