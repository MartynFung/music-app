"use client";

import { AlbumCard } from "@/components/albumCard";
import { Dropdown } from "@/components/dropdown";
import { InfiniteScroll, ScrollItem } from "@/components/infiniteScroll";
import { SearchInput } from "@/components/searchInput";
import { albumSortOptions, SortKey } from "@/constants/albumSort";
import {
  FavoritesOption,
  FilterOptions,
  AllOption,
} from "@/constants/filterOptions";
import { Album } from "@/types/album";
import { useState, useCallback, useEffect, JSX } from "react";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "@/context/favoritesContext";

const allOptionLowercased = AllOption.id.toLowerCase();
const favoritesOptionLowercased = FavoritesOption.id.toLowerCase();

interface Props {
  albums: ScrollItem<Album>[];
}

export function AlbumList({ albums }: Props): JSX.Element {
  const [sortedAlbums, setSortedAlbums] = useState<ScrollItem<Album>[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilterOption] = useState<string | null>(null);
  const { favorites } = useFavorites();

  const sortItems = useCallback(
    (items: ScrollItem<Album>[]) => {
      if (!filter && !sortKey && !searchValue) {
        // Exit early for performance if no filters or sort
        return items;
      }
      const lowercasedSearchText = searchValue.toLowerCase();
      const filterBy = filter?.toLowerCase() || "";

      const filteredItems = items.filter((item) => {
        const matchingAlbumTitle = item.data.albumTitle
          .toLowerCase()
          .includes(lowercasedSearchText);

        const matchingArtistName = item.data.artistName
          .toLowerCase()
          .includes(lowercasedSearchText);

        const searchCondition = matchingAlbumTitle || matchingArtistName;

        // Filter by Favorites & serach
        if (filterBy === favoritesOptionLowercased) {
          return favorites.has(item.id) && searchCondition;
        }

        // Filter by Genre & serach
        if (
          filterBy &&
          filterBy !== allOptionLowercased &&
          filterBy !== favoritesOptionLowercased
        ) {
          return (
            item.data.genre.toLowerCase().includes(filterBy) && searchCondition
          );
        }
        // Filter by Search
        return searchCondition;
      });

      if (!sortKey) {
        return filteredItems;
      }
      return filteredItems.sort((a, b) => {
        switch (sortKey) {
          case SortKey.rank:
            return a.index - b.index;
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
    [searchValue, filter, sortKey]
  );

  useEffect(() => {
    const sortedItems = sortItems([...albums]);
    setSortedAlbums(sortedItems);
  }, [sortKey, albums, searchValue, filter, sortItems]);

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
          placeholderText="Sort"
          icon={faSort}
        />
        <Dropdown
          options={FilterOptions}
          selectedOptionId={filter}
          handleSelectedOption={setFilterOption}
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
