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
    const firstImageLink = images.at(-1)?.label // TODO: Handle missing image link

    return <div className="flex w-full items-center p-2 rounded-lg shadow-sm border border-gray-200 bg-white hover:shadow-md transition-shadow m-2">
        <div className="w-14 flex-shrink-0">
            <a href={albumLink} target="_blank" rel="noopener noreferrer">
                {firstImageLink && <Image src={firstImageLink} alt="Album Art" width={100} height={100} className="rounded-md" />}
            </a>
        </div>
        <a href={albumLink} target="_blank" rel="noopener noreferrer">
            <div className="flex-1 px-4 text-sm font-medium text-gray-900 truncate hover:underline">{albumTitle}</div>
        </a>
        <div className="w-64 px-4 text-sm text-gray-600 truncate">
            <a href={artistLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {artistName}
            </a>
        </div>
    </div>
}