import { RefObject } from "react";
import { FilterCarousel } from "../ui/filter-carousel";
import { collections } from "../storage";


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
  <section ref={collectionRef} className={`py-12 md:py-32 px-6 bg-white`}>
    <div className="max-w-lg md:max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-14 md:mb-20 text-black">Bộ Sưu Tập Minh Long</h2>
    </div>
    <FilterCarousel onSelect={() => {}} data={data} />
  </section>
);

export default Collection;