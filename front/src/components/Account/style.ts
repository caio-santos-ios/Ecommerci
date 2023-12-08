import { styled } from "styled-components";

type UserNameProps = {
    isAdmin: boolean;
}
export const StyleAccount = styled.div<UserNameProps>`

    width: 8rem;

    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 1rem;

    padding: 1rem;
    
    > div {
        width: 4rem;
        
        display: flex;
        justify-content: space-around;
        align-items: center;
        
        color: ${(props) => (props.isAdmin ? 'red' : 'white')};

        > span {
            font-size: 1rem;
            font-weight: 700;

        }
    }

    > button {
        border: 0.05rem solid white;
        padding: 0.5rem;

        margin: 0 auto;
        
        color: white;

        width: 4.5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        border-radius: 0.5rem;
    }

`