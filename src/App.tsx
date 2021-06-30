import React from 'react';
import {SearchPage} from "./pages/search/search-page";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {DetailsPage} from "./pages/details/details-page";
import {HomePage} from "./pages/home/home-page";
import {Header} from "./components/header";
import {ErrorBoundary} from "react-error-boundary";

const queryClient = new QueryClient();

function App() {
    return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <Router>
                <Header />
                <ErrorBoundary
                    FallbackComponent={() => (
                        <h3 className='u-type-body-1 u-mt-24 u-text-center'>Oh no. Something went wrong. Please refresh the page.</h3>
                    )}
                >
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/search">
                            <SearchPage />
                        </Route>
                        <Route path="/repo/:id">
                            <DetailsPage />
                        </Route>
                    </Switch>
                </ErrorBoundary>
            </Router>
        </QueryClientProvider>
    </div>
  );
};

export default App;
