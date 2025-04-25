import Head from 'next/head'
import ActivityFetcher from '../components/ActivityFetcher'
import TestComponent from '../components/TestComponent'

export default function Home() {
  return (
    <>
      <Head>
        <title>ElternHeld</title>
      </Head>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Willkommen bei ElternHeld</h1>
        <p className="text-center text-gray-600 mb-8">
          Starte jetzt deinen Aktivitäts-Generator.
        </p>
        <div className="w-full max-w-xl mb-8">
          <ActivityFetcher />
        </div>
        <div className="w-full max-w-xl">
          <h2 className="text-2xl font-semibold text-center mb-4">Test the Toast Notifications</h2>
          <TestComponent />
        </div>
      </main>
    </>
  )
}