import PolaroidGallery from '@/components/PolaroidGallery';
import { getPolaroidPhotoIds } from '@/lib/directus';

export default async function PolaroidSection() {
  const ids = getPolaroidPhotoIds();
  return (
    <section className="py-16 bg-accent/5">
      <div className="container flex justify-center">
        <PolaroidGallery photos={ids.map((id) => ({ fileId: id }))} />
      </div>
    </section>
  );
}


