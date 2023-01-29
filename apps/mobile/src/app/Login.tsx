import {Pressable, Text, TextInput, View} from "react-native";
import {Formik} from "formik";
import {useState} from "react";
import * as Yup from "yup";
import Layout from "./Layout";
import {StyledInput} from "./PasswordList.styled";
import encryptedStorage from "./EncryptedStorage";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getPasswordsCall} from "./PasswordList";

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

// 20.23.25.162
// curl -X POST http://localhost/api/auth/login -d '{"username": "szymon", "password": "changeme"}' -H "Content-Type: application/json"

export const loginCall = async (user: { username: string, password: string }) => {
  const url = 'http://localhost/api/auth/login';

  const response = await fetch(url, {
    headers: new Headers([['Content-Type', `application/json`]]),
    method: 'POST',
    body: JSON.stringify(user),
  });
  const json = await response.json();
  await encryptedStorage.set('accessToken', json.access_token)
  await encryptedStorage.set('userId', `${json.user.userId}`)
  if (response.status === 200) {
    return json;
  }

  const e = await response.json();
  throw e;
};

export default function LoginScreen({navigation}: any) {
  const [focus, setFocus] = useState("");
  const login = useMutation(loginCall);

  return (
    <Layout>
      <Formik
        initialValues={{userName: "", password: ""}}
        onSubmit={(values) => {
          return login.mutate({
            username: values.userName,
            password: values.password,
          });
        }}
        validationSchema={LoginSchema}
      >
        {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
          <View>
            <Text> Logowanie </Text>
            <StyledInput
              secureTextEntry={false}
              onFocus={() => {
                setFocus("userName");
              }}
              placeholder="User Name"
              onBlur={() => {
                setFocus("");
                handleBlur("userName");
              }}
              style={{
                borderColor: focus === "userName" ? "#20a9db" : "#cbcbcb",
              }}
              onChangeText={handleChange("userName")}
              value={values.userName}
            />
            {errors.userName && touched.userName ? (
              <Text>{errors.userName}</Text>
            ) : null}

            <StyledInput
              onFocus={() => {
                setFocus("password");
              }}
              secureTextEntry={true}
              placeholder="Password"
              onBlur={() => {
                setFocus("");
                handleBlur("password");
              }}
              style={{
                borderColor: focus === "password" ? "#20a9db" : "#cbcbcb",
              }}
              onChangeText={handleChange("password")}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text>{errors.password}</Text>
            ) : null}
            <Pressable
              onPress={() => handleSubmit()}
            >
              <Text>Log In</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </Layout>);
}
