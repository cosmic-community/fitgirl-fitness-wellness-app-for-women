import { getWorkouts, getPrograms, getCommunityContent } from '@/lib/cosmic'
import Header from '@/components/Header'
import WorkoutCard from '@/components/WorkoutCard'
import ProgramCard from '@/components/ProgramCard'
import CommunityCard from '@/components/CommunityCard'
import QuickActions from '@/components/QuickActions'
import Link from 'next/link'

export default async function HomePage() {
  // Fetch featured content
  const [workouts, programs, communityContent] = await Promise.all([
    getWorkouts(),
    getPrograms(),
    getCommunityContent()
  ])

  // Get featured items (first 3 of each)
  const featuredWorkouts = workouts.slice(0, 3)
  const featuredPrograms = programs.slice(0, 2)
  const featuredCommunity = communityContent.slice(0, 1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      
      {/* Hero Section */}
      <section className="text-center py-8 mb-8">
        <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
          Your Fitness Journey Starts Here
        </h1>
        <p className="text-lg text-secondary-600 mb-6 max-w-2xl mx-auto">
          Discover personalized workouts, nutrition guidance, and track your progress 
          in a supportive community designed for women.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/workouts" className="btn-primary">
            Start Workout
          </Link>
          <Link href="/programs" className="btn-secondary">
            View Programs
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <QuickActions />

      {/* Featured Community Content */}
      {featuredCommunity.length > 0 && (
        <section className="mb-10">
          <div className="card p-6 bg-gradient-secondary text-white">
            <h2 className="text-xl font-bold mb-4">Daily Motivation</h2>
            <CommunityCard item={featuredCommunity[0]} featured />
          </div>
        </section>
      )}

      {/* Featured Workouts */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-header">Featured Workouts</h2>
          <Link 
            href="/workouts" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>

      {/* Featured Programs */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-header">Popular Programs</h2>
          <Link 
            href="/programs" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-10">
        <div className="card p-8 text-center bg-gradient-to-r from-primary-500 to-accent-500 text-white">
          <h2 className="text-2xl font-bold mb-6">Join Thousands of Women</h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold">{workouts.length}+</div>
              <div className="text-primary-100">Workouts</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{programs.length}+</div>
              <div className="text-primary-100">Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-primary-100">Happy Users</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}