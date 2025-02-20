import { Album } from "@/types/album";
import { JSX, useEffect, useRef } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlbumImage } from "@/components/albumImage/albumImage";

const DateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

interface Props {
  album: Album;
  isOpen: boolean;
  onClose: () => void;
}

export function AlbumModal({ album, isOpen, onClose }: Props): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const {
    imageLink,
    albumLink,
    albumTitle,
    artistLink,
    artistName,
    genre,
    releaseDate,
  } = album;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const dateString = releaseDate.toLocaleDateString("en-US", DateFormatOptions);

  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex justify-center items-center min-h-screen">
        <div ref={modalRef} className="bg-white rounded-xl shadow-xl w-96 p-6">
          <div className="flex justify-center items-center relative">
            <h2 className="text-xl font-bold mx-6 text-black">{albumTitle}</h2>
            <button
              className="absolute top-1 right-1 text-gray-600 hover:text-black"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} size="lg" className="flex" />
            </button>
          </div>
          <div className="flex flex-col items-center mt-4">
            <AlbumImage
              imageLink={imageLink}
              albumTitle={albumTitle}
              handleClick={() =>
                window.open(albumLink, "_blank", "noopener,noreferrer")
              }
            />
            <div className="flex flex-col mt-4 text-center">
              <p className="text-md text-rose-500">
                <a
                  href={artistLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {artistName}
                </a>
              </p>
              <p className="text-sm text-black">{genre}</p>
              <p className="text-sm text-gray-600">{dateString}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
