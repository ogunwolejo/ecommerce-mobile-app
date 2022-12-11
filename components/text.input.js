import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useTheme, TextInput, Text} from "react-native-paper";
import { validateEmail, validatePassword, validateString, validateConfirmPassword } from "../services/yup";

const ACTIONS = {
  DISPATCH: "dispatcher",
  ERROR: "errorDispatcher"
};

const initialState = {
  errors:{},
  errorValue:false
}

const reducerFxn = (state = initialState, action) => {
  const {payload, name, type, errorPayload, isError} = action;
  switch(type) {
    case ACTIONS.DISPATCH:
      return {...state, [name]:payload, errors:{}, errorValue:isError} // once its true we reset the errors object to any empty object and set errorValue to false
    case ACTIONS.ERROR:
      return {...state, errorValue:isError,  errors:{[name]:errorPayload, nameType:name}}
  }
  return state;
}


export default CTextInput = ({ placeholder, keyboardType, icon, name, fetch, isPassword=false }) => {
  const { colors } = useTheme();
  const [state, dispatch] = React.useReducer(reducerFxn, initialState);

  const dispatchFxn = async(value, name) => {
    try {
      if(name === "email") {
        await validateEmail(value);
      } else if(name === "password") {
        await validatePassword(value);
      }
      else {
        await validateString(value);
      }
      fetch(state); // getting the inputted value 
      dispatch({type:ACTIONS.DISPATCH, name, payload:value, isError:false});
      
    } catch(e) {
      dispatch({type:ACTIONS.ERROR, name, errorPayload:e.errors[0], isError:true})
    }

  }


  return (
    <React.Fragment>
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      style={{ ...styles.textInput, color:colors.onSecondary }}
      value={state.name}
      onChangeText={(value) => dispatchFxn(value, name)} //dispatch({type:ACTIONS.DISPATCH, name, payload:value})
      activeOutlineColor={state.errorValue ? colors.error : colors.primary}
      outlineColor={colors.tertiary}
      outlineStyle={{borderRadius:5, borderWidth:1}}
      secureTextEntry={isPassword}
      keyboardAppearance='default'
      keyboardType={keyboardType}
      autoComplete={false}
      autoCapitalize={false}
      left={<TextInput.Icon icon={icon} size={24} color={(isTextInputFocused) => (isTextInputFocused && state.errorValue) ? colors.error : (isTextInputFocused && !state.errorValue) ? colors.primary : colors.tertiary}/>}
    />
    {(state.errorValue && state.errors.nameType === name) && <Text style={styles.error}>{state.errors[name]}</Text>}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "95%",
    marginHorizontal: "2.5%",
    textAlignVertical:'center',
    textAlign:'left',
    fontSize:12,
    fontFamily:'PoppinsRegular',
    fontWeight:'700'
  },
  error:{
    width: "95%",
    marginVertical:8,
    marginHorizontal: "2.5%",
    //textAlignVertical:'center',
    textAlign:'left',
    fontFamily:'PoppinsBold',
    fontWeight:'700',
    fontSize:12,
    color:"#FB7181" //hard coded
  }
});


