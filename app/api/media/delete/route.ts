import { unlink } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function DELETE(req: Request) {
  const { item } = await req.json();
  const filePath = path.join(MEDIA_DIR, item.filename);

  try {
    await unlink(filePath);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return new Response('Failed to delete', { status: 500 });
  }
}