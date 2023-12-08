import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --primary-color: #228dff;
        --secundary-color: #e1e6e3;

        --primary-font: Arial, Helvetica, sans-serif;
    }

    body {
        font-family: var(--primary-font);
    }

    main {
        height: 70vh;

        width: 90vw;
        margin: 0 auto;
    }

    button {
        background-color: transparent;
        border: none;
        padding: 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        border: none;
        outline: none;
    }

    li {
        list-style: none;
    }
`