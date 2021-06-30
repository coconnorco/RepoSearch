import React, {useEffect, useState} from "react";

const VisContext = React.createContext(null);

export const SkeletonVisibilityProvider = ({isLoading, children}) => {
    const [skeletonVisibility, setSkeletonVisibility] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setSkeletonVisibility(false);
        }

        setTimeout(() => {
            setSkeletonVisibility(true);
        }, 400)
    }, [isLoading]);

    return (
        <VisContext.Provider value={skeletonVisibility}>
            {children}
        </VisContext.Provider>
    )
}

/**
 * In conjunction with the SkeletonVisibilityProvider, this can be used to have a consistent start delay for the skeleton
 * loaders within the provider.
 * Delay is 400ms
 *
 * @returns skeletonVisibility
 */
export const useSkeletonVisibility = () => React.useContext(VisContext);