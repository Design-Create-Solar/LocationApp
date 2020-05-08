import React from 'react'
import {View, StyleSheet, Image} from 'react-native'

const CustomMarker = ({item}) => {
    return (
        <View style = {styles.roundMarker}>
            <Image style = {styles.roundImage} source = {{uri: item.markerImage}}/>
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
    }
})

export default CustomMarker