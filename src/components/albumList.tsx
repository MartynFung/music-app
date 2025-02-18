"use client"

import { AlbumCard } from "@/components/albumCard"
import { Dropdown, DropdownOption } from "@/components/dropdown";
import { InfiniteScroll, ScrollItem } from "@/components/infiniteScroll";
import { SearchInput } from "@/components/searchInput";
import { albumSortOptions, SortKey } from "@/constants/albumSort";
import { Album } from "@/types/album";
import * as React from "react";

interface Props {
    albums: ScrollItem<Album>[];
    genreOptions: DropdownOption[];
}

export function AlbumList({ albums, genreOptions }: Props): React.JSX.Element {
    const [sortedAlbums, setSortedAlbums] = React.useState<ScrollItem<Album>[]>([])
    const [sortKey, setSortKey] = React.useState<string | null>(null);
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [genre, setSelectedGenre] = React.useState<string | null>(null);

    const sortItems = (items: ScrollItem<Album>[], key: string | null, searchVal: string | null) => {
        if (key === SortKey.top && !searchVal) {
            return items;
        }

        const lowercasedSearchText = searchValue.toLowerCase();
        const lowercasedGenre = genre?.toLocaleLowerCase() || "";
        const filteredItems = items.filter((item) => {
            const matchingAlbumTitle = item.data.albumTitle.toLowerCase().includes(lowercasedSearchText);
            const matchingArtistName = item.data.artistName.toLowerCase().includes(lowercasedSearchText);
            if (lowercasedGenre && lowercasedGenre !== "all") {
                return (item.data.category.toLowerCase().includes(lowercasedGenre) && (matchingAlbumTitle || matchingArtistName))
            }
            return matchingAlbumTitle || matchingArtistName
        }
        )
        console.log({ lowercasedGenre })
        return filteredItems.sort((a, b) => {
            switch (key) {
                case SortKey.albumTitle:
                    return a.data.albumTitle.localeCompare(b.data.albumTitle);
                case SortKey.artistName:
                    return a.data.artistName.localeCompare(b.data.artistName);
                case SortKey.releaseDate:
                    // Sort newest to oldest
                    return b.data.releaseDate.getTime() - a.data.releaseDate.getTime();
                default:
                    return 0 // Default case if no valid sortKey is provided
            }
        });
    };

    React.useEffect(() => {
        const sortedItems = sortItems([...albums], sortKey, searchValue);
        setSortedAlbums(sortedItems)
    }, [sortKey, albums, searchValue, genre])

    function handleSelectSortOption(value: string) {
        setSortKey(value)
    }

    function handleSearchValueChange(value: string) {
        setSearchValue(value)
    }

    const renderItem = (album: ScrollItem<Album>) => <AlbumCard key={album.id} album={album.data} rank={album.index} />;

    return (
        <div>
            <div className="flex flex-col items-center justify-between pb-6 gap-2 sm:flex-row">
                <h1 className="text-xl font-bold">Top Albums</h1>
                <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                    <SearchInput searchValue={searchValue} setSearchValue={handleSearchValueChange} debounceTimeMs={0} />
                    <Dropdown options={albumSortOptions} selectedOptionId={sortKey} handleSelectedOption={handleSelectSortOption} placeholderText="Sort by" />
                    <Dropdown options={genreOptions} selectedOptionId={genre} handleSelectedOption={setSelectedGenre} placeholderText="Filter" firstItemText="Filter by:" />
                </div>
            </div>
            <div id="infinite-scroll-container" className="min-h-screen max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <InfiniteScroll items={sortedAlbums} renderItem={renderItem} itemsPerPage={10} />
            </div>
        </div>
    );
}