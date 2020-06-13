import React from 'react';
import styled from 'styled-components';

const Collapse = ({ isOpen, children }) => {
    return isOpen ? <StyledCollapse>{children}</StyledCollapse> : null;
};

export default Collapse;

const StyledCollapse = styled.div`
    margin: 5px;
`;
