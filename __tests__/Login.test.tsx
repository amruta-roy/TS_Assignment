import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from '../src/Screens/Login';
import TestRenderer, {act, create} from 'react-test-renderer';

describe("Check Login Screen",()=>{
    jest.useFakeTimers();

    const params: any = {
        navigation: { navigate: jest.fn() },
    }

    let tree: any;
    act(() => {
      tree = create(
            <NavigationContainer>
                <Login {...params} />
            </NavigationContainer>
        );
    });

    test('render without crashing', () => {
        const res = tree.root.children;
        expect(res).toBeTruthy();
    });

    test('Page Title', () => {
        const title = tree.root.findByProps({ testID: "Title"}).props;
        expect(title).toBeTruthy();
    });

    test("UserName Field", ()=>{
        setTimeout(() => {
            const userName =  tree.root.findByProps({ testID: "UserName" }).props;
            act(() => {
                userName.onChangeText();
            });
            expect(userName).toBeTruthy();
        },700);
    })

    test("Password Field", ()=>{
        setTimeout(() => {
            const pwd =  tree.root.findByProps({ testID: "Pwd" }).props;
            act(() => {
                pwd.onChangeText();
            });
            expect(pwd).toBeTruthy();
        }, 700);
    })

    test('Login Button Label', () => {
        const label = tree.root.findByProps({ testID: "labelLogin"}).props;
        expect(label).toBeTruthy();
    });

    test('New User Label', () => {
        const label = tree.root.findByProps({ testID: "labelNewUsr"}).props;
        expect(label).toBeTruthy();
    });
    
    test('SignUp Label', () => {
        const label = tree.root.findByProps({ testID: "labelSignup"}).props;
        expect(label).toBeTruthy();
    });

    test("LoginButton onPress", ()=>{
        const loginBtn =  tree.root.findByProps({ testID: "LoginButton" }).props;
        act(() => {
            loginBtn.onPress();
        });
        expect(loginBtn).toBeTruthy();
    })

    test("SingUpButton onPress", ()=>{
        setTimeout(() => {
            const singUpBtn =  tree.root.findByProps({ testID: "SignUpButton" }).props;
            act(() => {
                singUpBtn.onPress();
            });
            expect(singUpBtn).toBeTruthy();
        }, 700);
    })

})