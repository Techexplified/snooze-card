import { useEffect, useState } from "react";

function App() {
  const [t, setT] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const trello = window.TrelloPowerUp.iframe();
    setT(trello);
    trello.get("card", "shared", "paused").then((val) => {
      setPaused(!!val);
    });
  }, []);

  const handleToggle = async () => {
    if (!t) return;
    const newVal = !paused;
    await t.set("card", "shared", "paused", newVal);
    setPaused(newVal);
    t.closePopup();
  };

  return (
    <div className="min-h-screen bg-[#1e1f26] flex items-center justify-center p-4">
      <div className="bg-[#2d2f3a] rounded-xl shadow-2xl w-72 p-5 text-white flex flex-col items-center gap-4">
        <div className="text-4xl">⏸️</div>
        <h2 className="text-lg font-bold text-white">Pause Card</h2>
        <p className="text-sm text-gray-400 text-center">
          {paused
            ? "This card is currently paused. Click below to resume."
            : "Pause this card to temporarily hide it from the board."}
        </p>
        <button
          onClick={handleToggle}
          className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
            paused
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-[#579dff] hover:bg-[#4a8fe0] text-white"
          }`}
        >
          {paused ? "▶ Resume Card" : "⏸ Pause Card"}
        </button>
      </div>
    </div>
  );
}

export default App;
