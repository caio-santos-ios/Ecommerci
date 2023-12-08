import { styled } from "styled-components";

export const StyleCardProduct = styled.li`
    width: 15rem;
    height: 25rem;

    padding: 1rem;
    
    position: relative;

    border-radius: 0.3rem;

    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

    > img {
        width: 100%;
        height: 50%;
    }

    > div {
        display: flex;
        flex-flow: column;
        gap: 1rem;

        height: 40%;

        padding: 1rem;

        position: relative;

        > span {
            position: absolute;
            bottom: 1rem;
            font-weight: 700;
        }
    }

    > .btn_add {
        position: absolute;
        bottom: 1rem;
        left: 2rem;

        border-radius: 0.3rem;
    }

`