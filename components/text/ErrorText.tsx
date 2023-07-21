import React from "react";

interface IErrorText {
    text: string;
    style?: string;
}

const ErrorText = ({text, style}: IErrorText) => {
    return (
        <p className={`w-full max-w-xl lg:max-w-2xl text-error ${style}`}>
            {text}
        </p>
    );
};

export default ErrorText;
