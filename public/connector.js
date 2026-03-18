TrelloPowerUp.initialize({
  "board-buttons": function (t) {
    return [
      {
        text: "Pause Card",
        icon: {
          dark: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/pause-circle.svg",
          light:
            "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/pause-circle.svg",
        },
        callback: function (t) {
          return t.popup({
            title: "Pause Card",
            url: "/",
            height: 200,
          });
        },
      },
    ];
  },

  "card-badges": function (t) {
    return t.get("card", "shared", "paused").then(function (paused) {
      if (!paused) return [];
      return [
        {
          icon: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/pause-circle-fill.svg",
          text: "Paused",
          color: "blue",
        },
      ];
    });
  },

  "card-buttons": function (t) {
    return t.get("card", "shared", "paused").then(function (paused) {
      return [
        {
          icon: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/pause-circle.svg",
          text: paused ? "Resume Card" : "Pause Card",
          callback: function (t) {
            return t.get("card", "shared", "paused").then(function (paused) {
              return t.set("card", "shared", "paused", !paused);
            });
          },
        },
      ];
    });
  },
});
//redeploy
