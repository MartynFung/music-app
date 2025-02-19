import { Entry, ITunesResponse } from "@/types/iTunesResponse2";
import { ScrollItem } from "@/components/infiniteScroll";
import { Album } from "@/types/album";

const iTunesTopAlbumsUrl =
  "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

export async function fetchTopAlbums(): Promise<ScrollItem<Album>[]> {
  try {
    const response = await fetch(iTunesTopAlbumsUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.statusText}`);
    }

    const data: ITunesResponse = await response.json();
    return data.feed.entry.map((entry: Entry, index) => {
      const album: Album = {
        id: entry.id.attributes["im:id"],
        albumTitle: entry["im:name"].label || "",
        artistName: entry["im:artist"].label || "",
        artistLink: entry["im:artist"]?.attributes?.href || "",
        albumLink: entry.link.attributes.href || "",
        images: entry["im:image"] || "",
        imageLink: entry["im:image"].at(-1)?.label || "",
        releaseDate: new Date(entry["im:releaseDate"].attributes.label),
        genre: entry.category.attributes.label,
      };

      return {
        index: index + 1,
        id: entry.id.attributes["im:id"],
        data: album,
      };
    });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
}
