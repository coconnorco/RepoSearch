import {Skeleton} from "@material-ui/lab";
import React from "react";
import {useSkeletonVisibility} from "../hooks/use-skeleton-visibility";

/**
 * In conjunction with the SkeletonVisibilityProvider, this component will show a blank space for 400ms before showing a skeleton
 * loader. The classes should contain a class with a height so the blank space component has the proper height
 */
const DynamicSkeleton = ({classes, variant = 'text'}: {classes: string, variant: 'text' | 'rect' | 'circle'}) => {
    const skeletonVisibility = useSkeletonVisibility();
    return skeletonVisibility ? <Skeleton className={classes} variant={variant} /> : <div className={`u-invisible u-inline-block ${classes}`}></div>
}

export default DynamicSkeleton;