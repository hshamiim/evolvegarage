import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const TABLE_NAME = process.env.DYNAMODB_NEWSLETTER_TABLE || 'NewsletterSubscribers';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        email: { S: email },
        subscribedAt: { S: new Date().toISOString() },
      },
    });
    await client.send(command);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 });
  }
}
