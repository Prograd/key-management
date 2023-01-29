import {Pressable, Text, View} from "react-native";
import {Formik} from "formik";
import {useState} from "react";
import * as Yup from "yup";
import Layout from "./Layout";
import {StyledInput} from "./PasswordList.styled";
import {useMutation} from "@tanstack/react-query";

const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  repeatPassword: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

// curl -X POST http://localhost/api/auth/register -d '{"username": "szymon", "password": "changeme"}' -H "Content-Type: application/json"

export const registerCall = async (user: { username: string, password: string }) => {
  const url = 'http://localhost/api/auth/register';

  const response = await fetch(url, {
    headers: new Headers([['Content-Type', `application/json`]]),
    method: 'POST',
    body: JSON.stringify(user),
  });
  const json = await response.json();
  if (response.status === 200) {
    return json;
  }

  const e = await response.json();
  throw e;
};

export default function SignUpScreen({navigation}) {
  const [focus, setFocus] = useState("");
  const register = useMutation(registerCall);

  return (
    <Layout>
      <Formik
        initialValues={{userName: "", password: "", repeatPassword: ""}}
        onSubmit={(values) => register.mutate({
          username: values.userName,
          password: values.password,
        })}
        validationSchema={SignupSchema}
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
            <Text> Rejestracja</Text>
            <StyledInput
              secureTextEntry={false}
              onFocus={() => {
                setFocus("userName");
              }}
              placeholder="User name"
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
            <StyledInput
              onFocus={() => {
                setFocus("repeatPassword");
              }}
              secureTextEntry={true}
              placeholder="Repeat password"
              onBlur={() => {
                setFocus("");
                handleBlur("repeatPassword");
              }}
              style={{
                borderColor: focus === "repeatPassword" ? "#20a9db" : "#cbcbcb",
              }}
              onChangeText={handleChange("repeatPassword")}
              value={values.repeatPassword}
            />
            {errors.repeatPassword && touched.repeatPassword ? (
              <Text>{errors.repeatPassword}</Text>
            ) : null}

            <Pressable onPress={() => handleSubmit()}>
              <Text>Sign Up</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </Layout>
  );
}
