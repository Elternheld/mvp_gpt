import Head from 'next/head'

export default function Home() {
  return (
    <div className="p-10">
      <Head>
        <title>ElternHeld</title>
      </Head>
      <h1 className="text-4xl font-bold text-center mb-4">Willkommen bei ElternHeld</h1>
      <p className="text-center text-gray-600">Starte jetzt deinen Aktivitäts-Generator.</p>
    </div>
  )
}