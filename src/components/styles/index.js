import styled from 'styled-components';

export const FullContainer = styled.div`
  font-family: Roboto, serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`;

export const ColumnFlexBox = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

export const CenteredHeader1 = styled.h1`
  text-align: center;
`;

export const CenteredHeader2 = styled.h2`
  text-align: center;
`;

export const PaddedDiv = styled.div`
  padding: 8px;
`;

export const MarginDiv = styled.div`
  margin: 8px;
`;
