import Link from "next/link";
import { StrapiImage } from "./StrapiImage";
import { formatDate } from "@/utils/format-date";


export function Card({
  title,
  description,
  slug,
  image,
  price,
  createdAt,
  startDate,
  basePath,
}) {
  return (
    <Link href={`/${basePath}/${slug}`} className="content-items__card">
      <div className="content-items__card-img">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          width={400}
          height={400}
        />
      </div>
      <div className="content-items__card-text">
        <h5>{title}</h5>
        {price && (
          <p>
            <span>Price: </span>
            {price}
          </p>
        )}
        {(startDate ?? createdAt) && (
          <p>{formatDate(startDate ?? createdAt)}</p>
        )}
        <p>{description.slice(0, 144)}...</p>
      </div>
    </Link>
  );
}