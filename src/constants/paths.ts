export const PATH = Object.freeze({
  root: "/" as const,
  community: "/community" as const,
  crews: "/crews" as const,
  login: "/login" as const,
  join: "/join" as const,
});

export const BOTTOMTAB_PATH = Object.freeze({
  root: "/" as const,
  community: "/community" as const,
  crews: "/crews" as const,
});

export const ROOT_PATH = {
  root: "/:params" as const,
  main: "" as const,
  community: "community" as const,
  crews: "crews" as const,
  login: "login" as const,
  join: "join" as const,
};
