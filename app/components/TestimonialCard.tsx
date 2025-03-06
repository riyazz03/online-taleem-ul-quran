import Image from "next/image";
import '../css/testimonialCard.css';

export default function Cards({image, name, review }: {image: string, name: string, review: string} ) {
    return (
        <div className="cards" style={{ padding: '20px', borderRadius: '10px' }}>
            <Image src={image} alt="Avatar" width={76} height={76} />
            <div className="card-name-container">
                <div className="card-name-dot"></div>
                <h3 className="card-name">{name}</h3>
            </div>
            <div className="card-content">
                <p className="card-review">&quot;{review}&quot;</p>
            </div>
        </div>
    );
}