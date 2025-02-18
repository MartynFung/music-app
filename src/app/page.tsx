import { Entry, ITunesResponse } from "@/types/iTunesResponse";
import { AlbumList } from "@/components/albumList";
import { ScrollItem } from "@/components/infiniteScroll";
import { Album } from "@/types/album";

const iTunesTopAlbumsUrl =
  "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

export default async function Home(): Promise<React.JSX.Element> {
  const response = await fetch(iTunesTopAlbumsUrl);
  const data: ITunesResponse = await response.json();

  const albums: ScrollItem<Album>[] = data.feed.entry.map(
    (entry: Entry, index) => {
      const album: Album = {
        albumTitle: entry["im:name"].label || "",
        artistName: entry["im:artist"].label || "",
        artistLink: entry["im:artist"]?.attributes?.href || "", // TODO: Handle missing artist link
        albumLink: entry.link.attributes.href || "", // TODO: Handle missing Link
        images: entry["im:image"] || "",
        imageLink: entry["im:image"].at(-1)?.label || "", // TODO: Handle missing link
        releaseDate: new Date(entry["im:releaseDate"].attributes.label),
        category: entry.category.attributes.label,
      };

      const scrollItemAlbum: ScrollItem<Album> = {
        index: index + 1,
        id: entry.id.attributes["im:id"],
        data: album,
      };

      return scrollItemAlbum;
    }
  );

  const firstEntry = data.feed.entry[0];
  console.log(firstEntry);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <AlbumList albums={albums} />
      </main>
    </div>
  );
}
