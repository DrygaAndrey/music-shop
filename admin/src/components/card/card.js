import React from 'react';
import classNames from 'classnames';
import './card.scss'
import Button from '../button/button';
export const CARD_TYPES = {
    CATEGORY: "category",
    ADDCARD: "addcard",
    PRODUCT: 'product'
}
function Card({
    type = CARD_TYPES.CATEGORY,
    editButtonHandler,
    text,
    addCardHandler,
    categoryId,
    pictureCode,
    deleteButtonHandler,
    cardClickHandler
}) {
    const cardClassNames = classNames({
        card: true,
        [`card--${type}`]: true
    });

    switch (type) {
        case CARD_TYPES.CATEGORY:
            return (
                <div className={cardClassNames} onClick={() => cardClickHandler(categoryId)}>
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
                        <Button onClick={(event) => { event.stopPropagation(); deleteButtonHandler(categoryId); }} buttonText={`Delete this ${type}`} />
                        <Button onClick={(event) => { event.stopPropagation(); editButtonHandler(categoryId); }} buttonText={`Edit this ${type}`} />
                    </div>
                </div>
            );

        case CARD_TYPES.PRODUCT:
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
                <div className={cardClassNames} onClick={addCardHandler}>
                    &#10010;
                    <p>{text}</p>
                </div>
            );
        default:
            return null;
    }
}
export default Card;

