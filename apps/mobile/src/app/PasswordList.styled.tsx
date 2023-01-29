import styled from 'styled-components/native';

export const Main = styled.View`
  flex: 1;
  margin: 0px 30px;
`;

export const ScrollableContainer = styled.ScrollView``;

export const StyledInput = styled.TextInput`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  width: 100%;
  border-radius: 20px;
  background-color: #eee;
  padding: 9px 15px;
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  background-color: lightblue;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 20px;
`;

export const Heading = styled.Text`
  color: cadetblue;
  font-size: 20px;
  margin-bottom: 15px;
`;

export const ButtonText = styled.Text`
  color: white;
  text-align: center;
`;

export const Bar = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid cadetblue;
`;

export const BarText = styled.Text`
  color: red;
`;

export const ListContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
