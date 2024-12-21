import React from 'react';
import { Button as MaterialButton, CircularProgress } from '@mui/material';
import { ReactNode } from 'react';
import { useForm } from 'react-final-form';

interface ButtonProps {
    label: string;
    className?: string;
    loading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, formApi: any) => void;
    type?: 'button' | 'submit' | 'reset';
    severity?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    disabled?: boolean;
    icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
   label,
   className,
   loading = false,
   onClick,
   type = 'button',
   severity = 'primary',
   disabled = false,
   icon,
}) => {
    const form = useForm();

    const buttonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (type === 'submit') return;
        e.preventDefault();
        if (onClick) onClick(e, form);
    };

    return (
        <MaterialButton
            color={severity}
            type={type}
            className={className}
            onClick={buttonClick}
            disabled={disabled}
            startIcon={icon}
            variant="contained"
        >
            {label} {loading && <CircularProgress size={16} style={{ marginLeft: 8 }} />}
        </MaterialButton>
    );
};

export default Button;
