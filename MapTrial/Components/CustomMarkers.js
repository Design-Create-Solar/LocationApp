import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import axios from 'axios'

async function getCapacity(name){
    let result = await axios ({
      method: 'get',
      url: "http://designcreatesolar.com/api/locations/get/" + name, 
    }).then(res => { 
        res = res.data;
        if (res.length < 1) {
            return -1;
        }
        
        if (!res[0]) {
            return -1;
        }
        res = res[0];

        if (res.data.status != 'error' && res.data.status != 'Error') {

            let date = new Date();
            let day = date.getDay() + 1;
            if (day > 6) {
                day = 0;
            }
            let hour = date.getHours();
            return(res.data.analysis[day].hour_analysis[hour].intensity_txt);
        }
        else {
            return(Number(-1));
        }
    }); return(result)
}

const CustomMarker = ({item}) => {
    const [capacity,setCapacity] = React.useState(item.capacity) //necessary since rerendering only happens when there is a change of state
    getCapacity(item.fullname).then(res => {item.capacity = res; setCapacity(res)}); 
    item.capacity = capacity;


    if (item.capacity == -1 || item.capacity == 'Closed')
    {item.capacityQuant = 10000000;}
    else if (item.capacity == 'High')
    {item.capacityQuant = 100;}
    else if (item.capacity == 'Above average')
    {item.capacityQuant = 80;}
    else if (item.capacity == 'Average')
    {item.capacityQuant = 60;}
    else if (item.capacity == 'Below average')
    {item.capacityQuant = 40;}
    else if (item.capacity == 'Low')
    {item.capacityQuant = 20;}
    
    return (
        <View>
            <View style = {styles.roundMarker}>
            <Image style = {styles.roundImage} source = {{uri: item.markerImage}}/>
            
            </View>
            {item.capacity == -1 &&
            <Text style = {styles.capacityTextFull}>{'Unav.'}</Text> 
            }
            {item.capacity == 'Closed' &&
            <Text style = {styles.capacityTextFull}>{item.capacity}</Text>
            }
            {item.capacity == 'High' &&
            <Text style = {styles.capacityTextFull}>{'Bad'}</Text>
            }
            {item.capacity == 'Above average' &&
            <Text style = {styles.capacityTextMedium}>{'Avg.'}</Text>
            }
            {item.capacity == 'Average' &&
            <Text style = {styles.capacityTextMedium}>{'Fair'}</Text> 
            }
            {item.capacity == 'Below average' &&
            <Text style = {styles.capacityTextEmpty}>{'Good'}</Text> 
            }
            {item.capacity == 'Low' &&
            <Text style = {styles.capacityTextEmpty}>{'Empty'}</Text> 
            }
        </View>
    );
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
        backgroundColor:'white',
        color: 'red'
    },
    capacityTextMedium:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor:'white',
        color: '#e6ac00'
    },
    capacityTextEmpty:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor:'white',
        color: '#1E90FF'
    },
})

export default CustomMarker