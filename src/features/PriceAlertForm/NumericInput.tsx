import React, { FC, useEffect, useRef } from 'react';
import { Field, FieldMetaState } from 'react-final-form';
import { TextField } from '@mui/material';
import FormErrorMessage from './FormErrorMessage';
import FormLabel from './FormLabel';

const isFormFieldValid = (meta: FieldMetaState<object>) => !meta.error

interface NumericInputProps {
    name: string;
    label?: string;
    className?: string;
    disabled?: boolean;
    containerClassName?: string;
    required?: boolean;
    leftIcon?: boolean;
    icon?: string;
    additionalIconClasses?: string;
    autocomplete?: boolean;
    onChange?: (value: number | undefined) => void;
}

const NumericInput: FC<NumericInputProps> = ({
    name,
    label,
    className,
    disabled = false,
    containerClassName,
    required = false,
    leftIcon = false,
    icon,
    additionalIconClasses,
    autocomplete = false,
    onChange,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.autocomplete = autocomplete ? 'on' : 'off';
        }
    }, [autocomplete]);

    return (
        <span
            className={`${leftIcon ? 'input-icon-left' : 'input-icon-right'} ${containerClassName || ''}`}
        >
      {label && <FormLabel labelFor={name}>{label}</FormLabel>}
            {icon && <i className={`${icon} ${additionalIconClasses || ''}`} />}
            <Field
                name={name}
                render={({ input, meta }) => (
                    <div style={{ display: 'flex',  flexDirection: 'column'}}>
                        <TextField
                            {...input}
                            ref={inputRef}
                            type="number"
                            id={name}
                            disabled={disabled}
                            required={required}
                            className={`numeric-input ${className || ''} ${
                                (!isFormFieldValid(meta) || (required && !input.value)) ? 'p-invalid' : ''
                            }`}
                            onChange={(e) => {
                                const value = e.target.value ? parseFloat(e.target.value) : undefined;
                                input.onChange(value);
                                if (onChange) onChange(value);
                            }}
                        />
                        <FormErrorMessage meta={{ ...meta, required: required && !input.value }} />
                    </div>
                )}
            />
    </span>
    );
};

export default NumericInput;
