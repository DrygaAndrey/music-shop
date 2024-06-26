import React from 'react';
import classNames from 'classnames';
import './card.scss'
import Button from '../button/button';
export const CARD_TYPES = {
    CATEGORY: "category",
    ADDCARD: "addcard",
    GOOD: 'good'
}
function Card({
    type = CARD_TYPES.CATEGORY,
    editButtonHandler,
    text,
    addCategoryHandler,
    categoryId,
    pictureCode,
    deleteButtonHandler
}) {
    const cardClassNames = classNames({
        card: true,
        [`card--${type}`]: true
    });

    switch (type) {
        case CARD_TYPES.CATEGORY:

            return (
                <div className={cardClassNames}>
                    <div className='top'>
                        <div className='imageContainer'>
                            <img
                                className="image"
                                src={`data:image/png;base64, ${pictureCode}`}
                                alt="categoryPicture" />
                        </div>


                    </div>
                    <div className='bot'>
                        <p>{text}</p>
                        <Button onClick={() => deleteButtonHandler(categoryId)} buttonText={`Delete this ${type}`} />
                        <Button onClick={() => editButtonHandler(categoryId)} buttonText={`Edit this ${type}`} />
                    </div>
                </div>
            );

        case CARD_TYPES.ADDCARD:
            return (
                <div className={cardClassNames} onClick={addCategoryHandler}>
                    &#10010;
                    <p>{text}</p>
                </div>
            );
        default:
            return null;
    }
}
export default Card;

