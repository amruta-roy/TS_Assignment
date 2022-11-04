import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SignUp from '../src/Screens/SignUp';
import renderer, {act, create} from 'react-test-renderer';

describe("Check SingUp Screen",()=>{
    jest.useFakeTimers();
    
    const params: any = {
        navigation: jest.fn(),
    }

    let tree: any;
    act(() => {
      tree = create(

            <NavigationContainer>
                <SignUp {...params} />
            </NavigationContainer>

        );
    });

    test('render without crashing', () => {
        const res = tree.root.children;
        expect(res).toBeTruthy();
    });

    test('Page Title', () => {
        const title = tree.root.findByProps({ testID: "title"}).props;
        expect(title).toBeTruthy();
    });

    test('Label for UserName', () => {
        const label = tree.root.findByProps({ testID: "labelUserName"}).props;
        expect(label).toBeTruthy();
    });

    test("User should be able to enter the UserName", ()=>{
        const userName =  tree.root.findByProps({ testID: "userNameInput" }).props;
        act(() => {
            userName.onChangeText();
        });
        expect(userName).toBeTruthy();
    })

    test('Label for Password', () => {
        const label = tree.root.findByProps({ testID: "labelPwd"}).props;
        expect(label).toBeTruthy();
    });

    test("User should be able to enter the password", ()=>{
        const pwd =  tree.root.findByProps({ testID: "pwdInput" }).props;
        act(() => {
            pwd.onChangeText();
        });
        expect(pwd).toBeTruthy();
    })

    test('Label for Confirm Password', () => {
        const label = tree.root.findByProps({ testID: "labelConfirmPwd"}).props;
        expect(label).toBeTruthy();
    });

    test("Confirm Password Field", ()=>{
        const confirmPwd =  tree.root.findByProps({ testID: "confirmPwdInput" }).props;
        act(() => {
            confirmPwd.onChangeText();
        });
        expect(confirmPwd).toBeTruthy();
    })
    
    test("Create Account Button onPress", ()=>{
        const createAcntBtn =  tree.root.findByProps({ testID: "createAcntButton" }).props;
        act(() => {
            createAcntBtn.onPress();
        });
        expect(createAcntBtn).toBeTruthy();
    })

    test('Create Account Btn Label', () => {
        const label = tree.root.findByProps({ testID: "createAcntLabel"}).props;
        expect(label).toBeTruthy();
    });

    test("SignIn Button onPress", ()=>{
        const singInBtn =  tree.root.findByProps({ testID: "signInButton" }).props;
        act(() => {
            singInBtn.onPress();
        });
        expect(singInBtn).toBeTruthy();
    })

    test('Already A User? Label', () => {
        const label = tree.root.findByProps({ testID: "alreadyUsrLabel"}).props;
        expect(label).toBeTruthy();
    });

    test('SignIn Label', () => {
        const label = tree.root.findByProps({ testID: "signInLabel"}).props;
        expect(label).toBeTruthy();
    });

    test('userName Rules Label', () => {
        const label = tree.root.findByProps({ testID: "userNameRules"}).props;
        expect(label).toBeTruthy();
    });
    test('UserName Rule1 Label', () => {
        const label = tree.root.findByProps({ testID: "userNameRule1"}).props;
        expect(label).toBeTruthy();
    });
    test('UserName Rule2 Label', () => {
        const label = tree.root.findByProps({ testID: "userNameRule2"}).props;
        expect(label).toBeTruthy();
    });
    test('UserName Rule3 Label', () => {
        const label = tree.root.findByProps({ testID: "userNameRule3"}).props;
        expect(label).toBeTruthy();
    });

    test('Password Rules Label', () => {
        const label = tree.root.findByProps({ testID: "pwdRules"}).props;
        expect(label).toBeTruthy();
    });
    test('Password Rule1 Label', () => {
        const label = tree.root.findByProps({ testID: "pwdRule1"}).props;
        expect(label).toBeTruthy();
    });
    test('Password Rule2 Label', () => {
        const label = tree.root.findByProps({ testID: "pwdRule2"}).props;
        expect(label).toBeTruthy();
    });
    test('Password Rule3 Label', () => {
        const label = tree.root.findByProps({ testID: "pwdRule3"}).props;
        expect(label).toBeTruthy();
    });
    test('Password Rule4 Label', () => {
        const label = tree.root.findByProps({ testID: "pwdRule4"}).props;
        expect(label).toBeTruthy();
    });
    test('Password Rule5 Label', () => {
        const label = tree.root.findByProps({ testID: "pwdRule5"}).props;
        expect(label).toBeTruthy();
    });
})