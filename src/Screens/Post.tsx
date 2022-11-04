import React, { FC } from 'react';
import { 
    Text, 
    View, 
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackNavigator } from "../../App";

type postType = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Props {
    key: number;
    post: postType;
}

type screenNavigation = NativeStackNavigationProp<HomeStackNavigator,'PostDetails'>;

const Post: FC<Props> = (props) => {

    const post:postType = props.post;
    const navigation = useNavigation<screenNavigation>();

    return (
        <View style={{flex:1}}>
            <TouchableOpacity 
                testID='openPost'
                style={postStyles.postView}
                onPress={()=> {
                    navigation.navigate("PostDetails", { post : post });
                }}
            >
                <View style={ postStyles.idView}>
                    <Text style={ postStyles.postTitleTxt }>
                        Post Id : 
                    </Text>
                    <Text style={ postStyles.postTitleTxt }>
                        { post.id }
                    </Text>
                </View>
                
                <View style={{ height: hp(1)}}></View>

                <View style={ postStyles.titleView}>
                    <Text style={ postStyles.postTitleTxt }>
                        Post Title:
                    </Text>
                    <Text style={postStyles.postTxt}>
                        { post.title }
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{height:hp(2)}}></View>
        </View>
    );
}

const postStyles = StyleSheet.create({
    postView: {
        backgroundColor: "#CFF6FF",
        width: wp(90),
        borderRadius: 10,
        borderColor: "#00BCE3",
        borderWidth: 1,
        paddingVertical: hp(1),
    },
    postTitleTxt: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#06038D',
        paddingHorizontal: wp(4),
    },
    postTxt: {
        color: "#53565B",
        paddingHorizontal: wp(4),
    },
    idView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: "flex-start",
    },
    titleView: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: "flex-start",
    }
})

export default Post;