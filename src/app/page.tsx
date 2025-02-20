import { fetchTopAlbums } from "@/api/fetchTopAlbums";
import { AlbumList } from "@/components/albumList";
import { FavoritesProvider } from "@/context/favoritesContext";
import { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const albums = await fetchTopAlbums();

  return (
    <FavoritesProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 bg-white">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <AlbumList albums={albums} />
        </main>
      </div>
    </FavoritesProvider>
  );
}
