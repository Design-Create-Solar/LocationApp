import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import axios from 'axios'

async function getCapacity(name, address){
    let result = await axios ({ //for LIVE DATA
        method: 'post',
        url:'https://besttime.app/api/v1/forecasts/live?',
        params: {
          api_key_private:'pri_a02d3d2435574495bf1003d6ba88491f',
          venue_name: name,
          venue_address: address,
        }
    }).then(res => {
        console.log(res)
        if (res.data.status != 'Error') {
          console.log(res.data.analysis.venue_live_busyness); //can be deleted after
          return(Number(res.data.analysis.venue_live_busyness));
        }
    });
  
    var dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];//further abbreviated to alleviate misconceptions of Json spellings
    //console.log(dayNames.indexOf('Mo'));
    result = await axios ({ //for FORECASTS
      method: 'post',
      url:'https://besttime.app/api/v1/forecasts?', 
      params: {
        api_key_private:'pri_a02d3d2435574495bf1003d6ba88491f',
        venue_name: name,
        venue_address: address,
      }
    }).then(res => {
      console.log(res)
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
        return(String(res.data.analysis[dayNum].hour_analysis[trueHour]));
      }
      else {
        return(Number(-1));
      }
    });
  
    
  }
//maybe add the word async before item? don't quite know
const CustomMarker = ({item}) => {
    //getCapacity(item.fullname, "yes")
    //item.capacity = await getCapacity(item.fullname, "yes");
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