import React from 'react';
import { PEN_STATICS } from '../config/config';
import PenReducer from '../reducer/PenReducer';

const usePenState = () => {
    return React.useReducer(
        PenReducer,
        {
            color               : PEN_STATICS.colors.black,
            size                : PEN_STATICS.sizes[1],
            tool                : PEN_STATICS.tools.pen,
            isActive            : false,
            whiteboardData      : [],
            bookData            : {},
            whiteboardScaleX    : 1,
            whiteboardScaleY    : 1
        }
    )
}

export default usePenState;