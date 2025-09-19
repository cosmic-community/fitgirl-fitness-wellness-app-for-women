import { getWorkoutBySlug, getWorkouts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface WorkoutPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const workouts = await getWorkouts()
  return workouts.map((workout) => ({
    slug: workout.slug,
  }))
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { slug } = await params
  const workout = await getWorkoutBySlug(slug)

  if (!workout) {
    notFound()
  }

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800', 
    advanced: 'bg-red-100 text-red-800'
  }

  const typeColors = {
    strength: 'bg-purple-100 text-purple-800',
    yoga: 'bg-green-100 text-green-800',
    cardio: 'bg-red-100 text-red-800',
    hiit: 'bg-orange-100 text-orange-800'
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link 
        href="/workouts" 
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Workouts
      </Link>

      <div className="card p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Workout Image */}
          <div className="space-y-4">
            {workout.metadata.thumbnail_image ? (
              <img
                src={`${workout.metadata.thumbnail_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                alt={workout.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-64 bg-gradient-secondary rounded-xl flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}

            {/* Video Link */}
            {workout.metadata.video_link && (
              <a
                href={workout.metadata.video_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center inline-block"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16h1m4 0h1m-7-4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Video
              </a>
            )}
          </div>

          {/* Workout Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-4">{workout.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`badge ${typeColors[workout.metadata.workout_type]}`}>
                  {workout.metadata.workout_type.toUpperCase()}
                </span>
                <span className={`badge ${difficultyColors[workout.metadata.difficulty_level]}`}>
                  {workout.metadata.difficulty_level}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">{workout.metadata.duration}</div>
                <div className="text-sm text-secondary-600">Minutes</div>
              </div>
              {workout.metadata.calories_burned && (
                <div className="bg-accent-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-accent-600">{workout.metadata.calories_burned}</div>
                  <div className="text-sm text-secondary-600">Calories</div>
                </div>
              )}
            </div>

            {/* Body Parts */}
            {workout.metadata.body_part_focus && workout.metadata.body_part_focus.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Target Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {workout.metadata.body_part_focus.map((part, index) => (
                    <span key={index} className="badge bg-secondary-100 text-secondary-700">
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment */}
            {workout.metadata.equipment_needed && workout.metadata.equipment_needed.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Equipment Needed</h3>
                <div className="flex flex-wrap gap-2">
                  {workout.metadata.equipment_needed.map((equipment, index) => (
                    <span key={index} className="badge bg-primary-100 text-primary-700">
                      {equipment}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">About This Workout</h3>
              <p className="text-secondary-700 leading-relaxed">
                {workout.metadata.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="btn-primary w-full">
                Start Workout
              </button>
              <button className="btn-secondary w-full">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}