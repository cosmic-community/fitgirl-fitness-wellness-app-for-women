import { getNutritionTips } from '@/lib/cosmic'
import NutritionCard from '@/components/NutritionCard'

export default async function NutritionPage() {
  const nutritionTips = await getNutritionTips()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">Nutrition Tips</h1>
        <p className="text-lg text-secondary-600">
          Healthy meal ideas to fuel your fitness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nutritionTips.length > 0 ? (
          nutritionTips.map((tip) => (
            <NutritionCard key={tip.id} tip={tip} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-secondary-500 text-lg">No nutrition tips found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}