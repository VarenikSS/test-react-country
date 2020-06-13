import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Loading from 'components/Loading';
import Collapse from 'components/Collapse';
import Table from 'components/Table';
import TableRow from 'components/Table/TableRow';
import { fetchRegionCountryRequest } from 'api/regions';

const RegionItem = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [countries, setCountries] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && !countries.length) {
            const fetchCountries = async () => {
                setLoading(true);
                try {
                    const data = await fetchRegionCountryRequest(title);
                    setCountries(data);
                } catch (err) {
                    console.error(err.message);
                }
                setLoading(false);
            };

            fetchCountries();
        }
    }, [isOpen, title, countries]);

    const toggleHandler = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StyledRegionItem className={isOpen ? 'open' : ''}>
            <h2 className="title" onClick={toggleHandler}>
                {title}
            </h2>
            <Collapse isOpen={isOpen}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Table
                        data={countries}
                        columns={['name', 'population']}
                        renderRow={({ data, columns }) => {
                            return data.map((country) => (
                                <TableRow
                                    key={country.alpha3Code}
                                    country={country}
                                    columns={columns}
                                />
                            ));
                        }}
                    />
                )}
            </Collapse>
        </StyledRegionItem>
    );
};

export default RegionItem;

const StyledRegionItem = styled.div`
    background-color: #fff;
    padding: 10px 15px;
    margin: 5px; 
    transition: all 0.5s ease-out;

    .title {
        cursor: pointer;

    }

    &.open {
        
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 1px 3px 0px rgba(0, 0, 0, 0.12);
        margin: 10px 5px;
    }


`;
