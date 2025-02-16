import { Entry } from "@/types/itunesResponse"
import { AlbumCard } from "@/app/components/AlbumCard"

interface AlbumListProps {
    albums: Array<Entry>
}

export function AlbumList({ albums }: AlbumListProps) {
    return (
        <div>
            {albums.map((album) => <AlbumCard key={album.id.label} album={album} />)}
        </div>)
}