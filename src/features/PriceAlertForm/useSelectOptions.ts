import { useMemo } from 'react';

interface UseSelectOptionsParams<TOption, TKey extends keyof TOption> {
    options: TOption[] | null;
    optionsFields: {
        key: TKey;
        label: keyof TOption;
    };
    extraFields?: Record<string, any>;
}

export function useSelectOptions<TOption>({
    options,
    optionsFields,
    extraFields = {},
}: UseSelectOptionsParams<TOption, keyof TOption>) {
    return useMemo(
        () =>
            options?.map((option) => ({
                key: option[optionsFields.key],
                label: option[optionsFields.label],
                ...extraFields,
            })),
        [options, optionsFields, extraFields]
    );
}
