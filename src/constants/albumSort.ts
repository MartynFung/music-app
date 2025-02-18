import { DropdownOption } from "@/components/dropdown";

export enum SortKey {
    default = "default",
    albumTitle = "albumTitle",
    artistName = "artistName",
    releaseDate = "releaseDate"
}

export const albumSortOptions: DropdownOption[] = [
    {
        id: SortKey.default,
        value: SortKey.default
    },
    {
        id: SortKey.default,
        value: SortKey.default
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