import { Album } from "@/types/album";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

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
    const { imageLink, albumLink, albumTitle, artistLink, artistName, category, releaseDate } = album

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

    const dateString = releaseDate.toLocaleDateString('en-US', DateFormatOptions);

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
                    <div className="flex justify-center items-center">
                        <h2 className="text-xl font-bold">{albumTitle}</h2>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <a href={albumLink} target="_blank" rel="noopener noreferrer">
                            <Image
                                src={imageLink || ""}
                                alt={`Album Art: ${albumTitle}`}
                                width={200}
                                height={200}
                                className="rounded-lg transition duration-300 ease-in-out hover:brightness-75 shadow-lg hover:shadow-xl cursor-pointer" />
                        </a>
                        <div className="flex flex-col mt-4 text-center gap-1">
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
                            <p className="text-sm text-gray-600">{category}</p>
                            <p className="text-sm text-gray-600">
                                {dateString}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
