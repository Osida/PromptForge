import React from "react";

interface ISubTitle {
    styles?: string;
    children: React.ReactNode;
}

const Description = ({children, styles}: ISubTitle) => {
    return (
        <h6 className={`component-description ${styles}`}>
            {children}
        </h6>
    );
};

export default Description;
