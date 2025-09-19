import { Program } from '@/types'
import Link from 'next/link'

interface ProgramCardProps {
  program: Program
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const goalColors = {
    'fat-loss': 'bg-red-100 text-red-800',
    'toning': 'bg-pink-100 text-pink-800',
    'strength': 'bg-purple-100 text-purple-800',
    'flexibility': 'bg-green-100 text-green-800'
  }

  const difficultyColors = {
    beginner: 'badge-beginner',
    intermediate: 'badge-intermediate',
    advanced: 'badge-advanced'
  }

  return (
    <div className="card-workout group cursor-pointer">
      {/* Program Image */}
      <div className="relative mb-4">
        {program.metadata.program_image ? (
          <img
            src={`${program.metadata.program_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
            alt={program.title}
            width={300}
            height={150}
            className="w-full h-40 object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-40 bg-gradient-primary rounded-xl flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        
        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-lg text-sm font-medium text-secondary-700">
          {program.metadata.duration_weeks} weeks
        </div>
      </div>

      {/* Program Info */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className={`badge ${goalColors[program.metadata.goal]}`}>
            {program.metadata.goal.replace('-', ' ')}
          </span>
          <span className={difficultyColors[program.metadata.difficulty_level]}>
            {program.metadata.difficulty_level}
          </span>
        </div>

        <h3 className="font-semibold text-lg text-secondary-900 group-hover:text-primary-600 transition-colors">
          {program.title}
        </h3>

        <p className="text-secondary-600 text-sm line-clamp-2">
          {program.metadata.description}
        </p>

        {/* Program Stats */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-secondary-100">
          <div className="text-center">
            <div className="text-lg font-bold text-primary-600">
              {program.metadata.duration_weeks}
            </div>
            <div className="text-xs text-secondary-500">Weeks</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent-600">
              {program.metadata.linked_workouts?.length || 0}
            </div>
            <div className="text-xs text-secondary-500">Workouts</div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full btn-primary text-sm py-2">
          Start Program
        </button>
      </div>
    </div>
  )
}