import PolaroidGallery from '@/components/PolaroidGallery';
import { getPolaroidPhotoIds } from '@/lib/directus';

const PHOTO_METADATA: Record<string, { title: string; subtitle: string; rotationDeg?: number }> = {
  '772f67b8-343d-45b2-8d5a-501299d87560': {
    title: 'Diving in Koh Tao, Thailand',
    subtitle: '2024',
    rotationDeg: -3,
  },
  '6dfbaaf5-5905-4a2a-8170-a3b296257d73': {
    title: '"Receiving" my Mech.E degree',
    subtitle: '2019',
    rotationDeg: 4,
  },
  '43f94912-c21a-4ac5-97cf-dfa19036ba04': {
    title: 'Horse riding in Colombia',
    subtitle: '2023',
    rotationDeg: 1,
  },
};

export default function PolaroidSection() {
  const ids = getPolaroidPhotoIds();
  const photos = ids.map((id) => {
    const metadata = PHOTO_METADATA[id] || {};
    return {
      fileId: id,
      title: metadata.title,
      subtitle: metadata.subtitle,
      rotationDeg: metadata.rotationDeg,
    };
  });
  
  return (
    <section className="py-16 bg-accent/5">
      <div className="container flex justify-center">
        <PolaroidGallery photos={photos} />
      </div>
    </section>
  );
}

