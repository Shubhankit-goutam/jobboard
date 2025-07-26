function DarkModeToggle({ isDarkMode, toggle }) {
  return (
    <button
      className={`btn btn-sm ${isDarkMode ? "btn-light" : "btn-dark"}`}
      onClick={toggle}
    >
      {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
