import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from 'components/Loading';
import { fetchCountryRequest } from 'api/countries';

const CountryPage = ({ history }) => {
    const { alphaCode } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [countryInfo, setCountryInfo] = useState(null);
    useEffect(() => {
        if (alphaCode && alphaCode.length === 3) {
            const fetchCountries = async () => {
                setLoading(true);
                try {
                    const data = await fetchCountryRequest(alphaCode);
                    setCountryInfo(Object.entries(data));
                    console.log(data);
                } catch (err) {
                    console.error(err.message);
                }
                setLoading(false);
            };

            fetchCountries();
        } else {
            history.push('/');
        }
    }, [alphaCode, history]);

    const renderValue = function func(title, value) {
        if (!value) {
            return null;
        } else if (Array.isArray(value)) {
            if (value.length === 1) return func(title, value[0]);
            return (
                <>
                    {title && <p>{`${title}: `}</p>}
                    <ul>
                        {value.map((el) => (
                            <li>{func(null, el)}</li>
                        ))}
                    </ul>
                </>
            );
        } else if (typeof value === 'object') {
            return (
                <>
                    {title && <p>{`${title}: `}</p>}
                    <ul>
                        {Object.entries(value).map(([prop, value]) => (
                            <li>
                                <span className="title">{prop}:</span> {value}{' '}
                            </li>
                        ))}
                    </ul>
                </>
            );
        } else {
            return title ? (
                <>
                    <span className="title">{title}:</span> {value}{' '}
                </>
            ) : (
                <>{value}</>
            );
        }
    };

    if (isLoading) return <Loading />;

    return (
        <StyledCountryPage>
            {countryInfo.map(([prop, value]) => (
                <StyledCard key={prop}>{renderValue(prop, value)}</StyledCard>
            ))}
        </StyledCountryPage>
    );
};

export default CountryPage;

const StyledCountryPage = styled.div`
    margin: 15px 20px;
    padding: 20px 15px;
    background-color: #fff;
`;
const StyledCard = styled.div`
    padding: 5px 20px;
    font-size: 16px;
    text-align: center;
    position: relative;

    ul {
        list-style: none;
        margin: 10px;
        li {
            position: relative;

            span.title {
                position: static;
            }
        }
    }

    .title {
        position: absolute;
        left: 20px;
        font-size: 14px;
    }
    p {
        font-size: 14px;
        text-align: left;
    }
    &:hover {
        background-color: #f5f5f5;
    }
`;
