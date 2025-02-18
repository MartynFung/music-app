import { Album } from "@/types/album";
import Image from "next/image";

interface Props {
    album: Album;
    rank: number;
}

export function AlbumCard({ album, rank }: Props): React.JSX.Element {
    const { albumTitle, albumLink, artistName, imageLink, artistLink, releaseDate } = album

    return (
        <div className="flex w-[200px] flex-col items-center rounded-lg w-full">
            <div className="w-[200px] h-[200px] flex-shrink-0">
                <a href={albumLink} target="_blank" rel="noopener noreferrer">
                    {imageLink && <Image
                        src={imageLink}
                        alt={`Album Art: ${albumTitle}`}
                        width={200}
                        height={200}
                        priority={true}
                        className="rounded-lg transition duration-300 ease-in-out hover:brightness-75 shadow-lg hover:shadow-xl object-cover" />}
                </a>
            </div>
            <div className="flex flex-col flex-1 w-full min-w-0 py-2">
                <label className="text-sm font-medium font-bold">{rank}</label>
                {/* <label className="text-sm font-medium font-bold">{releaseDate.toDateString()}</label> */}
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