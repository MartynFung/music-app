import { AlbumModal } from "@/components/albumModal";
import { Album } from "@/types/album";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFavorites } from "@/context/favoritesContext";

const THRESHOLD = 15;

interface Props {
  album: Album;
  rank: number;
}

export function AlbumCard({ album, rank }: Props): React.JSX.Element {
  const {
    albumTitle,
    albumLink,
    artistName,
    imageLink,
    artistLink,
    releaseDate,
  } = album;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.has(album.id);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleHover = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { clientWidth, clientHeight } = currentTarget;
      const rect = currentTarget.getBoundingClientRect();

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

  return (
    <div className="flex w-[200px] flex-col items-center rounded-lg">
      <AlbumModal
        album={album}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <div
        className="album-image-container w-[200px] h-[200px] flex-shrink-0"
        ref={cardRef}
      >
        <Image
          src={imageLink || ""}
          alt={`Album Art: ${albumTitle}`}
          width={200}
          height={200}
          onClick={() => handleOpenModal()}
          className="album-image rounded-lg transition duration-300 ease-in-out hover:brightness-75 shadow-lg hover:shadow-xl cursor-pointer"
        />
      </div>
      <div className="flex flex-col flex-1 w-full min-w-0 py-2">
        <div className="flex justify-between">
          <label className="text-sm font-bold text-black">{rank}</label>
          <FontAwesomeIcon
            icon={faHeart}
            size="lg"
            className="flex cursor-pointer hover:brightness-75 transition"
            color={isFavorite ? "red" : "gray"}
            onClick={() => toggleFavorite(album.id)}
            width={15}
          />
        </div>
        <a href={albumLink} target="_blank" rel="noopener noreferrer">
          <label className="block cursor-pointer text-sm font-medium text-gray-900 truncate hover:underline w-full overflow-hidden">
            {albumTitle}
          </label>
        </a>
        <a
          href={artistLink}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <label className="inline-block cursor-pointer text-sm text-gray-600 truncate hover:underline w-full overflow-hidden">
            {artistName}
          </label>
        </a>
        {/* <label className="text-sm font-medium font-bold text-black">
          {releaseDate.getFullYear()}
        </label> */}
      </div>
    </div>
  );
}
