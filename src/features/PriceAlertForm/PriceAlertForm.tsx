import React, { useRef } from 'react';
import { FormSpy } from 'react-final-form';
import Form from './Form';
import Select from './FormSelect';
import NumericInput from './NumericInput';
import Button from './Button';
import {useDispatch, useSelector} from 'react-redux';
import { addSubscription } from '../Stock/StockSlice';
import { useStockSubscriptionWebSocket } from '../websocket/WebSocketProvider';
import { requestNotificationPermission } from '../PushNotifications/PushNotificationsHelpers';
const finnhub = require('finnhub');

interface StockOption {
    key: string;
    label: string;
}

interface PriceAlertFormProps {
    className?: string;
}

interface ClientInterface {
    symbolSearch: (inputValue: string, opts: any, callback: (error: any, data: any, response?: any) => void) => void;
    quote: (symbol: string, callback: (error: any, data: any, response?: any) => void) => void;
}

const PriceAlertForm: React.FC<PriceAlertFormProps> = ({ className }) => {
    const dispatch = useDispatch();
    const subscriptions = useSelector((state: any) => state.subscriptions);
    const { subscribe } = useStockSubscriptionWebSocket();
    const finnhubClient = useRef<ClientInterface>(new finnhub.DefaultApi());
    finnhub.ApiClient.instance.authentications['api_key'].apiKey = 'ctiffk1r01qm6mumuce0ctiffk1r01qm6mumuceg';
    const isFormValid = (values: Record<string, any>) => {
        const validationExist = subscriptions.some((subscription: any) => subscription.symbol === values.stock)
        return validationExist ? { stock: 'Stock already subscribed' } : undefined;
    }

    const getFilteredOptions = async (inputValue: string) => {
        const response: Promise<StockOption[]> = new Promise((resolve) => {
            finnhubClient.current?.symbolSearch(inputValue, {}, (error: any, data: any) => {
                const { result } = data;
                if (error) {
                    console.error('Error fetching crypto symbols:', error);
                }
                const options = result.map((symbol: any) => ({
                    key: symbol.symbol,
                    label: symbol.name || symbol.symbol,
                }));
                resolve(options);
            });
        });
        return response;
    }

    const setSubscription = async (values: any, form: any) => {
        finnhubClient.current.quote(values.stock, (error, data) => {
            const currentPrice = data?.c;
            dispatch(addSubscription({
                symbol: values.stock,
                threshold: values.price,
                price: currentPrice,
            }));
            subscribe(values.stock);
            requestNotificationPermission()
            form.reset();
        });
    }
    return (
        <Form onSubmit={setSubscription} className={className} validationFunction={isFormValid}>
            <Select required name="stock" label="Stock" optionsFields={{ key: 'symbol', label: 'description' }} getFilteredOptions={getFilteredOptions} />
            <NumericInput required name="price" label="Price" className="threshold" />
            <FormSpy subscription={{ valid: true, pristine: true }}>
                {({ valid, pristine }) => (
                    <Button label="Set Alert" type="submit" disabled={!valid || pristine} />
                )}
            </FormSpy>
        </Form>
    );
}

export default PriceAlertForm;
