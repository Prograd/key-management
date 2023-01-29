import styled from 'styled-components/native';

export const Bar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 65px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: darkgreen;
`;

export const Option = styled.TouchableOpacity`
  display: flex;
  background-color: lightgreen;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const OptionText = styled.Text`
  color: white;
`;
