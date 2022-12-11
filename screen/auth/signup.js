import React from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Text, useTheme, Snackbar } from "react-native-paper";
import CTextInput from "../../components/text.input";

export default SignUpScreen = ({navigation}) => {
  const { colors } = useTheme();
  const [errors, setErrors] = React.useState(false);

  const signupState = {
    fullNameState:{},
    emailState:{},
    passwordState:{},
  };

  const fetchSignupFullName = (fullNameState) => signupState.fullNameState = fullNameState;
  const fetchSignupEmail = (emailState) => signupState.emailState = emailState;
  const fetchSignupPassword = (passwordState) => signupState.passwordState = passwordState;


  const onSubmitHandler = () => {
    const {emailState, fullNameState, passwordState} = signupState;

    if(emailState.errorValue | fullNameState.errorValue | passwordState.errorValue) {
      //setErrors(false);
      return
    };
    if(!fullNameState["userFullName"] | !emailState["email"] | !passwordState["password"]) {
      setErrors(true);
      return
    };

    setErrors(false);

    const newUserRegisterData = {
      fullName: fullNameState["userFullName"],
      email: emailState["email"],
      password: passwordState["password"]
    }

    return console.log(newUserRegisterData);
    
  };

  const haveAnAccountHandler = () => navigation.replace("login");

  return (
    <View style={{...styles.root,  backgroundColor: colors.background}}>
      <View>
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
            Let's Get Started{" "}
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
            Create a new account
          </Text>

          <CTextInput 
          placeholder="Full Name" 
          keyboardType={"default"} 
          icon="account-outline" 
          name="userFullName" 
          fetch={fetchSignupFullName}
          />
          <CTextInput
          name="email"
          mode="outlined"
          placeholder={"Your Email"}
          keyboardType={"email-address"}
          icon={"email-outline"}
          fetch={fetchSignupEmail}
        />
        <CTextInput
          name="password"
          mode="outlined"
          placeholder={"Password"}
          isPassword={true}
          keyboardType={"default"}
          icon={"lock-outline"}
          fetch={fetchSignupPassword}
        />
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={onSubmitHandler} activeOpacity={0.8}>
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
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.lComponent}>
        <Text style={{ ...styles.lComponentText, color: colors.onSecondary }}>
          have a account?
        </Text>
        <TouchableOpacity activeOpacity={0.9} onPress={haveAnAccountHandler}>
          <Text
            style={{ ...styles.lText, color: colors.primary, marginLeft: 1 }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
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

const styles = StyleSheet.create({
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
  Text: {
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
  }
});
