import { Fragment, useEffect } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();

    const { quoteId } = params;

    const {
        sendRequest,
        status,
        data: loadedQuotes,
        error,
    } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [quoteId, sendRequest]);

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className="centered focused">{error}</p>;
    }

    if (!loadedQuotes.text) {
        return <p>No quote found!</p>;
    }

    return (
        <Fragment>
            <HighlightedQuote
                text={loadedQuotes.text}
                author={loadedQuotes.author}
            />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link to={`${match.url}/comments`} className="btn--flat">
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;
