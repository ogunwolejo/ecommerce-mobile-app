import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default HomeScreen = ({navigation}) => {
    const {colors} = useTheme();
    return (
        <View style={{...styles.root, backgroundColor:colors.background}}>

        </View>
    );
}


const styles = StyleSheet.create({
    root:{
        flex:1
    }
})