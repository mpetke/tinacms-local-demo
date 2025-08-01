import type {
    MediaStore,
    MediaUploadOptions,
    Media,
  } from 'tinacms';

  export class CustomMediaStore implements MediaStore {
    accept = 'image/*';
    async persist(files: MediaUploadOptions[]): Promise<Media[]> {
      const uploads = await Promise.all(
        files.map(async ({ file }) => {
          const formData = new FormData();
          formData.append('file', file);
          const res = await fetch('/api/media/upload', {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) throw new Error('Upload failed');

          return res.json();
        })
      );

      return uploads;
    }

    async list(): Promise<{ items: Media[]; nextOffset?: number }> {
      const res = await fetch('/api/media/list');
      if (!res.ok) throw new Error('List failed');
      return res.json();
    }

    async delete(media: Media) {
      await fetch('/api/media/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: media }),
      });
    }
  }