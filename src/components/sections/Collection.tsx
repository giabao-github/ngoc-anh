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
    className={`py-20 md:pt-36 md:pb-[160px] xl:pt-40 xl:pb-[168px] 2xl:pt-56 2xl:pb-[294.5px] px-2 md:px-6 bg-no-repeat bg-center bg-cover md:bg-contain relative bg-primary`}
    style={{ backgroundImage: "url('/backgrounds/collection-background.jpg')" }}
  >
    <div className="max-w-lg mx-auto md:max-w-7xl">
      <h2 className="mb-12 text-xl font-semibold text-center text-white md:text-3xl 2xl:text-4xl md:mb-24 2xl:mb-32">
        Sản phẩm nổi bật
      </h2>
    </div>
    <FilterCarousel onSelect={() => {}} data={data} />
  </section>
);

export default Collection;
