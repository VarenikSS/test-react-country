import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TableRow = ({ country, columns }) => {
    return (
        <StyledTableRow>
            {columns.map((name) => (
                <td key={name}>
                    {name === 'name' ? (
                        <Link className="link" to={`/${country.alpha3Code}`}>{country[name]}</Link>
                    ) : (
                        country[name]
                    )}
                </td>
            ))}
        </StyledTableRow>
    );
};

export default TableRow;

const StyledTableRow = styled.tr`
    &:hover {
        background-color: #f5f5f5;
    }
    td {
        padding: 5px 5px 5px 0;
    }
    .link {
        text-decoration: none;

        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
            color: black;
        }
    }
`
