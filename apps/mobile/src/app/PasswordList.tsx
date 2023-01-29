import React, {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  Main,
  ScrollableContainer,
  Button,
  Heading,
  ButtonText,
  ListContainer,
  StyledInput,
  Bar,
  BarText,
} from './PasswordList.styled';
import encryptedStorage from "./EncryptedStorage";
import Layout from "./Layout";
import {Formik} from "formik";

const Password = ({text}) => (
  <Bar>
    <BarText>{text}</BarText>
  </Bar>
);

// curl http://localhost/api/auth/passwords -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN6eW1vbiIsImlhdCI6MTY3NDkyNzc3NCwiZXhwIjoxNjc1MzU5Nzc0fQ.i5GFf4ohHDG73jyXa5_FY_SBIL4-S_vZ1KBA1Ddjsmo"
export const getPasswordsCall = async () => {
  const accessToken = await encryptedStorage.get('accessToken');
  const userId = await encryptedStorage.get('userId');
  const url = 'http://localhost/api/auth/passwords';

  const response = await fetch(url, {
    headers: new Headers([['Authorization', `Bearer ${accessToken}`]]),
    method: 'POST',
    body: JSON.stringify({userId}),
  });

  const json = await response.json();
  return json;
};

// curl -X POST http://localhost/api/auth/password -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN6eW1vbiIsImlhdCI6MTY3NDkyNzc3NCwiZXhwIjoxNjc1MzU5Nzc0fQ.i5GFf4ohHDG73jyXa5_FY_SBIL4-S_vZ1KBA1Ddjsmo" -H "Content-Type: application/json" -d '{ "password": "psss"}'
export const addPasswordMutation = async ({password}) => {
  console.log('addPasswordMutation', password);
  const accessToken = await encryptedStorage.get('accessToken');
  const userId = await encryptedStorage.get('userId');
  const url = 'http://localhost/api/auth/password';

  const response = await fetch(url, {
    headers: new Headers([['Authorization', `Bearer ${accessToken}`], ['Content-Type', `application/json`]]),
    method: 'POST',
    body: JSON.stringify({userId, password}),
  });

  if (response.status === 200) {
    const json = await response.json();
    return json;
  }

  const e = await response.json();
  throw e;
};

export const PasswordList = () => {
  const {data: passwordsList, refetch: refetchPasswords} = useQuery(
    ['getPasswordsCall'],
    getPasswordsCall,
  );
  useEffect(() => {
    refetchPasswords();
  });

  const addPassword = useMutation(addPasswordMutation);

  console.log(passwordsList);
  return (
    <Layout>
      <Main>
        <Formik
          initialValues={{password: ""}}
          onSubmit={(values) => addPassword.mutate(values, {onSuccess: () => refetchPasswords()})}
        >
          {({
              handleChange,
              handleSubmit,
              values,
            }) => (
            <>
              <StyledInput
                placeholder="Podaj hasło"
                onChangeText={handleChange("password")}
                value={values.password}
              />
              <Button onPress={() => handleSubmit()}>
                <ButtonText>Dodaj hasło</ButtonText>
              </Button>
            </>
          )}
        </Formik>
        <ScrollableContainer>
          <ListContainer>
            <Heading>Lista haseł:</Heading>
            {passwordsList?.length > 0 &&
              passwordsList.map((val: string) => (
                <Password key={val} text={val}/>
              ))}
          </ListContainer>
        </ScrollableContainer>
      </Main>
    </Layout>
  );
};

export default PasswordList;
