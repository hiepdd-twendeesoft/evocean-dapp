export function getCategoryName(name: string) {
  switch (name) {
    case "coded-template":
      return "Coded Template";
    case "branding":
      return "Branding";
    case "presentation":
      return "Presentation";
    case "ui-kit":
      return "UI Kit";
    default:
      "";
  }
}

export const toFormatPrice = (price: string) => {
  if (!price) {
    return "0";
  }
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
