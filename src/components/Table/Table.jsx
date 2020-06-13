import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const Table = ({ columns, data, renderRow }) => {
    const [sortConfig, setSortConfig] = useState(null);

    const sortHandler = (prop) => () => {
        const direction =
            sortConfig?.prop === prop && sortConfig.direction === 'descending'
                ? 'ascending'
                : 'descending';
        setSortConfig({ prop, direction });
    };

    const sortedCountries = useMemo(() => {
        return sortConfig
            ? [...data].sort((a, b) => {
                  if (a[sortConfig.prop] < b[sortConfig.prop]) {
                      return sortConfig.direction === 'ascending' ? -1 : 1;
                  }
                  if (a[sortConfig.prop] > b[sortConfig.prop]) {
                      return sortConfig.direction === 'ascending' ? 1 : -1;
                  }
                  return 0;
              })
            : [...data];
    }, [data, sortConfig]);

    if (!sortedCountries || !sortedCountries.length) return null;

    return (
        <StyledTable>
            <thead>
                <tr>
                    {columns.map((name) => (
                        <th key={name} onClick={sortHandler(name)}>
                            {name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{renderRow({ data: sortedCountries, columns })}</tbody>
        </StyledTable>
    );
};

export default Table;

const StyledTable = styled.table`
    width: 100%;
    
    thead {
        border-bottom: 1px solid grey;

        th {
            padding: 5px 0;
            text-align: left;
            font-size: 18px;
            cursor: pointer;
        }
    }

    tbody {
        tr:first-child {
            td {
                padding-top: 15px;
            }
        }
    }
    
`
