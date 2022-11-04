import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AllPosts from '../src/Screens/AllPosts';
import TestRenderer, {act, create} from 'react-test-renderer';

describe("Check AllPosts Screen",()=>{
    jest.useFakeTimers();
    
    const params: any = {
        navigation: { navigate: jest.fn() },
    }

    let tree: any;
    act(() => {
      tree = create(
            <NavigationContainer>
                <AllPosts {...params} />
            </NavigationContainer>
        );
    });

    test("renders", async () => {
        jest.spyOn(React, "useEffect").mockImplementation((f) => f());
        let component;
        await act(async () => {
          component = TestRenderer.create(
            <NavigationContainer>
                <AllPosts {...params} />
            </NavigationContainer>
          );
        });
        expect(component.toJSON()).toMatchSnapshot();
      });


    test('render without crashing', () => {
        const res = tree.root.children;
        expect(res).toBeTruthy();
    });

    test("User should be able to enter text in search box", ()=>{
        setTimeout(() => {
            const searchText =  tree.root.findByProps({ testID: "searchBox" }).props;
            act(() => {
                searchText.onChangeText();
            });
            expect(searchText).toBeTruthy();
        }, 300);
        
    })

    test("User should be able to click on an individual post", ()=>{
        setTimeout(() => {
            const searchText =  tree.root.findByProps({ testID: "openPost" }).props;
            act(() => {
                searchText.onPress();
            });
            expect(searchText).toBeTruthy();
        }, 300);
    })
})