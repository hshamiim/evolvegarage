"use server";
import { NextRequest, NextResponse } from 'next/server';
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';

const client = new TranslateClient({
  region: "eu-central-1", // Hardcoded region
  credentials: {
    accessKeyId: "AKIAVA5YLBGOOS53VLNW", // Hardcoded access key
    secretAccessKey: "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", // Hardcoded secret
  },
});
  console.log('AWS ENV DEBUG:', {
    AWS_ACCESS: process.env.AWS_ACCESS,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION
  });
export async function POST(req: NextRequest) {
  try {
    const { text, targetLanguage } = await req.json();
    if (!text || !targetLanguage) {
      console.error('Missing text or targetLanguage', { text, targetLanguage });
      return NextResponse.json({ error: 'Missing text or targetLanguage' }, { status: 400 });
    }
    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: 'auto',
      TargetLanguageCode: targetLanguage,
    });
    const response = await client.send(command);
    return NextResponse.json({ translatedText: response.TranslatedText });
  } catch (error: any) {
    console.error('Translate API error:', {
      message: error?.message,
      code: error?.code,
      name: error?.name,
      stack: error?.stack,
      error
    });
    return NextResponse.json({ error: 'Translation failed', details: error?.message || error }, { status: 500 });
  }
}
