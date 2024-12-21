import React, { ReactNode, FC } from 'react';
import { Form as ReactFinalForm, FormProps as FinalFormProps } from 'react-final-form';

type Mutators = Record<
    string,
    (
        args: any[],
        state: any,
        tools: { changeValue: (state: any, field: string, callback: () => any) => void; resetFieldState: (field: string) => void }
    ) => void
    >;

interface FormProps {
    children: ReactNode | ((props: { form: any }) => ReactNode);
    onSubmit: FinalFormProps['onSubmit'];
    initialValues?: Record<string, any>;
    validationFunction?: FinalFormProps['validate'];
    mutators?: Mutators;
}

const Form: FC<FormProps> = ({
    children,
    onSubmit,
    initialValues = {},
    validationFunction,
    mutators = {},
}) => {
    const defaultMutators: Mutators = {
        setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
        },
        resetField: ([field], state, { resetFieldState }) => {
            resetFieldState(field);
        },
    };

    return (
        <ReactFinalForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={validationFunction}
            mutators={{ ...defaultMutators, ...mutators }}
        >
            {({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                    {typeof children === 'function' ? children({ form }) : children}
                </form>
            )}
        </ReactFinalForm>
    );
};

export default Form;
