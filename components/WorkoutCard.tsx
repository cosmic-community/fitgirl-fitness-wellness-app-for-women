import { Workout } from '@/types'
import Link from 'next/link'

interface WorkoutCardProps {
  workout: Workout
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const difficultyColors = {
    beginner: 'badge-beginner',
    intermediate: 'badge-intermediate', 
    advanced: 'badge-advanced'
  }

  const typeColors = {
    strength: 'bg-purple-100 text-purple-800',
    yoga: 'bg-green-100 text-green-800',
    cardio: 'bg-red-100 text-red-800',
    hiit: 'bg-orange-100 text-orange-800'
  }

  return (
    <Link href={`/workouts/${workout.slug}`}>
      <div className="card-workout group cursor-pointer">
        {/* Workout Image */}
        <div className="relative mb-4">
          {workout.metadata.thumbnail_image ? (
            <img
              src={`${workout.metadata.thumbnail_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
              alt={workout.title}
              width={300}
              height={150}
              className="w-full h-40 object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-40 bg-gradient-secondary rounded-xl flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}
          
          {/* Duration badge */}
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-lg text-sm font-medium text-secondary-700">
            {workout.metadata.duration}m
          </div>
        </div>

        {/* Workout Info */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className={`badge ${typeColors[workout.metadata.workout_type]}`}>
              {workout.metadata.workout_type}
            </span>
            <span className={difficultyColors[workout.metadata.difficulty_level]}>
              {workout.metadata.difficulty_level}
            </span>
          </div>

          <h3 className="font-semibold text-lg text-secondary-900 group-hover:text-primary-600 transition-colors">
            {workout.title}
          </h3>

          <p className="text-secondary-600 text-sm line-clamp-2">
            {workout.metadata.description}
          </p>

          {/* Body parts */}
          {workout.metadata.body_part_focus && workout.metadata.body_part_focus.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {workout.metadata.body_part_focus.slice(0, 3).map((part, index) => (
                <span key={index} className="text-xs bg-secondary-100 text-secondary-600 px-2 py-1 rounded-lg">
                  {part}
                </span>
              ))}
              {workout.metadata.body_part_focus.length > 3 && (
                <span className="text-xs text-secondary-500">
                  +{workout.metadata.body_part_focus.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex justify-between text-sm text-secondary-500 pt-2 border-t border-secondary-100">
            <span>💪 {workout.metadata.difficulty_level}</span>
            {workout.metadata.calories_burned && (
              <span>🔥 {workout.metadata.calories_burned} cal</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}