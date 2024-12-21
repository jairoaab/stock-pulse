import React, { FC } from 'react';
import { Field, useForm } from 'react-final-form';

import styles from './Input.module.scss';

interface InputProps {
    name: string;
    label?: string;
    placeHolder?: string;
    className?: string;
    containerClassName?: string;
    required?: boolean;
    autocomplete?: boolean;
    email?: boolean;
    onChange?: (value: any, form: any) => void;
    icon?: React.ElementType;
}

const Input: FC<InputProps> = ({
   name,
   label,
   placeHolder,
   className,
   containerClassName,
   required = false,
   autocomplete = false,
   email = false,
   onChange,
}) => {
    const form = useForm();

    const validate = (value: string): string | undefined => {
        if (email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Invalid email address';
        }
        return undefined;
    };

    const isFieldInvalid = (meta: any): boolean => meta.touched && !!meta.error;

    return (
        <span className={containerClassName || ''}>
            {label && (
              <label htmlFor={name} className={styles.label}>
                  {label}
              </label>
            )}
            <Field
                name={name}
                validate={validate}
                render={({ input, meta }) => (
                    <>
                        <div className={styles.inputContainer}>
                            <input
                                {...input}
                                id={name}
                                className={`${styles.input} ${className || ''} ${
                                    isFieldInvalid(meta) || (required && !input.value) ? styles.invalid : ''
                                }`}
                                placeholder={placeHolder}
                                required={required}
                                autoComplete={autocomplete ? 'on' : 'off'}
                                onChange={(e) => {
                                    input.onChange?.(e);
                                    onChange?.(e.target.value, form);
                                }}
                            />
                        </div>
                        {isFieldInvalid(meta) && <div className={styles.error}>{meta.error}</div>}
                    </>
                )}
            />
        </span>
    );
};

export default Input;
