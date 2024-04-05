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
