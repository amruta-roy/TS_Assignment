import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import PostDetails from '../src/Screens/PostDetails';
import renderer, {act, create} from 'react-test-renderer';

describe("Check Post Details Screen",()=>{
    jest.useFakeTimers();

    let data = {
        "body": "quo deleniti praesentium dicta non quodaut est molestiasmolestias et officia quis nihilitaque dolorem quia", 
        "id": 99, 
        "title": "temporibus sit alias delectus eligendi possimus magni", 
        "userId": 10
    }
    
    const params: any = {
        navigation: { navigate: jest.fn(), route: {post: data} },
    }

    let tree: any;
    act(() => {
      tree = create(
            <NavigationContainer>
                <PostDetails {...params} />
            </NavigationContainer>
        );
    });

    test('render without crashing', () => {
        const res = tree.root.children;
        expect(res).toBeTruthy();
    });

})