import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return new Response('Missing file', { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(MEDIA_DIR, file.name);

  await writeFile(filePath, buffer);

  return NextResponse.json({
    type: 'file',
    id: file.name,
    filename: file.name,
    directory: '/',
    src: `/uploads/${file.name}`,
  });
}