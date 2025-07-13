const styles = {
  input:
    'w-full px-4 py-3 rounded-lg bg-white bg-opacity-90 border-0 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all duration-200',
  label: 'block text-white text-sm font-medium mb-2',
  button:
    'w-full py-3 px-4 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50',
  brandingTitle: 'font-bold mb-6 font-agbalumo',
  brandingSubtitle: 'opacity-90',
}

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ')

export { styles, cn }
