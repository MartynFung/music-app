import Image from "next/image";

export default async function Home() {
  const data = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
  const responseData = await data.json()
  // console.log(responseData)
  const entries = responseData.feed.entry
  const firstEntry = entries[0]

  const albumTitle = firstEntry.title.label
  const artistName = firstEntry["im:artist"].label
  const artistLink = firstEntry["im:artist"].attributes.href
  const albumLink = firstEntry.link.href
  const images = firstEntry["im:image"]
  const firstImageLink = images[0].label

  console.log(albumLink)
  console.log(firstEntry)
  console.log({ firstImageLink })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Top Itunes Songs</h1>
        <p>Album Title: {albumTitle}</p>
        <p>Artist Name: {artistName}</p>
        <p>Artist Link: {artistLink}</p>
        <p>Album Cover Image: { }</p>
        {firstImageLink && <Image src={firstImageLink} alt={"Album Art"} width={100} height={100} />}
        {/* <pre>{JSON.stringify(firstEntry, null, 2)}</pre> */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
