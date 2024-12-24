import React, { FC } from 'react';

import './FormErrorMessage.scss';

interface FormErrorMessageProps {
    meta: {
        error?: string | string[];
        required?: boolean;
        touched?: boolean;
    };
}

const FormErrorMessage: FC<FormErrorMessageProps> = ({ meta }) => {
    if (Array.isArray(meta.error)) {
        return (
            <>
                {meta.error.map((error, index) => (
                    <React.Fragment key={index}>
                        <small className="error-message">{error}</small>
                        <br />
                    </React.Fragment>
                ))}
            </>
        );
    }

    return (
        <>
            {meta.error && <small className="error-message">{meta.error}</small>}
            {meta.required && <small className="error-message">This field is required.</small>}
        </>
    );
};

export default FormErrorMessage;
