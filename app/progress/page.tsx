import { getProgressEntries } from '@/lib/cosmic'
import ProgressChart from '@/components/ProgressChart'
import ProgressForm from '@/components/ProgressForm'
import ProgressEntryCard from '@/components/ProgressEntryCard'

export default async function ProgressPage() {
  const progressEntries = await getProgressEntries()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">Progress Tracking</h1>
        <p className="text-lg text-secondary-600">
          Track your fitness journey and celebrate your achievements.
        </p>
      </div>

      {/* Progress Chart */}
      {progressEntries.length > 0 && (
        <div className="mb-8">
          <ProgressChart entries={progressEntries} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Form */}
        <div className="lg:col-span-1">
          <ProgressForm />
        </div>

        {/* Progress Entries */}
        <div className="lg:col-span-2">
          <h2 className="section-header">Recent Progress</h2>
          <div className="space-y-4">
            {progressEntries.length > 0 ? (
              progressEntries.map((entry) => (
                <ProgressEntryCard key={entry.id} entry={entry} />
              ))
            ) : (
              <div className="card p-8 text-center">
                <p className="text-secondary-500 text-lg mb-4">No progress entries yet.</p>
                <p className="text-secondary-400">Start tracking your journey today!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}