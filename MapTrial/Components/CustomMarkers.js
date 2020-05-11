import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
//import axios from 'axios'
//Import axios after
// async function getCapacity(name, address){
//     let result = await axios ({
//         method: 'post',
//         url:'http://', //everything before question mark https website.com?test1=1&test2=2'
//         params: {
//             pi_key:api_key,
//             name: name,
//             address:address,
//         },
//     }).then(res) -> {
//         return res.data;
//     });
//     return result;
// }
//maybe add the word async before item? don't quite know
const CustomMarker = ({item}) => {
    // item.capacity = await getCapacity(item.title);
    //  //make calls here
    return (
        <View>
            <View style = {styles.roundMarker}>
            <Image style = {styles.roundImage} source = {{uri: item.markerImage}}/>
            
            </View>
            { item.capacity > 70 &&
            <Text style = {styles.capacityTextFull}>{item.capacity}</Text> 
            }

            { item.capacity <= 70 && item.capacity > 40 &&
            <Text style = {styles.capacityTextMedium}>{item.capacity}</Text> 
            }

            { item.capacity <= 40 &&
            <Text style = {styles.capacityTextEmpty}>{item.capacity}</Text> 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    roundMarker: {
        overflow: 'hidden',
        height: 50,
        width: 50,
        borderRadius: 40
    },
    roundImage: {
        overflow: 'hidden',
        height: 50,
        width: 50,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: '#ffffff'
    },
    capacityTextFull:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'red'
    },
    capacityTextMedium:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#e6ac00'
    },
    capacityTextEmpty:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#1E90FF'
    },
})

export default CustomMarker