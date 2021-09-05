import { Fragment } from 'react';
import { Route, useParams } from 'react-router';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
    { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
];

const QuoteDetail = () => {
    const params = useParams();

    const quotes = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

    if (!quotes) {
        return <p>No quote found!</p>;
    }

    return (
        <Fragment>
            <HighlightedQuote text={quotes.text} author={quotes.author} />
            <Route path={`/quotes/${params.quoteId}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;
