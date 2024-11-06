import { navigate } from "astro:transitions/client";

export const to = (path: string) => navigate(path);