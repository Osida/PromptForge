import React from "react";
import {fonts} from "@/public";

interface ITitle {
    text: string;
    styles?: string;
}

const Title = ({text, styles}: ITitle) => {
    return (
        <h1 className={`component-title ${fonts.roboto.className} ${styles}`}>
            {text}
        </h1>
    );
};

export default Title;
