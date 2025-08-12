import React from "react"
import { FaSun, FaMoon } from "react-icons/fa"

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      title="Toggle Dark Mode"
      className="p-2 rounded-full text-yellow-400 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  )
}

export default ThemeToggle
