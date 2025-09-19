'use client'

import { ProgressEntry } from '@/types'
import { useState } from 'react'

interface ProgressChartProps {
  entries: ProgressEntry[]
}

export default function ProgressChart({ entries }: ProgressChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'energy'>('weight')

  // Sort entries by date for proper chart display
  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(a.metadata.date).getTime()
    const dateB = new Date(b.metadata.date).getTime()
    return dateA - dateB
  }).slice(-10) // Show last 10 entries

  const getChartData = () => {
    if (selectedMetric === 'weight') {
      return sortedEntries
        .filter(entry => entry.metadata.weight && entry.metadata.weight > 0)
        .map(entry => ({
          date: new Date(entry.metadata.date).toLocaleDateString(),
          value: entry.metadata.weight || 0
        }))
    } else {
      return sortedEntries
        .filter(entry => entry.metadata.energy_level)
        .map(entry => ({
          date: new Date(entry.metadata.date).toLocaleDateString(),
          value: entry.metadata.energy_level || 0
        }))
    }
  }

  const chartData = getChartData()

  if (chartData.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="section-header">Progress Chart</h2>
        <div className="text-center py-8">
          <p className="text-secondary-500">No data available for charting yet.</p>
          <p className="text-secondary-400 text-sm mt-2">Add more progress entries to see your trends!</p>
        </div>
      </div>
    )
  }

  const maxValue = Math.max(...chartData.map(d => d.value))
  const minValue = Math.min(...chartData.map(d => d.value))
  const valueRange = maxValue - minValue || 1

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-header">Progress Chart</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMetric('weight')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedMetric === 'weight'
                ? 'bg-primary-500 text-white'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
          >
            Weight
          </button>
          <button
            onClick={() => setSelectedMetric('energy')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedMetric === 'energy'
                ? 'bg-primary-500 text-white'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
          >
            Energy
          </button>
        </div>
      </div>

      <div className="relative h-64 bg-secondary-50 rounded-lg p-4">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 200"
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={i * 50}
              x2="400"
              y2={i * 50}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Chart line */}
          {chartData.length > 1 && (
            <polyline
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={chartData
                .map((point, index) => {
                  const x = (index / (chartData.length - 1)) * 400
                  const y = 200 - ((point.value - minValue) / valueRange) * 200
                  return `${x},${y}`
                })
                .join(' ')}
            />
          )}

          {/* Data points */}
          {chartData.map((point, index) => {
            const x = (index / Math.max(chartData.length - 1, 1)) * 400
            const y = 200 - ((point.value - minValue) / valueRange) * 200
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#8b5cf6"
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={y - 15}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {selectedMetric === 'weight' ? `${point.value}` : point.value}
                </text>
              </g>
            )
          })}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pt-2">
          {chartData.map((point, index) => (
            <div key={index} className="text-xs text-secondary-500 text-center">
              {point.date}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-secondary-600">
          {selectedMetric === 'weight' ? 'Weight Trend' : 'Energy Level Trend'}
        </p>
        {chartData.length > 1 && (
          <p className="text-xs text-secondary-500 mt-1">
            {selectedMetric === 'weight' 
              ? `Range: ${minValue} - ${maxValue} lbs`
              : `Range: ${minValue} - ${maxValue}/5`
            }
          </p>
        )}
      </div>
    </div>
  )
}