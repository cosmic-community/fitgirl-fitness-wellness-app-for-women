import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitGirl - Fitness & Wellness App for Women',
  description: 'Your personal fitness companion with workouts, programs, nutrition tips, and progress tracking designed specifically for women.',
  keywords: ['fitness', 'women', 'workout', 'health', 'wellness', 'nutrition', 'progress tracking'],
  authors: [{ name: 'FitGirl Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ec4899',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <body className={inter.className}>
        <script src="/dashboard-console-capture.js" />
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <main className="pb-20 md:pb-4">
            {children}
          </main>
          <Navigation />
          <CosmicBadge bucketSlug={bucketSlug} />
        </div>
      </body>
    </html>
  )
}