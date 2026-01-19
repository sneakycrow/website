/// The type of panel within a dashboard, for example a settings panel, or a user list panel
export type Panel = "settings" | "users";

/// Function for getting the allowed UI panels the user can access based on their role
export const getAllowedPanels = (role: string): Panel[] => {
  switch (role) {
    case "ADMIN":
      return ["settings", "users"];
    case "USER":
    default:
      return ["settings"];
  }
};
