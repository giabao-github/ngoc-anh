import { useState } from "react";

import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse">
      <div className="hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <button
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
                alt="Product image"
                fill
                className="object-cover object-center rounded-md"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="w-full aspect-square">
        <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-square">
          <Image
            src={selectedImage}
            alt="Selected product image"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  );
}
