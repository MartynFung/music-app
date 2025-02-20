"use client";

import { AlbumCard } from "@/components/albumCard";
import { Dropdown } from "@/components/dropdown";
import { InfiniteScroll, ScrollItem } from "@/components/infiniteScroll";
import { SearchInput } from "@/components/searchInput";
import { albumSortOptions, SortKey } from "@/constants/albumSort";
import { genreOptions } from "@/constants/genres";
import { Album } from "@/types/album";
import { useState, useCallback, useEffect, JSX } from "react";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";

interface Props {
  albums: ScrollItem<Album>[];
}

export function AlbumList({ albums }: Props): JSX.Element {
  const [sortedAlbums, setSortedAlbums] = useState<ScrollItem<Album>[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [genre, setSelectedGenre] = useState<string | null>(null);

  const sortItems = useCallback(
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

  useEffect(() => {
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

  function renderListControls(): JSX.Element {
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
          icon={faSort}
        />
        <Dropdown
          options={genreOptions}
          selectedOptionId={genre}
          handleSelectedOption={setSelectedGenre}
          placeholderText="Filter"
          menuTitleText="Filter by:"
          icon={faFilter}
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
        className="min-h-screen max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 md:gap-8 auto-rows-min"
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
