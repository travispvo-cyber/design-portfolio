import { Link } from 'react-router-dom'

interface DesignCard {
  title: string
  description: string
  path: string
  thumbnail: string
  tags: string[]
  external?: boolean
}

const designs: DesignCard[] = [
  {
    title: 'Ellie & Piper - Balloon Services',
    description: 'Luxury balloon installation landing page with glassmorphism cards and full-screen hero.',
    path: '/ellie-piper/balloons',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
    tags: ['Landing Page', 'Luxury', 'Full-Screen'],
  },
  {
    title: 'VB Scheduler',
    description: 'Full-stack volleyball scheduling app with real-time availability coordination, heatmap visualization, and mobile-first design.',
    path: 'https://vbscheduler.onrender.com',
    thumbnail: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&h=400&fit=crop',
    tags: ['Full-Stack', 'FastAPI', 'Real-Time'],
    external: true,
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
          {designs.map((design) => {
            const CardContent = (
              <>
                {/* Thumbnail */}
                <div className="aspect-[3/2] overflow-hidden relative">
                  <img
                    src={design.thumbnail}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {design.external && (
                    <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live
                    </span>
                  )}
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
              </>
            )

            return design.external ? (
              <a
                key={design.path}
                href={design.path}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-smooth"
              >
                {CardContent}
              </a>
            ) : (
              <Link
                key={design.path}
                to={design.path}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-smooth"
              >
                {CardContent}
              </Link>
            )
          })}

          {/* Placeholder for more designs */}
          <div className="bg-white/50 rounded-2xl border-2 border-dashed border-[var(--charcoal)]/20 flex items-center justify-center aspect-[3/2] md:aspect-auto md:min-h-[300px]">
            <span className="text-[var(--charcoal)]/40 text-sm">More designs coming soon...</span>
          </div>
        </div>
      </main>
    </div>
  )
}
