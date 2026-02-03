import { Link } from 'react-router-dom'

interface DesignCard {
  title: string
  description: string
  path: string
  thumbnail: string
  tags: string[]
}

const designs: DesignCard[] = [
  {
    title: 'Ellie & Piper - Balloon Services',
    description: 'Luxury balloon installation landing page with glassmorphism cards and full-screen hero.',
    path: '/ellie-piper/balloons',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
    tags: ['Landing Page', 'Luxury', 'Full-Screen'],
  },
]

export function Home() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Header */}
      <header className="py-12 px-8 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--charcoal)] mb-4">
          Design Portfolio
        </h1>
        <p className="text-[var(--charcoal)]/70 text-lg max-w-xl mx-auto">
          A collection of web design explorations and implementations.
        </p>
      </header>

      {/* Design Grid */}
      <main className="max-w-6xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design) => (
            <Link
              key={design.path}
              to={design.path}
              className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-smooth"
            >
              {/* Thumbnail */}
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={design.thumbnail}
                  alt={design.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--charcoal)] mb-2">
                  {design.title}
                </h2>
                <p className="text-[var(--charcoal)]/60 text-sm mb-4 line-clamp-2">
                  {design.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {design.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[var(--blush)]/30 text-[var(--rose-dark)] text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}

          {/* Placeholder for more designs */}
          <div className="bg-white/50 rounded-2xl border-2 border-dashed border-[var(--charcoal)]/20 flex items-center justify-center aspect-[3/2] md:aspect-auto md:min-h-[300px]">
            <span className="text-[var(--charcoal)]/40 text-sm">More designs coming soon...</span>
          </div>
        </div>
      </main>
    </div>
  )
}
