import { getCommunityContent } from '@/lib/cosmic'
import CommunityCard from '@/components/CommunityCard'

export default async function CommunityPage() {
  const communityContent = await getCommunityContent()

  // Group content by type
  const quotes = communityContent.filter(item => item.metadata.content_type === 'quote')
  const tips = communityContent.filter(item => item.metadata.content_type === 'tip')
  const stories = communityContent.filter(item => item.metadata.content_type === 'success-story')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">Community</h1>
        <p className="text-lg text-secondary-600">
          Get inspired by quotes, tips, and success stories from our amazing community.
        </p>
      </div>

      {/* Daily Motivation */}
      {quotes.length > 0 && (
        <section className="mb-10">
          <h2 className="section-header">Daily Motivation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes.slice(0, 2).map((quote) => (
              <CommunityCard key={quote.id} item={quote} />
            ))}
          </div>
        </section>
      )}

      {/* Fitness Tips */}
      {tips.length > 0 && (
        <section className="mb-10">
          <h2 className="section-header">Fitness Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip) => (
              <CommunityCard key={tip.id} item={tip} />
            ))}
          </div>
        </section>
      )}

      {/* Success Stories */}
      {stories.length > 0 && (
        <section className="mb-10">
          <h2 className="section-header">Success Stories</h2>
          <div className="space-y-6">
            {stories.map((story) => (
              <CommunityCard key={story.id} item={story} expanded />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {communityContent.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-6xl mb-4">💪</div>
          <h3 className="text-xl font-semibold mb-2">Community Content Coming Soon</h3>
          <p className="text-secondary-500">
            We're building an amazing community of strong women. Check back soon for inspiration!
          </p>
        </div>
      )}
    </div>
  )
}