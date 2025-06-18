import { useEffect, useState } from "react";

import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    images[0],
  );

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col-reverse">
      <div className="hidden mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <button
              type="button"
              key={image}
              onClick={() => setSelectedImage(image)}
              className={`relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white ${
                selectedImage === image
                  ? "ring-2 ring-secondary ring-offset-2"
                  : "ring-1 ring-transparent ring-offset-2 hover:ring-secondary"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail of product – ${image.split("/").pop()}`}
                fill
                sizes="96px"
                className="object-cover object-center rounded-md"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="w-full aspect-square">
        <div className="overflow-hidden relative bg-gray-100 rounded-lg aspect-square">
          <Image
            src={selectedImage!}
            alt="Enlarged product image"
            fill
            sizes="(max-width:768px) 100vw, 512px"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
