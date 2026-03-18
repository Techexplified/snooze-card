function App() {
  return (
    <div className="min-h-screen bg-[#1e1f26] flex items-center justify-center p-4">
      <div className="bg-[#2d2f3a] rounded-xl shadow-2xl w-80 p-5 text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-100 mx-auto">
            Power-Ups
          </h2>
        </div>

        {/* Enabled Power-Ups Section */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-300 mb-3">
            Enabled Power-Ups
          </p>

          <div className="bg-[#3a3c4a] rounded-lg p-4">
            <h3 className="text-lg font-bold text-white mb-2">Pause Card</h3>
            <p className="text-sm text-gray-400 mb-4">
              Temporarily pause tasks. Automatically resume work.
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-[#4a4c5e] hover:bg-[#55576b] text-gray-200 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </button>
          </div>
        </div>

        {/* Add Power-ups Button */}
        <button className="w-full bg-[#579dff] hover:bg-[#4a8fe0] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm">
          Add Power-ups
        </button>
      </div>
    </div>
  );
}

export default App;
