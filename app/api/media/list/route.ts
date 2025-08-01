import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function GET(req: Request) {
  try {
    const files = await fs.readdir(MEDIA_DIR);
    const items = await Promise.all(
      files.map(async (filename) => {
        const stat = await fs.stat(path.join(MEDIA_DIR, filename));
        return {
          id: filename,
          filename,
          directory: '/',
          src: `/uploads/${filename}`,
          type: stat.isDirectory() ? 'dir' : 'file',
        };
      })
    );
    return NextResponse.json({ items });
  } catch (err) {
    return new Response('Unable to read media directory', { status: 500 });
  }
}