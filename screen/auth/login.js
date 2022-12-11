import React, {useState} from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, useTheme, Divider, Snackbar } from "react-native-paper";
import CTextInput from '../../components/text.input';

const LoginScreen = ({navigation}) => {
  const { colors } = useTheme();
  const [errors, setErrors] = useState(false);
  
  const forgetPasswordHandlerNavigation = () => {};
  const createNewAccountHandlerNavigation = () => navigation.replace("signup")
  
  const loginStateData = {
    emailState:{},
    passwordState:{},
  }

  const fetchLoginEmail = (emailState) => loginStateData.emailState = emailState;
  const fetchLoginPassword = (passwordState) => loginStateData.passwordState = passwordState;

  const onLoginHandler = () => {
    const {emailState, passwordState} = loginStateData;

    if(emailState.errorValue | passwordState.errorValue) {
      //setErrors(true);
      return
    };
    if(!emailState["email"] | !passwordState["password"]) {
      setErrors(true);
      return
    };

    setErrors(false);

    const userCredentials = {
      email:emailState["email"],
      password:passwordState["password"]
    }
    
    console.log(userCredentials);

    navigation.replace("tab"); //navigate to the tab screen
  };

  const onLoginThroGoogle = () => {
    console.log("google signup");
  };
  const onLoginThroFacebook = () => {
    console.log("facebook signup");
  };

  return (
    <View style={{ ...styles.root, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={require("../../assets/icons/Icon.png")}
          style={styles.image}
        />
        <Text
          style={{
            color: colors.secondary,
            fontWeight: "700",
            fontSize: 16,
            fontFamily: "PoppinsBold",
            letterSpacing: 0.5,
            marginTop: 16,
            marginBottom: 8,
            ...styles.textWrapper,
          }}
        >
          Welcome to Lafyuu{" "}
        </Text>

        <Text
          style={{
            color: colors.secondary,
            fontWeight: "400",
            fontSize: 12,
            fontFamily: "PoppinsLight",
            letterSpacing: 0.5,
            marginBottom: 28,
            ...styles.textWrapper,
          }}
        >
          Sign in to continue 
        </Text>
        <CTextInput
          name="email"
          mode="outlined"
          placeholder={"Your Email"}
          keyboardType={"email-address"}
          icon={"email-outline"}
          fetch={fetchLoginEmail}
        />
        <CTextInput
          name="password"
          mode="outlined"
          placeholder={"Password"}
          isPassword={true}
          keyboardType={"default"}
          icon={"lock-outline"}
          fetch={fetchLoginPassword}
        />
        <TouchableOpacity onPress={onLoginHandler} activeOpacity={0.8}>
          <View style={{ backgroundColor: colors.primary, ...styles.button }}>
            <Text
              style={{
                color: colors.background,
                textAlign: "center",
                //textAlignVertical: "center",
                fontSize: 14,
                fontWeight: "700",
                fontFamily: "PoppinsBold",
              }}
            >
              Sign In
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.root_2}>
        <Divider
          style={{ color: colors.outline, borderWidth: 0.3, flex: 1 }}
          horizontalInset={true}
          bold={false}
        />
        <Text style={{ ...styles.root_2_text, color: colors.onSecondary }}>
          OR
        </Text>
        <Divider
          style={{ color: colors.outline, flex: 1, borderWidth: 0.3 }}
          horizontalInset={true}
          bold={false}
        />
      </View>

      <TouchableOpacity
        onPress={onLoginThroGoogle}
        activeOpacity={0.8}
        style={{ marginTop: 16 }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            ...styles.cButton,
            borderColor: colors.outline,
          }}
        >
          <Image
            source={require("../../assets/icons/Google.png")}
            style={styles.cImage}
          />
          <Text
            style={{
              color: colors.onSecondary,
              textAlign: "center",
              fontSize: 14,
              fontWeight: "700",
              fontFamily: "PoppinsBold",
              alignSelf: "center",
              ...styles.cText,
            }}
          >
            Login with Google
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onLoginThroFacebook}
        activeOpacity={0.8}
        style={{ marginTop: 8, marginBottom: 16 }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            ...styles.cButton,
            borderColor: colors.outline,
          }}
        >
          <Image
            style={styles.cImage}
            source={require("../../assets/icons/Facebook.png")}
          />
          <Text
            style={{
              color: colors.onSecondary,
              textAlign: "center",
              fontSize: 14,
              fontWeight: "700",
              fontFamily: "PoppinsBold",
              ...styles.cText,
            }}
          >
            Login with facebook
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.9} style={{ marginBottom: 8 }} onPress={forgetPasswordHandlerNavigation}>
        <Text style={{ ...styles.lText, color: colors.primary }}>
          Forget Password?
        </Text>
      </TouchableOpacity>

      <View style={styles.lComponent}>
        <Text style={{ ...styles.lComponentText, color: colors.onSecondary }}>
          Don't have a account?
        </Text>
        <TouchableOpacity activeOpacity={0.9} onPress={createNewAccountHandlerNavigation}>
          <Text
            style={{ ...styles.lText, color: colors.primary, marginLeft: 1 }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
      {errors && <Snackbar 
          visible={errors} 
          onDismiss={() => setErrors(false)}
          action={{
            label:"close",
            onPress: () => setErrors(false),
          }}
        duration={2000}
        elevation={5}
        >
        <Text style={{color:colors.error, fontSize:12, fontFamily:"PoppinsLightItalic", fontStyle:'200'}}>waiting for user credentials</Text>
      </Snackbar>}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  snackbar:{
  },
  root: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
  },
  textWrapper: {
    alignSelf: "center",
  },
  button: {
    marginHorizontal: "2.5%",
    height: 56,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 21,
    borderRadius: 5,
    shadowOffset: { width: 30, height: 10 },
    shadowColor: "rgba(64, 191, 255, 0.24)",
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  root_2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  root_2_text: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: "0.5%",
  },
  cButton: {
    flexDirection: "row",
    height: 57,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: "2.5%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  cImage: {
    marginLeft: 16,
  },
  cText: {
    flex: 1,
  },
  lText: {
    fontFamily: "PoppinsExtraBold",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  lComponent: {
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lComponentText: {
    fontFamily: "PoppinsLight",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.5,
  },
  textInput: {
    width: "95%",
    marginHorizontal: "2.5%",
    textAlignVertical: "center",
    textAlign: "left",
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    fontWeight: "700",
  },
});
