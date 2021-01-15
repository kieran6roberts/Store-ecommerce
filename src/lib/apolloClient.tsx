import { ApolloClient, 
    HttpLink, 
    InMemoryCache, 
    NormalizedCacheObject } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import * as React from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHCMS_API
        }),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        products: {
                            keyArgs: false,
                            merge(existing = [], incoming) {
                                return [...existing, ...incoming];
                            }
                        }
                    }
                }
            }
        })
    });
};

const initApollo = (initState = null) => {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initState) {
        const exisitingCache = _apolloClient.extract();
        _apolloClient.cache.restore({...exisitingCache, ...initState});
    }

    if (typeof window ==="undefined") {
        return _apolloClient;
    }

    if (!apolloClient) {
        apolloClient = _apolloClient;
    }
    return _apolloClient;
};

const useApollo = (initState) => {
    const store = React.useMemo(() => initApollo(initState), [initState]);
    return store;
};

export {
    initApollo,
    useApollo
};