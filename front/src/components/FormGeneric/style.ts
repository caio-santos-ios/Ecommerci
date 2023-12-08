import { styled } from "styled-components";


export const StyleFormGeneric = styled.form<{ typeForm: string | null }>`
    padding: 1rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    gap: 1rem;
    
    ${(props) => 
        props.typeForm == 'display_confirmation' &&
        `
            width: 30rem;
       `
    }

    ${(props) => 
            props.typeForm == 'display_login' &&
            `
            width: 20rem;
        `
    }
`