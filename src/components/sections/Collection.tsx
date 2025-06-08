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

const Collection: React.FC<CollectionProps> = ({ collectionRef }) => (
  <section
    ref={collectionRef}
    className={`py-28 md:py-48 px-2 md:px-6 bg-cover bg-center`}
    style={{ backgroundImage: "url('/backgrounds/collection-background.jpg')" }}
  >
    <div className="max-w-lg mx-auto md:max-w-7xl">
      <h2 className="text-2xl font-semibold text-center text-white md:text-3xl xl:text-4xl mb-14 md:mb-32">
        Sản phẩm nổi bật
      </h2>
    </div>
    <FilterCarousel onSelect={() => {}} data={data} />
  </section>
);

export default Collection;
