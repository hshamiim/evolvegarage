import { a, defineData } from '@aws-amplify/backend';
/*== NEWSLETTER SUBSCRIPTION SCHEMA =====================================
The section below creates a Newsletter subscription table to store email
addresses of users who want to subscribe to the newsletter. The authorization
rule allows unauthenticated users to subscribe (create), but only authenticated
users can read/manage subscriptions.
=========================================================================*/
const schema = a.schema({
    NewsletterSubscription: a
        .model({
        email: a.string().required(),
        subscribedAt: a.datetime(),
        isActive: a.boolean().default(true),
    })
        .authorization((allow) => [
        allow.guest().to(['create']), // Allow anyone to subscribe
        allow.authenticated().to(['read', 'update', 'delete']) // Only authenticated users can manage
    ]),
});
export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'identityPool',
    },
});
/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/
/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/
/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/
/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()
// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
