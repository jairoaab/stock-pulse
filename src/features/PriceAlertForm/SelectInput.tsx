import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { FieldMetaState } from "react-final-form";

import FormErrorMessage from './FormErrorMessage';

const isFormFieldValid = (meta: FieldMetaState<object>) => !meta.error

interface SelectInputProps {
    input: any;
    meta: FieldMetaState<object>;
    name: string;
    options: { key: any, label: any }[] | undefined;
    onChange: (value: any) => void;
    editable?: boolean;
    placeholder?: string;
    multiSelect?: boolean;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    loading?: boolean;
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
}: SelectInputProps) => {
    const [selectedValue, setSelectedValue] = useState(multiSelect ? [] : '');

    useEffect(() => {
        if (multiSelect) {
            setSelectedValue(input.value?.map?.((item: { [x: string]: any; key: any; }) => item?.key || item?.key || item) || []);
        } else {
            const selectedOption = options?.find((option: { key: any; }) =>
                [input.value, input.value?.key, input.value.key].includes(option.key)
            );
            setSelectedValue(selectedOption?.key || '');
        }
    }, [input.value, options]);

    const handleChange = (event: any) => {
        const { value } = event.target;
        setSelectedValue(value);

        if (multiSelect) {
            const selectedOptions = options?.filter((option: { [x: string]: any; }) => value.includes(option.key));
            onChange(selectedOptions);
            input.onChange(selectedOptions);
        } else {
            const selectedOption = options?.find((option: { [x: string]: any; }) => option?.key === value);
            onChange(selectedOption || value);
            input.onChange(selectedOption || value);
        }
    };

    return (
        <FormControl
            fullWidth
            required={required}
            disabled={disabled || loading}
            error={!isFormFieldValid(meta) || (required && !input.value)}
        >
            {placeholder && <InputLabel id={`${name}-label`}>{placeholder}</InputLabel>}
            <Select
                labelId={`${name}-label`}
                id={name}
                name={name}
                value={selectedValue}
                onChange={handleChange}
                multiple={multiSelect}
                displayEmpty
            >
                {options?.map((option: any) => (
                    <MenuItem key={option?.key} value={option?.key}>
                        {option?.label}
                    </MenuItem>
                ))}
            </Select>
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
    options: PropTypes.arrayOf(PropTypes.object),
    optionsFields: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func,
    editable: PropTypes.bool,
    placeholder: PropTypes.string,
    multiSelect: PropTypes.bool,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    className: PropTypes.string,
    componentId: PropTypes.string,
    loading: PropTypes.bool,
};

export default SelectInput;
