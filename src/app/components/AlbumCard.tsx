import { Entry } from "@/types/itunesResponse"
import Image from "next/image";

interface Props {
    album: Entry;
    rank: number;
}

export function AlbumCard({ album, rank }: Props): React.JSX.Element {
    const albumTitle = album["im:name"].label
    const artistName = album["im:artist"].label
    const artistLink = album["im:artist"]?.attributes?.href // TODO: Handle missing artist link
    const albumLink = album.link.attributes.href
    const images = album["im:image"]
    const imageHeight = images.at(-1)?.attributes.height // TODO: Handle missing image link
    const imageLink = images.at(-1)?.label // TODO: Handle missing image link

    return (
        <div className="flex w-[200px] flex-col items-center rounded-lg w-full">
            <div className="w-[200px] h-[200px] flex-shrink-0">
                <a href={albumLink} target="_blank" rel="noopener noreferrer">
                    {imageLink && <Image src={imageLink} alt={`Album Art: ${albumTitle}`} width={200} height={200} className="rounded-lg transition duration-300 ease-in-out hover:brightness-75 shadow-lg hover:shadow-xl " />}
                </a>
            </div>
            <div className="flex flex-col flex-1 w-full min-w-0 py-2">
                <label className="text-sm font-medium font-bold">{rank}</label>
                <a href={albumLink} target="_blank" rel="noopener noreferrer">
                    <label className="block cursor-pointer text-sm font-medium text-gray-900 truncate hover:underline w-full overflow-hidden">
                        {albumTitle}
                    </label>
                </a>
                <a href={artistLink} target="_blank" rel="noopener noreferrer" className="">
                    <label className="inline-block cursor-pointer text-sm text-gray-600 truncate hover:underline w-full overflow-hidden">
                        {artistName}
                    </label>
                </a>
            </div>
        </div>

    )
}