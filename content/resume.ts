import { StaticImageData } from 'next/image';

import logoGojek from '@/public/images/logos/gojek.jpeg';
import logoInfosys from '@/public/images/logos/infosys.jpeg';
import logoPagalguy from '@/public/images/logos/pg.jpeg';

export interface Experience {
  company: string;
  title: string;
  logo: StaticImageData;
  start: string;
  end?: string;
  current?: boolean;
}

const resume: Experience[] = [
  {
    company: 'Gojek',
    title: 'Senior Principal Architect',
    logo: logoGojek,
    start: '2022',
    current: true,
  },
  {
    company: 'Gojek',
    title: 'Senior Engineering Manager',
    logo: logoGojek,
    start: '2019',
    end: '2022',
  },
  {
    company: 'PaGaLGuY',
    title: 'Director of Engineering',
    logo: logoPagalguy,
    start: '2011',
    end: '2019',
  },
  {
    company: 'Infosys',
    title: 'Senior Software Engineer',
    logo: logoInfosys,
    start: '2008',
    end: '2011',
  },
];

export default resume;
