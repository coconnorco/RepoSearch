import {Skeleton} from "@material-ui/lab";
import React from "react";
import {useSkeletonVisibility} from "../hooks/use-skeleton-visibility";


const DynamicSkeleton = ({classes, variant = 'text'}) => {
    const skeletonVisibility = useSkeletonVisibility();
    return skeletonVisibility ? <Skeleton className={classes} /> : <div className={`u-invisible u-inline-block ${classes}`}></div>
}

export default DynamicSkeleton;