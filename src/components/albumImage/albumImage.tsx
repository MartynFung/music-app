import React, { useRef, useEffect } from "react";
import "@/components/albumImage/parallax.css";
import Image from "next/image";

const THRESHOLD = 15;

interface Props {
  imageLink: string;
  albumTitle: string;
  handleClick?: () => void;
  width?: number;
  height?: number;
}

export function AlbumImage({
  imageLink,
  albumTitle,
  handleClick = () => {},
  width = 200,
  height = 200,
}: Props): React.JSX.Element {
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
      const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
      const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

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
  }, []);

  console.log({ imageLink });

  return (
    <div
      className={`parallax-container w-[${width}px] h-[${height}px] flex-shrink-0 relative`}
      ref={cardRef}
    >
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
