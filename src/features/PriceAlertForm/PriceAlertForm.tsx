import React, { useRef } from 'react';
import { FormSpy } from 'react-final-form';
import Form from './Form';
import Select from './FormSelect';
import NumericInput from './NumericInput';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { addSubscription, updateStocks } from '../Stock/StockSlice';
import { useStockSubscriptionWebSocket } from '../websocket/WebSocketProvider';
import { requestNotificationPermission } from '../PushNotifications/PushNotificationsHelpers';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    companyProfile2: (symbol: object, callback: (error: any, data: any, response?: any) => void) => void;
}

const PriceAlertForm: React.FC<PriceAlertFormProps> = ({ className }) => {
    const dispatch = useDispatch();
    const { subscriptions, stocks } = useSelector((state: any) => state);
    const { subscribe, isOnline } = useStockSubscriptionWebSocket();
    const finnhubClient = useRef<ClientInterface>(new finnhub.DefaultApi());
    finnhub.ApiClient.instance.authentications['api_key'].apiKey = 'ctiffk1r01qm6mumuce0ctiffk1r01qm6mumuceg';
    const isFormValid = (values: Record<string, any>) => {
        if (!values.stock) return { stock: '* This field is required' };
        const validationExist = subscriptions.some((subscription: any) => subscription.symbol === values.stock);
        return validationExist ? { stock: 'Stock already subscribed' } : undefined;
    };

    const getFilteredOptions = async (inputValue: string) => {
        const response: Promise<StockOption[]> = new Promise((resolve) => {
            if(!isOnline) {
                const filteredStocks = stocks.filter((stock: any) => !inputValue || stock.symbol.toLowerCase().includes(inputValue.toLowerCase()) || stock.description.toLowerCase().includes(inputValue.toLowerCase()));
                return  resolve(filteredStocks.map((stock: any) => ({
                    key: stock.symbol,
                    label: stock.description || stock.symbol,
                })));
            }
            finnhubClient.current?.symbolSearch(inputValue, {}, (error: any, data: any) => {
                const { result } = data || {};
                if (error) {
                    toast.error('Error fetching crypto symbols');
                }

                if(!inputValue) dispatch(updateStocks(result));

                resolve(result.map((symbol: any) => ({
                    key: symbol.symbol,
                    label: symbol.description || symbol.symbol,
                })));
            });
        });
        return response;
    };

    const setSubscription = async (values: any, form: any) => {
        finnhubClient.current.quote(values.stock, (error, data) => {
            if (error && isOnline) {
                toast.error('We were not able to fetch the current price for this stock');
            }
            const currentPrice = data?.c;
            finnhubClient.current.companyProfile2({ symbol: values.stock }, (profileError, companyProfile) => {
                if (profileError && isOnline) {
                    toast.error('We were not able to fetch the currency for this stock');
                }
                const currency = companyProfile?.currency || 'USD';
                dispatch(addSubscription({
                    symbol: values.stock,
                    threshold: values.price,
                    price: currentPrice,
                    currency,
                }));
                subscribe(values.stock);
                requestNotificationPermission();
                form.reset();
            });
        });
    };

    return (
        <Form onSubmit={setSubscription} className={className} validationFunction={isFormValid}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Select name="stock" label="Stock" optionsFields={{ key: 'symbol', label: 'description' }} getFilteredOptions={getFilteredOptions} />
            <NumericInput required name="price" label="Price" className="threshold" />
            <FormSpy subscription={{ valid: true, pristine: true }}>
                {({ valid, pristine }) => (
                    <Button label="Set Alert" type="submit" disabled={!valid || pristine} />
                )}
            </FormSpy>
        </Form>
    );
};

export default PriceAlertForm;
