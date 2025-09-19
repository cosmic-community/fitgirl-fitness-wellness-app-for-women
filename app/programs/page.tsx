import { getPrograms } from '@/lib/cosmic'
import ProgramCard from '@/components/ProgramCard'

export default async function ProgramsPage() {
  const programs = await getPrograms()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">Fitness Programs</h1>
        <p className="text-lg text-secondary-600">
          Structured programs to help you reach your specific fitness goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.length > 0 ? (
          programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-secondary-500 text-lg">No programs found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}