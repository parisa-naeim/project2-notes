const getNoteBgColor = (color) => {
  //"yellow", "brown", "blue", "pink", "white", "orange"

  switch (color) {
    case "yellow":
      return "#FFE675";
    case "blue":
      return "#B3DFF5";
    case "brown":
      return "#C2A08C";
    case "pink":
      return "#F6C8C4";
    case "white":
      return "#FFFFFF";
    case "orange":
      return "#F3AF70";
    default:
      return "#FFE675";
  }
};

module.exports = { getNoteBgColor };
