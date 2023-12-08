import { styled } from "styled-components";


export const StyleListCart = styled.ul`
    display: flex;
    flex-flow: column;
    align-items: center;
    
    padding: 0;

    h4 {
        text-align: center;
    }
    
    .list_cart {
        height: 30rem;
        width: 80vw;

        display: flex;
        flex-flow: column;
        align-items: center;
        gap: 1rem;
        
        position: relative;
        
        overflow-y: auto;

        padding: 0 1rem;
    }

    > .container_finish {
        width: 20rem;

        display: flex;
        flex-flow: wrap;
        justify-content: space-around;

        border-radius: 0.3rem;       
        
        margin: 0;
        padding: 1rem;
        
        background-color: var(--secundary-color);

        position: relative;
        
        h6 {
            height: 3rem;

            padding: 1rem;
            font-weight: 700;
        }

        button {
            background-color: #3ec9a7;

            font-weight: 100;
            font-size: 1.5rem;

            padding: 1rem 1.2rem;

            border: none;
        }
    }
    

    @media (min-width: 990px) {
        flex-flow: row;
        justify-content: center;
        align-items: start;
        gap: 3rem;

        .list_cart {
            width: 42rem;
            height: 50rem;
        }
        
        .container_finish {
            height: 12rem;
            
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);

        }
    }
`