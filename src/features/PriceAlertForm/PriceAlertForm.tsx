import React from 'react';
import Form from "./Form";
import Select from "./FormSelect";
import NumericInput from "./NumericInput";
import Button from "./Button";
// import {useSelector} from "react-redux";
import useGet from "../common/hooks/useGet";

interface Stock {
    symbol: string;
    name: string;
}
const payload = Object.freeze({
    exchange: 'US',
    token: 'ctiffk1r01qm6mumuce0ctiffk1r01qm6mumuceg',
})
const PriceAlertForm: React.FC = () => {
    // const stockOptions = useSelector((state: any) => state.stockData);
    const [, { data: stockOptions = [] }] = useGet<Stock[]>({
        url: 'https://cors-anywhere.herokuapp.com/https://finnhub.io/api/v1/stock/symbol',
        payload,
    });
    const setSubscription = (values: any) => {
        console.log(values);
    }
    return (
        <Form onSubmit={setSubscription}>
            <Select name="stock" options={stockOptions} label="Stock" optionsFields={{ key: 'symbol', label: 'description' }} />
            <NumericInput name="price" label="Price" />
            <Button label={'Set Alert'} type="submit" />
        </Form>
    );
}

export default PriceAlertForm;
