import { styled } from "styled-components";


export const StyleListProduct = styled.ul`
    display: flex;
    justify-content: center;
    gap: 1rem;

    padding: 2rem 0;

    overflow-x: auto;
    
    @media (min-width: 750px) {
        ul {
            flex-flow: wrap;
        }
    }
`