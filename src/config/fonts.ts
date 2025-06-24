import { Arsenal, Lexend, Montserrat, Quicksand } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext", "vietnamese"],
});

export const arsenal = Arsenal({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin", "vietnamese"],
});

export const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext", "vietnamese"],
});
