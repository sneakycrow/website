/// The type of panel within a dashboard, for example a settings panel, or a user list panel
export type UserPanel = "accounts" | "profile";
export const userPanels: UserPanel[] = ["accounts", "profile"];
export type AdminPanel = "users";
export const adminPanels: AdminPanel[] = ["users"];
export type Panel = UserPanel | AdminPanel;
export const panels: Panel[] = [...userPanels, ...adminPanels];

/// Function for getting the allowed UI panels the user can access based on their role
export const getAllowedPanelsByRole = (role: string): Panel[] => {
  const panels: Panel[] = userPanels;
  if (role === "ADMIN") {
    panels.push("users");
  }
  return panels;
};
