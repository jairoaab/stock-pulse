import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { FormControl, InputLabel, FormHelperText } from '@mui/material';
import { FieldMetaState } from "react-final-form";

import FormErrorMessage from './FormErrorMessage';

const isFormFieldValid = (meta: FieldMetaState<object>) => !meta.error;

interface Option {
    key: any;
    label: string;
}

interface SelectInputProps {
    input: any;
    meta: FieldMetaState<object>;
    name: string;
    options: { key: any, label: any }[] | undefined;
    onChange: (value: any) => void;
    placeholder?: string;
    multiSelect?: boolean;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    loading?: boolean;
    getFilteredOptions?: (inputValue: string) => any;
}

const SelectInput = ({
    input,
    meta,
    name,
    options = [],
    onChange,
    placeholder,
    multiSelect = false,
    required = false,
    disabled = false,
    loading = false,
    getFilteredOptions,
}: SelectInputProps) => {

    const handleChange = (value: any) => {
        input.onChange(value);
        onChange(value);
    };

    const filterOptions = (inputValue: string) => {
        if (!inputValue) {
            return [];
        }
        return options.filter((option: Option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (inputValue: string) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(filterOptions(inputValue));
            }, 1000);
        });

    return (
        <FormControl
            fullWidth
            required={required}
            disabled={disabled || loading}
            error={!isFormFieldValid(meta) || (required && !input.value)}
        >
            {placeholder && <InputLabel id={`${name}-label`}>{placeholder}</InputLabel>}
            <AsyncSelect
                id={name}
                name={name}
                onChange={(e: any) => handleChange(e)}
                loadOptions={getFilteredOptions || loadOptions}
                isMulti={multiSelect}
                isClearable
                placeholder={placeholder}
                cacheOptions
                defaultOptions
            />
            <FormHelperText>
                <FormErrorMessage meta={{ ...meta, required: required && !input.value }} />
            </FormHelperText>
        </FormControl>
    );
};

SelectInput.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    multiSelect: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    loading: PropTypes.bool,
};

export default SelectInput;
