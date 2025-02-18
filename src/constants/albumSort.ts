import { DropdownOption } from "@/components/dropdown";

export enum SortKey {
    top = "Top",
    albumTitle = "Album Title",
    artistName = "Artist Name",
    releaseDate = "Release Date"
}

export const albumSortOptions: DropdownOption[] = [
    {
        id: SortKey.top,
        value: SortKey.top
    },
    {
        id: SortKey.albumTitle,
        value: SortKey.albumTitle
    },
    {
        id: SortKey.artistName,
        value: SortKey.artistName
    },
    {
        id: SortKey.releaseDate,
        value: SortKey.releaseDate
    },
]