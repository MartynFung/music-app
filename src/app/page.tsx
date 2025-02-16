
import useApi from "@/hooks/useApi";
import { Entry, ITunesResponse } from "@/types/itunesResponse";
import { AlbumList } from "./components/AlbumList";


export default async function Home() {
  const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
  const data: ITunesResponse = await response.json()

  // const { data, loading, error } = useApi<iTunesResponse>('https://api.example.com/data');
  // if (!data) {
  //   return "loading"
  // }

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  // console.log(responseData)
  const entries = data.feed.entry
  const firstEntry = entries[0]
  console.log(firstEntry)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="font-CharterITCW04-Black">Top Itunes Albums</h1>
        {/* <div className="flex items-center w-md">
          <div className="w-14 flex-1">Art</div>
          <div className="w-14 flex-1">Title</div>
          <div className="w-64 flex-1">Artist</div>
          <div className="w-32 flex-1">Artist Link</div>
        </div> */}

        <AlbumList albums={entries} />
        {/* <pre>{JSON.stringify(firstEntry, null, 2)}</pre> */}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
