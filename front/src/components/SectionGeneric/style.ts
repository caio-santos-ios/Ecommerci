import { styled } from "styled-components";


export const StyleSectionGeneric = styled.section<{ typeSection: string | null }>`
    height: 100%;
    width: 90vw;
    margin: 0 auto;
    
    ${(props) => 
        props.typeSection == 'display_login' &&
        `        
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        
        > div {
            height: 10rem;
            width: 17rem;
            
            display: flex;
            align-items: center;
            justify-content: center;            
            flex-flow: wrap;
        
            > button {
                width: 12rem;
                height: 3rem
            }
        }
        `
    }
    ${(props) => 
        props.typeSection == 'display_home' &&
        `
        display: flex;
        justify-content: center;
        align-items: center;
       `
    }

    ${(props) => 
        props.typeSection == 'display_confirmation' &&
        `
        display: flex;
        justify-content: center;
        align-items: center;
        
       `
    }
`