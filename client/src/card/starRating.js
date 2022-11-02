import React from 'react';
import StarIcon from '../icons/starIcon';
import classes from './starRating.module.css';

function StarRating(props) {
    const fullStar = props.stars;
    return(
        <div className={classes.rating}>
            <span className={`${classes.star} ${fullStar >= 4 ? classes.starFill: classes.avg}`}>
                <StarIcon />
            </span>
        </div>
    );
}

export default StarRating;