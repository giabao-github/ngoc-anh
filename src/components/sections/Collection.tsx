import { RefObject } from "react";

import { FilterCarousel } from "@/components/ui/filter-carousel";

import { collections } from "@/app/storage";

interface CollectionProps {
  collectionRef?: RefObject<HTMLDivElement | null>;
}

const data = collections.map((collection) => ({
  value: collection.id.toString(),
  label: collection.name,
  image: collection.image,
  description: collection.description,
}));

// Calculate exact aspect ratio from background dimensions
const IMAGE_WIDTH = 8382;
const IMAGE_HEIGHT = 4800;
const ASPECT_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

const Collection: React.FC<CollectionProps> = ({ collectionRef }) => (
  <section
    ref={collectionRef}
    className={`relative w-full bg-center bg-no-repeat bg-cover bg-primary bg-[url('/backgrounds/collection-background.jpg')] min-h-[clamp(300px,50vh,600px)]`}
    style={{ aspectRatio: ASPECT_RATIO }}
  >
    {/* Content Container - Centered with max-width */}
    <div className="absolute inset-0 flex flex-col justify-center">
      <div className="px-2 mx-auto max-w-screen md:max-w-[90%] md:px-6">
        <h2 className="mb-12 text-xl font-semibold tracking-wide text-center text-white md:text-2xl xl:text-3xl 2xl:text-4xl md:mb-24 2xl:mb-32">
          Sản phẩm nổi bật
        </h2>
        <FilterCarousel onSelect={() => {}} data={data} />
      </div>
    </div>
  </section>
);

export default Collection;
