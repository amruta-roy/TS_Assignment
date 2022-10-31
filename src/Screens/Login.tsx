import React, { useEffect, useState, FC } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { validateName, validatePassword } from "../Validator";
import axios from "../../axios";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackNavigator } from "../../App";

type postType = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type screenNavigation = NativeStackNavigationProp<HomeStackNavigator,'SignUp','AllPosts'>;

const Login: FC = () => {

    const navigation = useNavigation<screenNavigation>();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    type userData = {
        "password": string;
        "username": string;
    }
    
    const checkLogin = async() => {

        let userCorrect = false, passwordCorrect = false;

        await axios.get('/users.json?orderBy="username"&equalTo="'+userName.toLowerCase()+'"')
        .then( response => {

          let users: userData[] = Object.values(response.data);
          
          if(users.length == 0){
            setError("User not found");
            return;
          }
          let userFound: userData[] = [] ;

          users.forEach((ele:userData) => {
                if(ele.username.toString().toUpperCase == userName.toUpperCase){
                    userCorrect = true;
                    if(ele.password == password){
                        userFound.push(ele);
                        passwordCorrect = true;
                    }
                }
             });

          if(userFound.length > 0)
          {
            console.log("user Found - ",userFound.length);
            navigation.navigate("AllPosts");
          }
          else{
            if(userCorrect == true && passwordCorrect == false){
                setError("Incorrect Password");
            }
            else{
                setError("Account not found");
            }
          }
        })
        .catch(error => {
            setError("Error in connecting to Database");
        });  
    }

    const validate = () => {

        if(!validateName(userName))
        {
            setError("UserName doesn't match the required format.")
        } else if ( !validatePassword(password))
        {
            setError("Password doesn't match the required format");
        }
        else{
            checkLogin();
        }
    }

    return(
        <View>
            <Text 
                style={ styles.txtTitle}>Welcome to MyApp</Text>
            <TextInput
                style={styles.userNameInput}
                placeholder="UserName"
                placeholderTextColor={'grey'}
                value={userName}
                onChangeText={(value)=> setUserName(value)}
            />

            <TextInput
                style={styles.userNameInput}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(value)=> setPassword(value)}
            />

            { error ? <Text style={{ color: 'red', fontSize: 12, marginLeft: wp(15)}}>{error}</Text> : null}
            
            <TouchableOpacity
                style={{...styles.btnLogin, alignSelf: "center"}}
                onPress={() => validate()}
            >
                <Text style={styles.txtLabel}>{"Login"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={{...styles.txtSignUp, marginTop: hp(3)}}>
                New User ? 
                <Text style={styles.btnSignUp}> SignUp</Text>
              </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    userNameInput: {
        color:"#000", 
        borderColor: 'grey', 
        borderWidth: 2, 
        width: wp(70), 
        height: hp(5), 
        fontSize: 18, 
        marginVertical: hp(2), 
        marginHorizontal: wp(4), 
        paddingHorizontal: wp(2),
        alignSelf: "center"
    },
    txtSignUp: {
        fontSize: 16,
        textAlign: "center",
        marginTop: hp(5),
        color: '#000',
    },
    btnSignUp: {
        color: '#AA2282',
        fontWeight: "bold",
    },
    btnLogin: {
        backgroundColor: '#EB6E80',
        width: wp(40),
        height: hp(7),
        borderRadius: 30,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp(3)
      },
      txtLabel: {
        color: "#FFF",
        fontWeight: '900',
        fontSize: hp(2.4),
      },
      txtTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: "center",
        color: "blue",
        marginVertical: hp(10)
      }
})

export default Login;