import { DropdownOption } from "@/components/dropdown";

export enum SortKey {
  rank = "Rank",
  albumTitle = "Album Title",
  artistName = "Artist Name",
  releaseDate = "Release Date",
}

export const albumSortOptions: DropdownOption[] = [
  {
    id: SortKey.rank,
    value: SortKey.rank,
  },
  {
    id: SortKey.albumTitle,
    value: SortKey.albumTitle,
  },
  {
    id: SortKey.artistName,
    value: SortKey.artistName,
  },
  {
    id: SortKey.releaseDate,
    value: SortKey.releaseDate,
  },
];
