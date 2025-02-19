import React, { useRef, useEffect, JSX } from "react";
import Image from "next/image";
import "@/components/albumImage/parallax.css";

interface Props {
  imageLink: string;
  albumTitle: string;
  handleClick?: () => void;
  width?: number;
  height?: number;
  magnitude?: number;
}

export function AlbumImage({
  imageLink,
  albumTitle,
  handleClick = () => {},
  width = 200,
  height = 200,
  magnitude = 8,
}: Props): JSX.Element {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleHover = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const target = currentTarget as HTMLDivElement;
      const { clientWidth, clientHeight } = target;
      const rect = target.getBoundingClientRect();

      const horizontal = (clientX - rect.left) / clientWidth;
      const vertical = (clientY - rect.top) / clientHeight;
      const rotateX = (magnitude / 2 - horizontal * magnitude).toFixed(2);
      const rotateY = (vertical * magnitude - magnitude / 2).toFixed(2);

      card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    };

    const resetStyles = () => {
      card.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg)";
    };

    card.addEventListener("mousemove", handleHover);
    card.addEventListener("mouseleave", resetStyles);

    return () => {
      card.removeEventListener("mousemove", handleHover);
      card.removeEventListener("mouseleave", resetStyles);
    };
  }, [magnitude]);

  return (
    <div className={`parallax-container  flex-shrink-0 relative`} ref={cardRef}>
      <Image
        src={imageLink || ""}
        alt={`Album Art: ${albumTitle}`}
        width={width}
        height={height}
        onClick={() => handleClick()}
        priority
        className="rounded-lg transition duration-300 ease-in-out hover:brightness-75 shadow-lg hover:shadow-xl cursor-pointer"
      />
    </div>
  );
}
