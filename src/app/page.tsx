
import Image from "next/image";
import useApi from "@/hooks/useApi";
import { Entry, iTunesResponse } from "@/types/itunesResponse";

interface AlbumProps {
  entry: Entry
}

export function Album({ entry }: AlbumProps) {
  const albumTitle = entry["im:name"].label
  const artistName = entry["im:artist"].label
  const artistLink = entry["im:artist"]?.attributes?.href
  const albumLink = entry.link.attributes.href
  const images = entry["im:image"]
  const firstImageLink = images[0].label

  return <div className="flex w-full items-center p-2 rounded-lg shadow-sm border border-gray-200 bg-white hover:shadow-md transition-shadow m-2">
    <div className="w-14 flex-shrink-0">
      <a href={albumLink} target="_blank" rel="noopener noreferrer">
        {firstImageLink && <Image src={firstImageLink} alt="Album Art" width={100} height={100} className="rounded-md" />}
      </a>
    </div>
    <a href={albumLink} target="_blank" rel="noopener noreferrer">
      <div className="flex-1 px-4 text-sm font-medium text-gray-900 truncate hover:underline">{albumTitle}</div>
    </a>
    <div className="w-64 px-4 text-sm text-gray-600 truncate">
      <a href={artistLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
        {artistName}
      </a>
    </div>
  </div>
}

export default async function Home() {
  const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
  const data: iTunesResponse = await response.json()

  // const { data, loading, error } = useApi<iTunesResponse>('https://api.example.com/data');
  // if (!data) {
  //   return "loading"
  // }

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  // console.log(responseData)
  const entries = data.feed.entry
  const firstEntry = entries[0]

  // const albumTitle = firstEntry["im:name"].label
  // const artistName = firstEntry["im:artist"].label
  // const artistLink = firstEntry["im:artist"].attributes.href
  // const albumLink = firstEntry.link.attributes.href
  // const images = firstEntry["im:image"]
  // const firstImageLink = images[0].label

  // console.log(albumLink)
  console.log(firstEntry)
  // console.log({ firstImageLink })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="font-charter">Top Itunes Albums</h1>
        <div className="flex items-center w-md">
          <div className="w-14 flex-1 ...">Art</div>
          <div className="w-14 flex-1 ...">Title</div>
          <div className="w-64 flex-1 ...">Artist</div>
          <div className="w-32 flex-1 ...">Artist Link</div>
        </div>
        {entries.map((entry) => <Album key={entry.id.label} entry={entry} />)}

        {/* <pre>{JSON.stringify(firstEntry, null, 2)}</pre> */}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
