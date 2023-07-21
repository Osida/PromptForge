import {Montserrat, Roboto} from "next/font/google";
import {NextFont} from "next/dist/compiled/@next/font";

export const roboto: NextFont = Roboto({
    weight: ["300", "400", "500", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});

export const montserrat: NextFont = Montserrat({
    weight: ["300", "400", "500", "700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});