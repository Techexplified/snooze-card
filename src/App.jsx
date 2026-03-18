import React from "react";

function App() {
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="quiet mod-no-icon mod-subtle-mention">Power-Ups</h2>
        <button className="icon mod-icon-small mod-ignore">
          {/* Close icon SVG */}
          <svg
            className="icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M10.707 4.293a1 1 0 00-1.414 0L8 6.586 6.707 5.293a1 1 0 00-1.414 1.414L6.586 8l-1.293 1.293a1 1 0 001.414 1.414L8 9.414l1.293 1.293a1 1 0 001.414-1.414L9.414 8l1.293-1.293a1 1 0 000-1.414z" />
          </svg>
        </button>
      </div>

      {/* Enabled Power-Ups Section */}
      <div>
        <p className="small-spaced mod-subtle">Enabled Power-Ups</p>
        <div className="control-group mod-basic">
          <div className="control-section">
            <div className="control-item mod-only">
              <span className="control-label u-clearfix">
                <span className="control-item-inner">
                  <span
                    className="badge"
                    style={{ backgroundColor: "#1e90ff" }}
                  >
                    <span className="badge-icon icon icon-lg">
                      {/* Document/Pause icon SVG - replace with your pause icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </span>
                  </span>
                  <h3 className="control-label-content">Pause Card</h3>
                </span>
              </span>
              <div className="control-help">
                <p className="small-spaced mod-subtle">
                  Temporarily hide tasks. Automatically resume work.
                </p>
              </div>
              <button
                className="mod-subtle mod-no-border _1YgbTIbDoX1V4T0VJ3mI-_ u-block mod-ignore-events"
                style={{ marginTop: "4px" }}
              >
                <span className="icon icon-sm mod-ignore-events">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </span>
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Power-Ups Button */}
      <button className="mod-primary u-block">Add Power-Ups</button>
    </div>
  );
}

export default App;
