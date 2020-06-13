import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Loading from 'components/Loading';
import { fetchRegionsRequest } from 'api/regions';
import RegionItem from './RegionItem';
const RegionsPage = () => {
    const [regions, setRegions] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const fetchRegions = async () => {
            setLoading(true);
            try {
                const data = await fetchRegionsRequest();
                setRegions(data);
            } catch (err) {
                console.error(err.message);
            }
            setLoading(false);
        };

        fetchRegions();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <StyledRegionsPage>
            {regions.map((region) => (
                <RegionItem key={region} title={region} />
            ))}
        </StyledRegionsPage>
    );
};

export default RegionsPage;

const StyledRegionsPage = styled.div`
    display: flex;
    flex-direction: column;
    
`;
