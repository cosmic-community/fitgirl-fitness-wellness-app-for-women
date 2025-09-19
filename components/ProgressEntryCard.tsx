import { ProgressEntry } from '@/types'

interface ProgressEntryCardProps {
  entry: ProgressEntry
}

export default function ProgressEntryCard({ entry }: ProgressEntryCardProps) {
  const { date, weight, measurements, energy_level, mood, notes } = entry.metadata

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getMoodEmoji = (mood: string) => {
    const emojiMap: { [key: string]: string } = {
      excellent: '😊',
      good: '🙂',
      okay: '😐',
      tired: '😴',
      stressed: '😰'
    }
    return emojiMap[mood] || '😐'
  }

  const getEnergyStars = (level: number) => {
    return '⭐'.repeat(level) + '☆'.repeat(5 - level)
  }

  return (
    <div className="card p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-secondary-800">{formatDate(date)}</h3>
          <p className="text-sm text-secondary-500">{entry.created_at ? new Date(entry.created_at).toLocaleDateString() : ''}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-secondary-600">Mood:</span>
          <span className="text-lg">{getMoodEmoji(mood || 'okay')}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Weight */}
        {weight && weight > 0 && (
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">{weight}</div>
            <div className="text-xs text-secondary-600">lbs</div>
          </div>
        )}

        {/* Energy Level */}
        {energy_level && (
          <div className="text-center p-3 bg-accent-50 rounded-lg">
            <div className="text-lg">{getEnergyStars(energy_level)}</div>
            <div className="text-xs text-secondary-600">Energy</div>
          </div>
        )}

        {/* Key Measurements */}
        {measurements?.waist && (
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-semibold text-secondary-700">{measurements.waist}"</div>
            <div className="text-xs text-secondary-600">Waist</div>
          </div>
        )}

        {measurements?.hips && (
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-semibold text-secondary-700">{measurements.hips}"</div>
            <div className="text-xs text-secondary-600">Hips</div>
          </div>
        )}
      </div>

      {/* All Measurements */}
      {measurements && Object.keys(measurements).length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-secondary-700 mb-2">Measurements</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(measurements).map(([key, value]) => (
              value && (
                <span key={key} className="px-3 py-1 bg-secondary-100 rounded-full text-sm">
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}"
                </span>
              )
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {notes && (
        <div className="border-t border-secondary-200 pt-4">
          <h4 className="text-sm font-medium text-secondary-700 mb-2">Notes</h4>
          <p className="text-secondary-600 text-sm leading-relaxed">{notes}</p>
        </div>
      )}

      {/* Empty state */}
      {!weight && !measurements && !notes && (
        <div className="text-center py-4 text-secondary-500">
          <p className="text-sm">Basic entry logged</p>
        </div>
      )}
    </div>
  )
}