import React, {FC} from 'react';
import { 
    Text, 
    View, 
    Image,
    StyleSheet
} from 'react-native';

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
//  -   'fieldName' contains the name of the field to be displayed 
//  -   'fieldValue' contains the value to be displayed for the particular field 
const DisplayFields = (props:({fieldName: string; fieldValue: number|string})):JSX.Element => {
    return(
        <View style={{ flexDirection:'row' , justifyContent:'flex-start', width: wp(70), paddingVertical: hp(1) }}>
            <Text style={[styles.postTitleTxt, { width: "30%" , justifyContent: 'flex-start'}]}>
                {props.fieldName}:
            </Text>
            <Text style={ [styles.postTxt, { width: "70%"}]}>
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
   
    return (
        <>
            <View style={{ flex: 1 , backgroundColor: '#FFF' , alignItems: 'center' , justifyContent: 'center' }}>
            <View style={{ height: hp(50) , width: wp(85), flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#CFF6FF' , borderRadius: 5 , elevation: 5}}>
                {/*  Display the Profile Picture of the record */}
                {/* <Image 
                    style={ styles.profileScreenImageView } 
                    source={PostImage}
                /> */}
                
                {/*  Display "Id" , "Title", "Body" of the Post */}
                <View style={{ width: wp(70), height: hp(20), flexDirection: 'column' , alignItems:'flex-start', justifyContent:'flex-start', marginTop: hp(4), borderWidth:0 }}>
                    <Text style={[styles.postTitleTxt, {alignSelf: 'center', paddingBottom: hp(2), textTransform:'uppercase', textDecorationLine:'underline'}]}>Post Details</Text>
                    <DisplayFields fieldName={"Id"} fieldValue={ post ? post.id : 0}/>
                    <DisplayFields fieldName={"Title"} fieldValue={ post ? post.title : ''}/>
                    <DisplayFields fieldName={"Body"} fieldValue={ post ? post.body : ''}/>
                </View>
            </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
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
})

export default PostDetails;