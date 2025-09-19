'use client'

import { useState } from 'react'
import { WorkoutType, DifficultyLevel } from '@/types'

interface WorkoutFilterProps {
  onFilterChange?: (filters: {
    type: WorkoutType | 'all'
    difficulty: DifficultyLevel | 'all'
    duration: string
  }) => void
}

export default function WorkoutFilter({ onFilterChange }: WorkoutFilterProps) {
  const [filters, setFilters] = useState({
    type: 'all' as WorkoutType | 'all',
    difficulty: 'all' as DifficultyLevel | 'all',
    duration: 'all'
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const workoutTypes: { value: WorkoutType | 'all'; label: string; emoji: string }[] = [
    { value: 'all', label: 'All Types', emoji: '🏃‍♀️' },
    { value: 'strength', label: 'Strength', emoji: '💪' },
    { value: 'cardio', label: 'Cardio', emoji: '❤️' },
    { value: 'yoga', label: 'Yoga', emoji: '🧘‍♀️' },
    { value: 'hiit', label: 'HIIT', emoji: '🔥' }
  ]

  const difficultyLevels: { value: DifficultyLevel | 'all'; label: string; emoji: string }[] = [
    { value: 'all', label: 'All Levels', emoji: '⭐' },
    { value: 'beginner', label: 'Beginner', emoji: '🌱' },
    { value: 'intermediate', label: 'Intermediate', emoji: '🚀' },
    { value: 'advanced', label: 'Advanced', emoji: '🏆' }
  ]

  const durations = [
    { value: 'all', label: 'Any Duration' },
    { value: '0-15', label: '0-15 min' },
    { value: '15-30', label: '15-30 min' },
    { value: '30-45', label: '30-45 min' },
    { value: '45+', label: '45+ min' }
  ]

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-lg font-semibold text-secondary-800 mb-4">Filter Workouts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Workout Type */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-3">
            Workout Type
          </label>
          <div className="space-y-2">
            {workoutTypes.map(type => (
              <label key={type.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="workoutType"
                  value={type.value}
                  checked={filters.type === type.value}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="text-primary-500 focus:ring-primary-300"
                />
                <span className="text-lg">{type.emoji}</span>
                <span className="text-secondary-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-3">
            Difficulty Level
          </label>
          <div className="space-y-2">
            {difficultyLevels.map(level => (
              <label key={level.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="difficulty"
                  value={level.value}
                  checked={filters.difficulty === level.value}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="text-primary-500 focus:ring-primary-300"
                />
                <span className="text-lg">{level.emoji}</span>
                <span className="text-secondary-700">{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-3">
            Duration
          </label>
          <select
            value={filters.duration}
            onChange={(e) => handleFilterChange('duration', e.target.value)}
            className="w-full input-field"
          >
            {durations.map(duration => (
              <option key={duration.value} value={duration.value}>
                {duration.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Summary */}
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.type !== 'all' && (
          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
            Type: {workoutTypes.find(t => t.value === filters.type)?.label}
          </span>
        )}
        {filters.difficulty !== 'all' && (
          <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm">
            Level: {difficultyLevels.find(d => d.value === filters.difficulty)?.label}
          </span>
        )}
        {filters.duration !== 'all' && (
          <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
            Duration: {durations.find(d => d.value === filters.duration)?.label}
          </span>
        )}
      </div>

      {/* Clear Filters */}
      {(filters.type !== 'all' || filters.difficulty !== 'all' || filters.duration !== 'all') && (
        <div className="mt-4">
          <button
            onClick={() => {
              const resetFilters = { type: 'all' as const, difficulty: 'all' as const, duration: 'all' }
              setFilters(resetFilters)
              onFilterChange?.(resetFilters)
            }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}