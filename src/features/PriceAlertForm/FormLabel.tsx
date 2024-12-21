import React, { FC, ReactNode } from 'react';

import styles from './FormLabel.module.scss';

interface FormLabelProps {
    labelFor: string;
    children: ReactNode;
}

const FormLabel: FC<FormLabelProps> = ({ labelFor, children }) => {
    return (
        <div className={styles.container}>
            <label htmlFor={labelFor} className={styles.label}>
                {children}
            </label>
        </div>
    );
};

export default FormLabel;
