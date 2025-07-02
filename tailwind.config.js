/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4FE8',
        'primary-dark': '#4338CA',
        'primary-light': '#7C72EE',
        secondary: '#1A1F2E',
        accent: '#FFB84D',
        'accent-dark': '#F59E0B',
        'accent-light': '#FCD34D',
        surface: '#FFFFFF',
        background: '#F8F9FB',
        'gray-50': '#F9FAFB',
        'gray-100': '#F3F4F6',
        'gray-200': '#E5E7EB',
        'gray-300': '#D1D5DB',
        'gray-400': '#9CA3AF',
        'gray-500': '#6B7280',
        'gray-600': '#4B5563',
        'gray-700': '#374151',
        'gray-800': '#1F2937',
        'gray-900': '#111827',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #5B4FE8 0%, #7C72EE 100%)',
        'gradient-amber': 'linear-gradient(135deg, #FFB84D 0%, #FCD34D 100%)',
        'gradient-hero': 'linear-gradient(135deg, #5B4FE8 0%, #7C72EE 50%, #FFB84D 100%)'
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.15)',
        'floating': '0 10px 25px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}