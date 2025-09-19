import { CommunityContent } from '@/types'

interface CommunityCardProps {
  item: CommunityContent
  featured?: boolean
  expanded?: boolean
}

export default function CommunityCard({ item, featured = false, expanded = false }: CommunityCardProps) {
  const { content_type, author, featured_image, is_featured } = item.metadata

  if (featured) {
    return (
      <div className="text-center">
        <blockquote className="text-lg font-medium mb-4">
          "{item.content}"
        </blockquote>
        {author && (
          <cite className="text-primary-100 text-sm">— {author}</cite>
        )}
      </div>
    )
  }

  if (content_type === 'quote') {
    return (
      <div className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="flex items-start space-x-4">
          <div className="text-3xl text-primary-500">💫</div>
          <div>
            <blockquote className="text-lg font-medium text-secondary-800 mb-2">
              "{item.content}"
            </blockquote>
            {author && (
              <cite className="text-secondary-600 text-sm">— {author}</cite>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (content_type === 'tip') {
    return (
      <div className="card p-6">
        <div className="flex items-start space-x-4">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="font-semibold text-secondary-800 mb-2">{item.title}</h3>
            <p className="text-secondary-600">{item.content}</p>
          </div>
        </div>
      </div>
    )
  }

  if (content_type === 'success-story' && expanded) {
    return (
      <div className="card p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {featured_image && (
            <div className="md:w-1/3">
              <img
                src={`${featured_image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="md:w-2/3">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🌟</div>
              <h3 className="text-xl font-semibold text-secondary-800">{item.title}</h3>
            </div>
            <div className="text-secondary-600 leading-relaxed">
              {item.content}
            </div>
            {author && (
              <div className="mt-4 text-sm text-secondary-500">
                — {author}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-start space-x-4">
        <div className="text-2xl">
          {content_type === 'quote' && '💫'}
          {content_type === 'tip' && '💡'}
          {content_type === 'success-story' && '🌟'}
        </div>
        <div>
          <h3 className="font-semibold text-secondary-800 mb-2">{item.title}</h3>
          <p className="text-secondary-600">{item.content}</p>
          {author && (
            <div className="mt-2 text-sm text-secondary-500">— {author}</div>
          )}
        </div>
      </div>
    </div>
  )
}