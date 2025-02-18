import { Album } from "@/types/album";
import React, { useEffect, useRef } from "react";

const DateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
};

interface Props {
    album: Album;
    isOpen: boolean;
    onClose: () => void;
}

export function AlbumModal({ album, isOpen, onClose }: Props) {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

    const dateString = album.releaseDate.toLocaleDateString('en-US', DateFormatOptions);

    return (
        <div
            className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="flex justify-center items-center min-h-screen">
                <div
                    ref={modalRef}
                    className="bg-white rounded-xl shadow-xl w-96 p-6"
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">{album.albumTitle}</h2>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <a href={album.albumLink} target="_blank" rel="noopener noreferrer">
                            <img
                                src={album.imageLink}
                                alt={album.albumTitle}
                                className="rounded-lg w-full h-48 object-cover cursor-pointer"
                            />
                        </a>
                        <div className="flex flex-col mt-4 text-left">
                            <p className="text-sm text-gray-600">
                                Release Date: {dateString}
                            </p>
                            <p className="text-sm text-gray-600">
                                Artist:{" "}
                                <a
                                    href={album.artistLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {album.artistName}
                                </a>
                            </p>
                            <p className="text-sm text-gray-600">Genre: {album.category}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
