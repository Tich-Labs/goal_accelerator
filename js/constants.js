// Category colors - consistent throughout the app
export const categoryColors = {
  'Health': {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-800',
    accent: 'bg-red-500',
    light: 'bg-red-100',
    hex: '#ef4444'
  },
  'Relationships': {
    bg: 'bg-pink-50',
    border: 'border-pink-300',
    text: 'text-pink-700',
    badge: 'bg-pink-100 text-pink-800',
    accent: 'bg-pink-500',
    light: 'bg-pink-100',
    hex: '#ec4899'
  },
  'Career': {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800',
    accent: 'bg-blue-500',
    light: 'bg-blue-100',
    hex: '#3b82f6'
  },
  'Finances': {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-800',
    accent: 'bg-green-500',
    light: 'bg-green-100',
    hex: '#22c55e'
  },
  'Personal Growth': {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
    badge: 'bg-orange-100 text-orange-800',
    accent: 'bg-orange-500',
    light: 'bg-orange-100',
    hex: '#f97316'
  },
  'Recreation': {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
    accent: 'bg-amber-500',
    light: 'bg-amber-100',
    hex: '#f59e0b'
  },
  'Family': {
    bg: 'bg-rose-50',
    border: 'border-rose-300',
    text: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-800',
    accent: 'bg-rose-500',
    light: 'bg-rose-100',
    hex: '#f43f5e'
  },
  'Spirituality': {
    bg: 'bg-indigo-50',
    border: 'border-indigo-300',
    text: 'text-indigo-700',
    badge: 'bg-indigo-100 text-indigo-800',
    accent: 'bg-indigo-500',
    light: 'bg-indigo-100',
    hex: '#6366f1'
  }
};

export function getColorForArea(area) {
  return categoryColors[area] || categoryColors['Career']; // Default to blue
}

export function getHexColor(area) {
  return getColorForArea(area).hex;
}
