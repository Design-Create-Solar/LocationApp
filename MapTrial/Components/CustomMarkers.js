import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import axios from 'axios'

async function getCapacity(name, address){
    // let result = await axios ({ //for LIVE DATA
    //     method: 'post',
    //     url:'https://besttime.app/api/v1/forecasts/live?',
    //     params: {
    //       api_key_private:'pri_e455ca9355b94b4283568d2d6b3f5545',
    //       venue_name: name,
    //       venue_address: address,
    //     }
    // }).then(res => {
    //     console.log(res)
    //     if (res.data.status != 'Error') {
    //       return(Number(res.data.analysis.venue_live_busyness));
    //       //return(result);
    //     }
    // });//check credit costs
  
    var dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];//further abbreviated to alleviate misconceptions of Json spellings
    //console.log(dayNames.indexOf('Mo'));
    let result = await axios ({ //for FORECASTS
      method: 'post',
      url:'https://besttime.app/api/v1/forecasts?', 
      params: {
        api_key_private:'pri_d6be877c1cdd490fb77b53f67bcfa4df',
        venue_name: name,
        venue_address: address,
      }
    }).then(res => {
      if (res.data.status != 'error' && res.data.status != 'Error') {
        var dateTime = res.headers.date;
        var day;
        var dayNum;
        var hour;
        var dayReverse = 0;
        var iterator = 0;
        while (dateTime.substring(iterator, iterator + 1) != ':') {
          iterator++;
        }
        hour = Number(dateTime.substring(iterator-2, iterator));
        
        hour = hour - 7;
        if (hour < 0) {
          hour = 24 + hour; //accounting for timezone
          dayReverse = 1;
        }
  
        var trueHour; //According to the hour_analysis json
        trueHour = hour - 6;
        if (trueHour < 0) {
          trueHour = 24 + trueHour;
        }
  
        //console.log(hour)
        day = dateTime.substring(0, 2)
        if (dayReverse = 1) {
          dayNum = dayNames.indexOf(day) - 1;
          if (dayNum == -1) {
            dayNum = 6;
          }
        }
        else {
          dayNum = dayNames.indexOf(day)
        }
        //console.log(dayNum)
        //console.log(res.data.analysis[dayNum].hour_analysis[trueHour].intensity_txt)
        //var returnThis = await String(res.data.analysis[dayNum].hour_analysis[trueHour])
        return(res.data.analysis[dayNum].hour_analysis[trueHour].intensity_txt);
      }
      else {
        return(Number(-1));
      }
    }); return(result)
  }
//maybe add the word async before item? don't quite know
const CustomMarker = ({item}) => {
    // const [capacity,setCapacity] = React.useState(item.capacity) //necessary since rerendering only happens when there is a change of state
    // getCapacity(item.fullname, item.address).then(res => {item.capacity = res; setCapacity(res)}); 
    // item.capacity = capacity;

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
            {/* { item.capacity > 70 &&
            <Text style = {styles.capacityTextFull}>{item.capacity}</Text> 
            }

            { item.capacity <= 70 && item.capacity > 40 &&
            <Text style = {styles.capacityTextMedium}>{item.capacity}</Text> 
            }

            { item.capacity <= 40 &&
            <Text style = {styles.capacityTextEmpty}>{item.capacity}</Text> 
            } */}
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