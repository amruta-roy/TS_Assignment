import React, {FC} from 'react';
import { 
    Text, 
    View, 
    Image
} from 'react-native';
import styles from './styles';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

// import PostImage from "../../src/Assets/PostImage.jpg";
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackNavigator } from '../../App';

type postDetailsRoute = RouteProp<HomeStackNavigator,"PostDetails">


// 'DisplayFields' component is to display individual fields of the record.
//  It takes fieldName and fieldValue as props
//  -   'fieldName' contains the name of the field to be displayed e.g. 'Age','Gender' etc..
//  -   'fieldValue' contains the value to be displayed for the particular field e.g. '27' for 'Age' , "male" for 'gender' etc..
const DisplayFields = (props:({fieldName: string; fieldValue: number|string})):JSX.Element => {
    return(
        <View style={{ flexDirection:'row' , justifyContent:'flex-start', width: wp(65) }}>
            <Text>
                {props.fieldName}:
            </Text>
            <Text>
                {props.fieldValue}
            </Text>
        </View>
    )
}

const PostDetails : FC = () => {
    type postType = {
        userId: number;
        id: number;
        title: string;
        body: string;
    }

    const {params: {post}} = useRoute<postDetailsRoute>();
    //const post:postType = params.post;

    // console.log("Post Data :",post);
    
    return (
        <>
            <View style={{ flex: 1 , backgroundColor: 'lightgrey' , alignItems: 'center' , justifyContent: 'center' }}>
            <View style={{ height: hp(50) , width: wp(85), flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FFF' , borderRadius: 5 , elevation: 5}}>
                {/*  Display the Profile Picture of the record */}
                {/* <Image 
                    style={ styles.profileScreenImageView } 
                    source={PostImage}
                    // source={{uri: "https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-2-1200.jpg"}}
                /> */}
                
                {/*  Display "Age" , "Gender", "Company" , "Email Id" and "Phone" of the record */}
                <View style={{ width: wp(70), height: hp(20), flexDirection: 'column' , alignItems:'flex-start', justifyContent:'flex-start', marginTop: hp(4), borderWidth:0 }}>
                    <DisplayFields fieldName={"Id"} fieldValue={ post ? post.id : 0}/>
                    <DisplayFields fieldName={"Title"} fieldValue={ post ? post.title : ''}/>
                    <DisplayFields fieldName={"Description"} fieldValue={ post ? post.body : ''}/>
                </View>
            </View>
        </View>
        </>
    );
}

export default PostDetails;