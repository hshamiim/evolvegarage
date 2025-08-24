import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: "eu-central-1", // Hardcoded region
  credentials: {
    accessKeyId: "AKIAVA5YLBGOOS53VLNW", // Hardcoded access key
    secretAccessKey: "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", // Hardcoded secret
  },
});

const TABLE_NAME = process.env.DYNAMODB_NEWSLETTER_TABLE || 'NewsletterSubscribers';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
      console.log('AWS ENV DEBUG:', {
        AWS_ACCESS: process.env.AWS_ACCESS,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_REGION: process.env.AWS_REGION,
        DYNAMODB_NEWSLETTER_TABLE: process.env.DYNAMODB_NEWSLETTER_TABLE
      });
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
