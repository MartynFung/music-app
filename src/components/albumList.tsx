"use client";

import { AlbumCard } from "@/components/albumCard";
import { Dropdown } from "@/components/dropdown";
import { InfiniteScroll, ScrollItem } from "@/components/infiniteScroll";
import { SearchInput } from "@/components/searchInput";
import { albumSortOptions, SortKey } from "@/constants/albumSort";
import { genreOptions } from "@/constants/genres";
import { Album } from "@/types/album";
import * as React from "react";

interface Props {
  albums: ScrollItem<Album>[];
}

export function AlbumList({ albums }: Props): React.JSX.Element {
  const [sortedAlbums, setSortedAlbums] = React.useState<ScrollItem<Album>[]>(
    []
  );
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [genre, setSelectedGenre] = React.useState<string | null>(null);

  const sortItems = React.useCallback(
    (
      items: ScrollItem<Album>[],
      key: string | null,
      searchVal: string | null
    ) => {
      if (key === SortKey.rank && !searchVal) {
        return items;
      }

      const lowercasedSearchText = searchValue.toLowerCase();
      const lowercasedGenre = genre?.toLocaleLowerCase() || "";
      const filteredItems = items.filter((item) => {
        const matchingAlbumTitle = item.data.albumTitle
          .toLowerCase()
          .includes(lowercasedSearchText);
        const matchingArtistName = item.data.artistName
          .toLowerCase()
          .includes(lowercasedSearchText);
        if (lowercasedGenre && lowercasedGenre !== "all") {
          return (
            item.data.genre.toLowerCase().includes(lowercasedGenre) &&
            (matchingAlbumTitle || matchingArtistName)
          );
        }
        return matchingAlbumTitle || matchingArtistName;
      });

      return filteredItems.sort((a, b) => {
        switch (key) {
          case SortKey.albumTitle:
            return a.data.albumTitle.localeCompare(b.data.albumTitle);
          case SortKey.artistName:
            return a.data.artistName.localeCompare(b.data.artistName);
          case SortKey.releaseDate:
            return b.data.releaseDate.getTime() - a.data.releaseDate.getTime();
          default:
            return 0;
        }
      });
    },
    [searchValue, genre]
  );

  React.useEffect(() => {
    const sortedItems = sortItems([...albums], sortKey, searchValue);
    setSortedAlbums(sortedItems);
  }, [sortKey, albums, searchValue, genre, sortItems]);

  function handleSelectSortOption(value: string) {
    setSortKey(value);
  }

  function handleSearchValueChange(value: string) {
    setSearchValue(value);
  }

  const renderItem = (album: ScrollItem<Album>) => (
    <AlbumCard key={album.id} album={album.data} rank={album.index} />
  );

  function renderListControls(): React.JSX.Element {
    return (
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <SearchInput
          searchValue={searchValue}
          setSearchValue={handleSearchValueChange}
          debounceTimeMs={200}
        />
        <Dropdown
          options={albumSortOptions}
          selectedOptionId={sortKey}
          handleSelectedOption={handleSelectSortOption}
          placeholderText="Sort by"
        />
        <Dropdown
          options={genreOptions}
          selectedOptionId={genre}
          handleSelectedOption={setSelectedGenre}
          placeholderText="Filter"
          menuTitleText="Filter by:"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-between pb-6 gap-2 sm:flex-row">
        <h1 className="text-xl font-bold text-black">Top Albums</h1>
        {renderListControls()}
      </div>
      <div
        id="infinite-scroll-container"
        className="min-h-screen max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 md:gap-8"
      >
        <InfiniteScroll
          items={sortedAlbums}
          renderItem={renderItem}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
