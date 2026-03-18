TrelloPowerUp.initialize({
  "board-buttons": function (t, options) {
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
            url: "/", // loads your React app
            height: 300,
          });
        },
      },
    ];
  },
});
