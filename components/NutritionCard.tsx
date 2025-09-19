import { NutritionTip } from '@/types'

interface NutritionCardProps {
  tip: NutritionTip
}

export default function NutritionCard({ tip }: NutritionCardProps) {
  const mealTypeColors = {
    breakfast: 'bg-yellow-100 text-yellow-800',
    lunch: 'bg-green-100 text-green-800', 
    dinner: 'bg-blue-100 text-blue-800',
    snack: 'bg-purple-100 text-purple-800'
  }

  return (
    <div className="card-workout">
      {/* Meal Image */}
      <div className="relative mb-4">
        {tip.metadata.image ? (
          <img
            src={`${tip.metadata.image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
            alt={tip.metadata.meal_idea}
            width={300}
            height={150}
            className="w-full h-40 object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        )}
        
        {/* Meal type badge */}
        <div className="absolute top-3 left-3">
          <span className={`badge ${mealTypeColors[tip.metadata.meal_type]}`}>
            {tip.metadata.meal_type}
          </span>
        </div>
      </div>

      {/* Meal Info */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-secondary-900 mb-2">
            {tip.metadata.meal_idea}
          </h3>
          
          {tip.content && (
            <p className="text-secondary-600 text-sm line-clamp-2">
              {tip.content}
            </p>
          )}
        </div>

        {/* Nutrition Stats */}
        <div className="bg-secondary-50 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="text-center">
              <div className="text-xl font-bold text-primary-600">
                {tip.metadata.calories}
              </div>
              <div className="text-xs text-secondary-500">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-secondary-700">
                {tip.metadata.servings}
              </div>
              <div className="text-xs text-secondary-500">Servings</div>
            </div>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-white rounded-lg">
              <div className="font-semibold text-secondary-700">
                {tip.metadata.macros.protein}g
              </div>
              <div className="text-secondary-500">Protein</div>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <div className="font-semibold text-secondary-700">
                {tip.metadata.macros.carbs}g
              </div>
              <div className="text-secondary-500">Carbs</div>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <div className="font-semibold text-secondary-700">
                {tip.metadata.macros.fat}g
              </div>
              <div className="text-secondary-500">Fat</div>
            </div>
          </div>
        </div>

        {/* Preparation time if available */}
        {tip.metadata.preparation_time && (
          <div className="flex items-center text-sm text-secondary-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {tip.metadata.preparation_time} min prep
          </div>
        )}
      </div>
    </div>
  )
}