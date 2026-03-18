import { useEffect, useState } from "react";

function App() {
  const [t, setT] = useState(null);
  const [hasCard, setHasCard] = useState(false);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trello = window.TrelloPowerUp.iframe();
    setT(trello);

    trello.context().then((ctx) => {
      if (ctx.card) {
        setHasCard(true);
        trello.get("card", "shared", "paused").then((val) => {
          setPaused(!!val);
          setLoading(false);
        });
      } else {
        setHasCard(false);
        setLoading(false);
      }
    });
  }, []);

  const handleToggle = async () => {
    if (!t) return;
    const newVal = !paused;
    await t.set("card", "shared", "paused", newVal);
    setPaused(newVal);
    t.closePopup();
  };

  if (loading) return null;

  return (
    <div
      className="flex items-center justify-center w-full bg-[#1e1f26]"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <div className="bg-[#2d2f3a] rounded-xl w-full mx-3 p-5 text-white flex flex-col items-center gap-3">
        <div className="text-3xl">⏸️</div>
        <h2 className="text-base font-bold text-white">Pause Card</h2>

        {hasCard ? (
          <>
            <p className="text-xs text-gray-400 text-center">
              {paused
                ? "This card is currently paused. Click below to resume."
                : "Pause this card to temporarily hide it from the board."}
            </p>
            <button
              onClick={handleToggle}
              className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
                paused
                  ? "bg-green-600 hover:bg-green-500 text-white"
                  : "bg-[#579dff] hover:bg-[#4a8fe0] text-white"
              }`}
            >
              {paused ? "▶ Resume Card" : "⏸ Pause Card"}
            </button>
          </>
        ) : (
          <p className="text-xs text-gray-400 text-center">
            Open a card and use the{" "}
            <span className="text-white font-semibold">Pause Card</span> button
            inside the card to pause it.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
