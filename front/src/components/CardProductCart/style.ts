import { styled } from "styled-components";

export const StyleCardProductCart = styled.li`   
    width: 100%;
    max-width: 17rem;
    height: 12rem;
    display: flex;
    align-items: center;
    flex-flow: wrap;
    justify-content: space-around;

    border: 0.1rem solid rgb(173, 173, 173);

    padding: 0.5rem;
    margin: 0 auto;

    background-color: var(--secundary-color);

    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    border-radius: 0.3rem;
    border: none;

    .name {
        width: 80%;
        font-weight: 800;
        padding: 1rem;
    }

    .value {
        width: 5rem;
        padding: 1rem 0;

        font-weight: 800;

        text-align: center;
    }

    img > {
        width: 2rem;
        height: 2rem;
    }

    button {
        padding: 0.5rem;
    }

    @media (min-width: 750px) {
        max-width: 40rem;

        flex-flow: nowrap;

        .name {
            width: 10rem;
        }
    }
`