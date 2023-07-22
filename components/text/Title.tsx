import React from "react";
import {fonts} from "@/public";

interface ITitle {
    styles?: string;
    children: React.ReactNode;
}

const Title = ({styles, children}: ITitle) => {
    return (
        <h1 className={`component-title ${fonts.roboto.className} ${styles}`}>
            {children}
        </h1>
    );
};

export default Title;
