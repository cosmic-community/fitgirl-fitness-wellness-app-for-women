import { getWorkouts } from '@/lib/cosmic'
import WorkoutCard from '@/components/WorkoutCard'
import WorkoutFilter from '@/components/WorkoutFilter'

export default async function WorkoutsPage() {
  const workouts = await getWorkouts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">Workout Library</h1>
        <p className="text-lg text-secondary-600">
          Discover workouts designed to help you achieve your fitness goals.
        </p>
      </div>

      <WorkoutFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-secondary-500 text-lg">No workouts found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}