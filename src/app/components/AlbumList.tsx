"use client"

import { Entry } from "@/types/itunesResponse"
import { AlbumCard } from "@/app/components/AlbumCard"
import { InfiniteScroll, ScrollItem } from "@/app/components/InfiniteScroll";

interface Props {
    albums: Array<ScrollItem<Entry>>
}

export function AlbumList({ albums }: Props): React.JSX.Element {
    const renderItem = (album: ScrollItem<Entry>) => <AlbumCard key={album.id} album={album.data} rank={album.index} />;

    return (
        <div id="infinite-scroll-container" className="min-h-screen max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <InfiniteScroll items={albums} renderItem={renderItem} itemsPerPage={10} />
        </div>
    );
}