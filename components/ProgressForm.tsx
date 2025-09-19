'use client'

import { useState } from 'react'
import { createProgressEntry } from '@/lib/cosmic'

export default function ProgressForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    waist: '',
    hips: '',
    chest: '',
    arms: '',
    thighs: '',
    completed_workouts: [] as string[],
    notes: '',
    energy_level: 3 as 1 | 2 | 3 | 4 | 5,
    mood: 'okay' as 'excellent' | 'good' | 'okay' | 'tired' | 'stressed'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const measurements: { [key: string]: number } = {}
      if (formData.waist) measurements.waist = parseFloat(formData.waist)
      if (formData.hips) measurements.hips = parseFloat(formData.hips)
      if (formData.chest) measurements.chest = parseFloat(formData.chest)
      if (formData.arms) measurements.arms = parseFloat(formData.arms)
      if (formData.thighs) measurements.thighs = parseFloat(formData.thighs)

      await createProgressEntry({
        date: formData.date,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        measurements: Object.keys(measurements).length > 0 ? measurements : undefined,
        completed_workouts: formData.completed_workouts,
        notes: formData.notes || undefined,
        energy_level: formData.energy_level,
        mood: formData.mood
      })

      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        waist: '',
        hips: '',
        chest: '',
        arms: '',
        thighs: '',
        completed_workouts: [],
        notes: '',
        energy_level: 3,
        mood: 'okay'
      })

      // Refresh page to show new entry
      window.location.reload()
    } catch (error) {
      console.error('Error submitting progress:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card p-6">
      <h2 className="section-header">Log Progress</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-secondary-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="input-field"
            required
          />
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-secondary-700 mb-2">
            Weight (lbs)
          </label>
          <input
            type="number"
            id="weight"
            step="0.1"
            value={formData.weight}
            onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
            className="input-field"
            placeholder="e.g., 135.5"
          />
        </div>

        {/* Measurements */}
        <div>
          <h3 className="text-sm font-medium text-secondary-700 mb-3">Measurements (inches)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="waist" className="block text-xs text-secondary-600 mb-1">
                Waist
              </label>
              <input
                type="number"
                id="waist"
                step="0.1"
                value={formData.waist}
                onChange={(e) => setFormData(prev => ({ ...prev, waist: e.target.value }))}
                className="input-field"
                placeholder="28.5"
              />
            </div>
            <div>
              <label htmlFor="hips" className="block text-xs text-secondary-600 mb-1">
                Hips
              </label>
              <input
                type="number"
                id="hips"
                step="0.1"
                value={formData.hips}
                onChange={(e) => setFormData(prev => ({ ...prev, hips: e.target.value }))}
                className="input-field"
                placeholder="36.0"
              />
            </div>
            <div>
              <label htmlFor="chest" className="block text-xs text-secondary-600 mb-1">
                Chest
              </label>
              <input
                type="number"
                id="chest"
                step="0.1"
                value={formData.chest}
                onChange={(e) => setFormData(prev => ({ ...prev, chest: e.target.value }))}
                className="input-field"
                placeholder="34.0"
              />
            </div>
            <div>
              <label htmlFor="arms" className="block text-xs text-secondary-600 mb-1">
                Arms
              </label>
              <input
                type="number"
                id="arms"
                step="0.1"
                value={formData.arms}
                onChange={(e) => setFormData(prev => ({ ...prev, arms: e.target.value }))}
                className="input-field"
                placeholder="12.0"
              />
            </div>
          </div>
        </div>

        {/* Energy Level */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Energy Level
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, energy_level: level as 1 | 2 | 3 | 4 | 5 }))}
                className={`w-10 h-10 rounded-full border-2 font-semibold transition-colors ${
                  formData.energy_level === level
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-secondary-300 text-secondary-600 hover:border-primary-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-xs text-secondary-500 mt-1">1 = Very Low, 5 = Very High</p>
        </div>

        {/* Mood */}
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-secondary-700 mb-2">
            Mood
          </label>
          <select
            id="mood"
            value={formData.mood}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              mood: e.target.value as 'excellent' | 'good' | 'okay' | 'tired' | 'stressed'
            }))}
            className="input-field"
          >
            <option value="excellent">Excellent 😊</option>
            <option value="good">Good 🙂</option>
            <option value="okay">Okay 😐</option>
            <option value="tired">Tired 😴</option>
            <option value="stressed">Stressed 😰</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-secondary-700 mb-2">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="input-field resize-none"
            placeholder="How are you feeling today? Any achievements or challenges?"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Progress'}
        </button>
      </form>
    </div>
  )
}