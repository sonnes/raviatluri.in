import { StaticImageData } from 'next/image';

import image1 from '@/public/images/photos/image-1.jpg';
import image2 from '@/public/images/photos/image-2.jpg';
import image3 from '@/public/images/photos/image-3.jpg';
import image4 from '@/public/images/photos/image-4.jpg';
import image5 from '@/public/images/photos/image-5.jpg';

export type Photo = {
  src: StaticImageData;
  caption?: string;
};

const photos: Photo[] = [
  { src: image1 },
  { src: image2 },
  { src: image3 },
  { src: image4 },
  { src: image5 },
];

export default photos;
