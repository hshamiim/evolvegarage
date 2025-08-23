import { NextRequest, NextResponse } from 'next/server';
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';

const client = new TranslateClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { text, targetLanguage } = await req.json();
    if (!text || !targetLanguage) {
      return NextResponse.json({ error: 'Missing text or targetLanguage' }, { status: 400 });
    }
    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: 'auto',
      TargetLanguageCode: targetLanguage,
    });
    const response = await client.send(command);
    return NextResponse.json({ translatedText: response.TranslatedText });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
