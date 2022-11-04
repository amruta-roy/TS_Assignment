import React, { useState , FC } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import { validateName, validatePassword } from "../Validator";
import axios from "../../axios";
import { useNavigation } from "@react-navigation/native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackNavigator } from "../../App";

  type screenNavigation = NativeStackNavigationProp<HomeStackNavigator,'AllPosts', 'Login'>
 let userNmError = "UserName is not in proper format.";

const SignUp: FC = () => {

    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error , setError] = useState<string>('');
    const navigation = useNavigation<screenNavigation>();
    
    // fucntion to validate the user input - UserName, Password and Confirm Password fields
    const validate = (usrName: string, pwd: string, confirmPwd: string) => {
        
        setError('');

        if(!validateName(usrName))
            setError(userNmError);
        else if ( !validatePassword(pwd))
            setError("Password doesn't match the required format");
        else if ( !validatePassword(confirmPwd))
            setError("Password doesn't match the required format");
        else if( pwd != confirmPwd)
            setError("The two Passwords do not match");
        else
            addUser();
    }

    // Function to check whether entered 'UserName' is already registered
    // If Not - Add User to DB.
    // If Yes - Display error message
    const addUser = async()=> {

        // Check whether userName has already been registered.

        let userFound:Boolean = false;
        await axios.get('/users.json?orderBy="username"&equalTo="'+userName.toLowerCase()+'"')
        .then(async response => {
            console.log("state userName:"+userName+"\tPassword:"+password)

            let users = Object.values(response.data);
            console.log("Users data - ",users.length);
            
            if(users.length == 0)
            {   // If not already registered - create a new User
                const userData = {
                    username: userName.toLowerCase(),
                    password: password
                }
                
                await axios.post( '/users.json', userData )
                    .then( response => {
                        // On successfull account creation - navigate to DashBoard
                        navigation.navigate("AllPosts");
                    } )
                    .catch( error => {
                        setError("N/W error. Account could not be created.")
                    } );
                    Alert.alert("Account created successfully!!");
            }
            else // UserName already Registered - set Error
                setError("UserName already registered !!")
        })
        .catch(error => {
            console.log('DB error - Couldnt fetch users');
            setError("User could not be created. Please try again later!");
        });
    }

    const updateUserName = (usrName: string) => {
        setUserName(usrName);
    }

    const updatePwd = (pwd: string, type: string) => {
        if(type == "pwd" )
            setPassword(pwd);
        else if( type == "confirmPwd")
            setConfirmPassword(pwd);
    }

    const signIn = () => {
        navigation.navigate('Login');
    }

    return(
        <ScrollView>
            {/* Display screen title */}
            <Text 
                testID="title" style={ styles.txtTitle}>Sign Up
            </Text>

            {/* TextInput for accepting 'UserName' */}
            <View style={styles.outerView}>
                <Text 
                    testID="labelUserName"
                    style={{ fontSize:14, color: '#000', marginLeft: wp(15)}}>UserName
                </Text>
                <TextInput
                    testID="userNameInput"
                    style={styles.userNameInput}
                    placeholder="UserName"
                    placeholderTextColor={'grey'}
                    value={userName}
                    onChangeText={(value) => updateUserName(value)}
                />
            </View>

            {/* TextInput for accepting 'Password' */}
            <View style={ styles.outerView }>
                <Text 
                    testID="labelPwd"
                    style={{ fontSize:14, color: '#000', marginLeft: wp(15)}}>Password
                </Text>
                <TextInput
                    testID="pwdInput"
                    style={styles.userNameInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value)=>updatePwd(value,"pwd")}
                />
            </View>

            {/* TextInput for accepting 'Confirm Password' */}
            <View style={ styles.outerView }>
                <Text 
                    testID="labelConfirmPwd"
                    style={{ fontSize:14, color: '#000', marginLeft: wp(15)}}>Confirm Password
                </Text>
                <TextInput
                    testID="confirmPwdInput"
                    style={styles.userNameInput}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(value)=>updatePwd(value,"confirmPwd")}
                />
            </View>

            {/* Display Error text in case of any Error */}
            { error.length > 0 ? <Text style={ styles.txtError }>{error}</Text> : null}

            {/* Button for submitting "Create Account" request */}
            <TouchableOpacity
                testID="createAcntButton"
                style={{...styles.btnLogin, alignSelf: "center"}}
                onPress={() => validate(userName, password, confirmPassword)}
            >
                <Text testID="createAcntLabel" style={styles.txtLabel}>Create Account</Text>
            </TouchableOpacity>

            {/* Provide the user option to redirect to Login Screen if already registered */}
            <TouchableOpacity
                testID="signInButton"
                onPress={signIn}
            >
              <Text testID="alreadyUsrLabel" style={{...styles.txtSignUp, marginTop: hp(3)}}>
                Already an User ? 
                <Text testID="signInLabel" style={styles.btnSignUp}> SignIn</Text>
              </Text>
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    marginTop: hp(5),
                    marginHorizontal: wp(10)
                }}
                >
                <Text
                    testID="userNameRules"
                    style={{ marginBottom: hp(1), fontSize: 16 , fontWeight: 'bold' }}
                >UserName may contain the following - </Text>
                <Text
                    testID="userNameRule1"
                    style={{ marginBottom: hp(1) }}
                    >1) Lower case or Upper case letters</Text>
                <Text
                    testID="userNameRule2"
                    style={{ marginBottom: hp(1) }}
                    >2) Digits from 0 - 9</Text>
                <Text
                    testID="userNameRule3"
                    style={{ marginBottom: hp(1) }}
                    >3) Maximum 30 in length</Text>
            </View>

            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    marginTop: hp(2),
                    marginHorizontal: wp(10)
                }}
                >
                <Text
                    testID="pwdRules"
                    style={{ marginBottom: hp(1), fontSize: 16 , fontWeight: 'bold' }}
                >Password must contain the following - </Text>
                <Text
                    testID="pwdRule1"
                    style={{ marginBottom: hp(1) }}
                    >1) At least one upper case letter</Text>
                <Text
                    testID="pwdRule2"
                    style={{ marginBottom: hp(1) }}
                    >2) At least one lower case letter</Text>
                <Text
                    testID="pwdRule3"
                    style={{ marginBottom: hp(1)}}
                    >3) At least one digit</Text>
                <Text
                    testID="pwdRule4"
                    style={{ marginBottom: hp(1) }}
                    >4) At least one special character</Text>
                <Text
                    testID="pwdRule5"
                    style={{ marginBottom: hp(1) }}
                    >5) Minimum 8 in length</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    outerView:{
        marginVertical: hp(2), 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'center'
    },
    userNameInput: {
        color:"#000", 
        borderColor: 'grey', 
        borderWidth: 2, 
        width: wp(70), 
        height: hp(5), 
        fontSize: 18, 
        
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
    txtError: {
        color: 'red', 
        fontSize: 16, 
        marginLeft: wp(15)
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
        marginTop: hp(4)
      },
      txtLabel: {
        color: "#FFF",
        fontWeight: '900',
        fontSize: hp(2.4),
      },
      txtTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: "center",
        color: "blue",
        marginVertical: hp(6)
      }
})

export default SignUp;