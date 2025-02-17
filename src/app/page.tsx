
import { Entry, ITunesResponse } from "@/types/itunesResponse";
import { AlbumList } from "@/app/components/AlbumList";


export default async function Home(): Promise<React.JSX.Element> {
  const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
  const data: ITunesResponse = await response.json()

  const entries = data.feed.entry.map((entry: Entry, index) => {
    return {
      index: index + 1,
      id: entry.id.attributes["im:id"],
      data: entry
    }
  })
  const firstEntry = entries[0]
  console.log(firstEntry)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-xl font-bold">Top Albums</h1>
        <AlbumList albums={entries} />
        {/* <pre>{JSON.stringify(firstEntry, null, 2)}</pre> */}
      </main>
    </div>
  );
}
