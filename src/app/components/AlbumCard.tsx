import { Entry } from "@/types/itunesResponse"
import Image from "next/image";

interface Props {
    album: Entry
}

export function AlbumCard({ album }: Props) {
    const albumTitle = album["im:name"].label
    const artistName = album["im:artist"].label
    const artistLink = album["im:artist"]?.attributes?.href // TODO: Handle missing artist link
    const albumLink = album.link.attributes.href
    const images = album["im:image"]
    console.log({ images })
    const imageHeight = images.at(-1)?.attributes.height // TODO: Handle missing image link
    const imageLink = images.at(-1)?.label // TODO: Handle missing image link
    console.log({ imageHeight })

    return (
        <div className="flex flex-col items-center p-2 rounded-lg shadow-sm border border-gray-200 bg-white hover:shadow-md transition-shadow m-2">
            <div className="w-50 h-50 flex-shrink-0">
                <a href={albumLink} target="_blank" rel="noopener noreferrer">
                    {imageLink && <Image src={imageLink} alt="Album Art" width={170} height={170} className="rounded-md" />}
                </a>
            </div>
            <div className="flex flex-col flex-1">
                <div className="flex-1 px-4 text-sm font-medium text-gray-900 truncate hover:underline">
                    <a href={albumLink} target="_blank" rel="noopener noreferrer">
                        {albumTitle}
                    </a>
                </div>
                <div className="px-4 text-sm text-gray-600 truncate hover:underline">
                    <a href={artistLink} target="_blank" rel="noopener noreferrer" className="">
                        {artistName}
                    </a>
                </div>
            </div>
        </div>
    )
}