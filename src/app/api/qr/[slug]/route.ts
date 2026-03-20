import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const targetUrl = `${appUrl}/p/${slug}`;

  const buffer = await QRCode.toBuffer(targetUrl, {
    type: 'png',
    width: 900,
    margin: 2,
  });

  const body = new Uint8Array(buffer);

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': `inline; filename="${slug}-qr.png"`,
      'Cache-Control': 'no-store',
    },
  });
}