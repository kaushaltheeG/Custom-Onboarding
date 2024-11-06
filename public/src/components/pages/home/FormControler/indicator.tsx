import React from "react";
import { Circle, IndicatorContainer } from "../styles";

interface PageIndicatorProps {
    currentPage: number; // Expecting a number between 1 and 3
}

const PageIndicator: React.FC<PageIndicatorProps> = ({ currentPage }) => {
    return (
        <IndicatorContainer>
            {[1, 2, 3].map((page) => (
                <Circle key={page} active={currentPage === page}>
                    {currentPage === page ? page : ''}
                </Circle>
            ))}
        </IndicatorContainer>
    );
};

export default PageIndicator;
