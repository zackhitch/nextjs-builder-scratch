import styled from '@emotion/styled';

const Container = styled.div`
    border: 1px solid red;
`;

export default function Header() {
    return (
    <Container>
        <h1>Hello World!</h1>
    </Container>
    )
}