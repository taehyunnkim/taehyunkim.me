import VinylRecord from './VinylRecord';
import styles from './AlbumGrid.module.css';

import moonSafari from '@/assets/contact/moon_safari.jpg';
import sault11 from '@/assets/contact/sault_11.jpeg';
import voodoo from '@/assets/contact/voodoo.jpg';
import bahamadiaKollage from '@/assets/contact/bahamadia_kollage.jpg';
import tommisch from '@/assets/contact/tom_beattape1.jpeg';
import kaytra from '@/assets/contact/kaytra_99.jpeg';
import midnightMarauders from '@/assets/contact/midnight_marauders.jpg';
import orangeWine from '@/assets/contact/okvsho_orange_wine.jpg';

interface Album {
    src: string;
    alt: string;
    href: string;
}

interface AlbumGridProps {
    className?: string;
}


const favoriteAlbums: Album[] = [
    {
        src: moonSafari.src,
        alt: 'Air — Moon Safari',
        href: 'https://www.youtube.com/watch?v=3XTV6pkQne0'
    },
    {
        src: sault11.src,
        alt: 'SAULT — 11',
        href: 'https://www.youtube.com/watch?v=QTOwlELmv9c'
    },
    {
        src: voodoo.src,
        alt: 'D\'Angelo — Voodoo',
        href: 'https://www.youtube.com/watch?v=eo3iqsOH_54&list=OLAK5uy_m6k_v7f07Bf8RtwUL1_W7n5nParKTJIx0'
    },
    {
        src: bahamadiaKollage.src,
        alt: 'Bahamadia — Kollage',
        href: 'https://www.youtube.com/watch?v=uPrkgh3Hxos&list=PL3r1ldjYHlYMP7P9qhR5dn8jFBrZPdEJ8'
    },
    {
        src: tommisch.src,
        alt: 'Tom Misch — Beat Tape 1',
        href: 'https://www.youtube.com/watch?v=gHwXNHXldi0'
    },
    {
        src: kaytra.src,
        alt: 'Kaytranada — 99.9%',
        href: 'https://www.youtube.com/watch?v=3-0-vDbjdqQ&list=PL3r1ldjYHlYMRkxZWC7HX4ajb9eWi_6Yt'
    },
    {
        src: midnightMarauders.src,
        alt: 'A Tribe Called Quest — Midnight Marauders',
        href: 'https://www.youtube.com/watch?v=Mu7yJH3QUfw'
    },
    {
        src: orangeWine.src,
        alt: 'Okvsho — Orange Wine',
        href: 'https://www.youtube.com/watch?v=SpqUEouWzdk'
    }
];

const AlbumGrid: React.FC<AlbumGridProps> = ({ className = '' }) => {
    return (
        <div className={`${styles.albumGrid} ${className}`}>
            {favoriteAlbums.map((album, index) => (
                <VinylRecord
                    key={index}
                    src={album.src}
                    alt={album.alt}
                    href={album.href}
                />
            ))}
        </div>
    );
};

export default AlbumGrid;
