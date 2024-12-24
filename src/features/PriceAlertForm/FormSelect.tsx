import React from 'react';
import { Field } from 'react-final-form';

import FormLabel from  './FormLabel';

import SelectInput from './SelectInput';
import { useSelectOptions } from './useSelectOptions';

interface OptionsFields {
    key: string;
    label: string;
}

interface SelectProps {
    name: string;
    label?: string;
    options?: any[] | null;
    optionsFields?: OptionsFields;
    extraFields?: string[];
    editable?: boolean;
    placeholder?: string;
    multiSelect?: boolean;
    disabled?: boolean;
    required?: boolean;
    onChange?: (value: any) => void;
    className?: string;
    containerClassName?: string;
    useRawOptionValues?: boolean;
    loading?: boolean;
    getFilteredOptions?: (inputValue: string) => any;
}

const Select: React.FC<SelectProps> = ({
    name,
    label,
    options,
    optionsFields = { key: 'key', label: 'label' },
    onChange,
    extraFields,
    placeholder,
    multiSelect = false,
    required = false,
    disabled = false,
    className,
    containerClassName,
    useRawOptionValues = false,
    loading = false,
    getFilteredOptions,
}) => {
    const serializedOptions = useSelectOptions({
        options: options || [],
        optionsFields,
        extraFields,
    }) || [];

    const getRawOption = (option: any) => {
        return options?.find(
            (rawOption) =>
                (option?.[optionsFields?.key] || option?.key) === (rawOption?.[optionsFields?.key] || rawOption?.key)
        );
    };

    const getMultiSelectRawOptions = (selectedOptions: any[]) => {
        return options?.filter((rawOption) =>
            selectedOptions?.includes?.(rawOption[optionsFields.key])
        );
    };

    const parse = (value: any) => {
        if (multiSelect) {
            return useRawOptionValues ? getMultiSelectRawOptions(value) : value;
        }
        return useRawOptionValues ? getRawOption(value) : value?.key || value;
    };

    return (
        <span className={containerClassName}>
      {label && <FormLabel labelFor={name}>{label}</FormLabel>}
            <Field name={name} parse={parse}>
        {({ input, meta }) => (
            <SelectInput
                name={name}
                input={input}
                meta={meta}
                options={serializedOptions}
                onChange={(value: OptionsFields) => {
                    onChange?.(value);
                }}
                placeholder={placeholder}
                multiSelect={multiSelect}
                required={required}
                disabled={disabled}
                className={className}
                loading={loading}
                getFilteredOptions={getFilteredOptions}
            />
        )}
      </Field>
    </span>
    );
};

export default Select;
