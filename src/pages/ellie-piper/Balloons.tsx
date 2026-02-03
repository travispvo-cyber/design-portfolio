import { Link } from 'react-router-dom'

// Ellie and Piper Logo Component
// Standard variants: transparent, nav, circle, circle-white, circle-cream, circle-sm
// No-blobs variants: transparent-no-blobs, nav-no-blobs, circle-no-blobs, circle-white-no-blobs, circle-cream-no-blobs, circle-sm-no-blobs
// Gold variants: nav-gold-light, nav-gold-bright, nav-gold-champagne, nav-gold-pale (and circle- equivalents)
type LogoVariant =
  | "transparent" | "nav" | "circle" | "circle-white" | "circle-cream" | "circle-sm" | "monogram"
  | "transparent-no-blobs" | "nav-no-blobs" | "circle-no-blobs" | "circle-white-no-blobs" | "circle-cream-no-blobs" | "circle-sm-no-blobs"
  | "nav-gold-light" | "nav-gold-bright" | "nav-gold-champagne" | "nav-gold-pale"
  | "circle-gold-light" | "circle-gold-bright" | "circle-gold-champagne" | "circle-gold-pale"

const Logo = ({
  variant = "transparent",
  className = "h-10"
}: {
  variant?: LogoVariant
  className?: string
}) => (
  <img
    src={`/images/logo/ellie-piper-${variant}.png`}
    alt="Ellie and Piper - Party Boutique"
    className={className}
  />
)

// Service card data
const services = [
  {
    icon: 'corporate_fare',
    title: 'Corporate Events',
    description: 'Elevate your brand identity with sophisticated, custom-branded displays that leave a lasting impression on clients and partners.',
  },
  {
    icon: 'favorite',
    title: 'Bridal Showers',
    description: 'Create whimsical and elegant arrangements tailored to your specific theme and floral vision for your special day.',
  },
  {
    icon: 'child_care',
    title: 'Baby Showers',
    description: 'Celebrate new beginnings with soft palettes, playful designs, and organic textures that capture the joy of the occasion.',
  },
]

export function ElliePiperBalloons() {
  return (
    <div className="bg-[#f8f6f6]">
      {/* Main Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGSlEuwqfYhoQQyFAU7zIMFM5YIMb1LeKnFgWcToTZI2Vk8Y7RCTMuUDf2XFg0AgepeT9hDELjBz95Z0vD7PCiCskksXYmqGY3iE5e0I3c8y_IvhtZNU2ZYs0tC6PTBGeLr7q7MtGJ4XI5m47zzH0X3dir5iDJMo1OoxRpgEUYdxWwMf6JyaH4sjLWagq32Usq28D5ZfpA_q4Hh17VzLSiwsmwPngGWflFBXyGePVu3p8Ch1Brj41QGdJSLC8_YoI-pUW6EXwRKcA')`
            }}
          />
          {/* Dark Gradient Overlay for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)'
            }}
          />
        </div>

        {/* Navigation Overlay */}
        <header className="relative z-10 flex items-center justify-between px-12 py-8 text-white">
          <Link to="/" className="flex items-center">
            <Logo variant="nav-gold-champagne" className="h-12 w-auto drop-shadow-lg" />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <a className="text-sm font-medium hover:text-[#d48c8c] transition-colors" href="#">Shop</a>
            <a className="text-sm font-medium hover:text-[#d48c8c] transition-colors" href="#">Rentals</a>
            <a className="text-sm font-medium text-[#d48c8c] border-b-2 border-[#d48c8c]" href="#">Balloon Services</a>
            <a className="text-sm font-medium hover:text-[#d48c8c] transition-colors" href="#">Inspiration</a>
            <button className="bg-[#d48c8c]/20 backdrop-blur-md border border-white/20 rounded-lg px-6 py-2 text-sm font-bold hover:bg-[#d48c8c] transition-all">
              Cart
            </button>
          </nav>
        </header>

        {/* Centered Content Top Stack */}
        <div className="relative z-10 flex flex-col items-center justify-start pt-20 px-6 text-center">
          <h1 className="font-serif text-white text-5xl md:text-7xl mb-6 max-w-4xl leading-tight italic">
            Luxury Balloon Installations
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light tracking-wide max-w-2xl">
            Elevating corporate events, bridal showers, and baby showers across Greater Boston with editorial design.
          </p>
        </div>

        {/* Bottom Content Section */}
        <div className="relative z-10 mt-auto w-full max-w-7xl mx-auto px-6 pb-12">
          {/* CTA Button */}
          <div className="flex justify-center mb-16">
            <button className="bg-[#d48c8c] hover:bg-[#d48c8c]/90 text-white font-bold text-lg px-10 py-4 rounded-lg shadow-xl transition-all hover:scale-105 active:scale-95">
              Book a Consultation
            </button>
          </div>

          {/* Glassmorphism Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="glass-card p-8 rounded-xl flex flex-col items-start gap-4 hover:bg-white/20 transition-all cursor-default"
              >
                <div className="bg-white/20 p-3 rounded-lg text-white">
                  <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-[#f8f6f6] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <a className="text-[#d48c8c] hover:opacity-80 transition-opacity" href="#">
              <span className="material-symbols-outlined text-2xl">camera</span>
            </a>
            <a className="text-[#d48c8c] hover:opacity-80 transition-opacity" href="#">
              <span className="material-symbols-outlined text-2xl">alternate_email</span>
            </a>
            <a className="text-[#d48c8c] hover:opacity-80 transition-opacity" href="#">
              <span className="material-symbols-outlined text-2xl">location_on</span>
            </a>
          </div>
          <div className="flex gap-10 text-sm font-medium text-gray-500">
            <a className="hover:text-[#d48c8c]" href="#">Privacy Policy</a>
            <a className="hover:text-[#d48c8c]" href="#">Terms of Service</a>
            <a className="hover:text-[#d48c8c]" href="#">Contact Us</a>
          </div>
          <p className="text-sm text-gray-400">© 2024 Ellie and Piper. All rights reserved.</p>
        </div>
      </footer>

      {/* Back to Portfolio Link */}
      <Link
        to="/"
        className="fixed bottom-6 left-6 z-50 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full text-sm shadow-lg transition-all flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Portfolio
      </Link>
    </div>
  )
}
