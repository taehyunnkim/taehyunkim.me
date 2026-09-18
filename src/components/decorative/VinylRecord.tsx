import styles from './VinylRecord.module.css';

interface VinylRecordProps {
    src: string;
    alt: string;
    href?: string;
    className?: string;
}

const VinylRecord: React.FC<VinylRecordProps> = ({ 
    src,
    alt,
    href,
    className = ''
}) => {
    const cover = (
        <div className={`${styles.albumCover} ${className}`}>
            <img 
                src={src}
                alt={alt}
                className={styles.albumImage}
                loading="lazy"
            />
            <div className={styles.albumHolder}></div>
        </div>
    );

    if (!href) return cover;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Listen to ${alt}`}
            className={styles.albumLink}
        >
            {cover}
        </a>
    );
};

export default VinylRecord;
