import { useHistory } from 'react-router';
import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
    const history = useHistory();

    const addQuoteHandler = (quoteData) => {
        console.log(quoteData);

        history.push('/quotes');
    };

    return (
        <div>
            <QuoteForm onAddQuote={addQuoteHandler} />
        </div>
    );
};

export default NewQuote;
