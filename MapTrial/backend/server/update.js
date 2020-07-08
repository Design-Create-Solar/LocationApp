//for updating the Mongo periodically, use axios
var axios = require("axios");
const locationsStudy = require("../../Components/StudyData.js")
const locationsDining = require("../../Components/DiningData.js")
//CODE FOR UPDATING DCS SERVER
for (let i = 0; i < locationsStudy.length; i++){
    var data = {
        fullname: locationsStudy[i].fullname,
        address: locationsStudy[i].address
    };

    axios.post("http://designcreatesolar.com/api/locations/update", data);
}

for (let i = 0; i < locationsDining.length; i++) {
    var data = {
        fullname: locationsDining[i].fullname,
        address: locationsDining[i].address
    };

    axios.post("http://designcreatesolar.com/api/locations/update", data);
}



//CODE FOR UPDATING MONGO
// var Venue = require("../models/busyness.js")
// var mongoose = require("mongoose");

// var mongoDB = 'mongodb+srv://designcreatesolar:solarclub@cluster0-mcpqp.mongodb.net/venue_busyness?retryWrites=true&w=majority';
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // //var dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];


// var mongoNames = ['Powell', 'Study', 'Young', 'Law', 'Bombs', 'Boelter', 'Sproul', 'Covel', 'BPlate', 'BCafe', 'De Neve', 'Feast', '1919', 'Rendez', 'N.C. Center', 'Unt. Café', 'N. Lights', 'Café 451', 'Lu Valle', 'Rubio\'s', 'Panda', 'Taco Bell', 'Carl\'s Jr.', 'Kerck.', 'Music Ca.', 'Synapse', 'Blaze', 'Fusion', 'S. Lights', 'Subway', 'Yoshinoya']

// var fullNames = [] //names with the %20 http format
// for (let i = 0; i < locationsStudy.length; i++) {
//     let temp = locationsStudy[i].fullname;
//     let finalRes = "";
//     for (let j = 0; j < temp.length; j++) {
//         if (temp[j] == ' ') {
//             finalRes = finalRes + "%20";
//         }
//         else {
//             finalRes = finalRes + temp[j];
//         }
//     }
//     fullNames.push(finalRes);
// }

// for (let i = 0; i < locationsDining.length; i++) {
//     let temp = locationsDining[i].fullname;
//     let finalRes = "";
//     for (let j = 0; j < temp.length; j++) {
//         if (temp[j] == ' ') {
//             finalRes = finalRes + "%20";
//         }
//         else {
//             finalRes = finalRes + temp[j];
//         }
//     }
//     fullNames.push(finalRes);
// }

// for (let i = 0; i < (locationsStudy.length + locationsDining.length); i++){
//     axios.get('http://designcreatesolar.com/api/locations/get/' + fullNames[i])
//         .then(async function (res) {
//             //console.log(res.data[0].fullname)
//             var toReturn = -1;
//             if (res.data.status != 'error' && res.data.status != 'Error') {
//                 var d = new Date();
//                 var dayNum = d.getDay() - 1; //move backward once since days are numbered 0(Monday) on BestTime
//                 var hour = d.getHours() - 6;
//                 console.log(dayNum)
//                 console.log(hour)
//                 if (res.data.length != 0){
//                     toReturn = res.data[0].data.analysis[dayNum].hour_analysis[hour].intensity_txt;
//                 }
//                 console.log(toReturn);
//                 const result = await Venue.updateOne({venue_name: mongoNames[i]}, {$set:{busyness: toReturn}})
//             }
//             else {
//                 toReturn = -1;
//             }
            
//         })
// }

// //CODE FOR POSTING TO DCS WEBSITE FOR THE FIRST TIME

// // for (let i = 0; i < locationsStudy.length; i++){
// //     var data = {
// //         fullname: locationsStudy[i].fullname,
// //         address: locationsStudy[i].address
// //     };

// //     axios.post("http://designcreatesolar.com/api/locations/add", data);
// // }

// // for (let i = 0; i < locationsDining.length; i++) {
// //     var data = {
// //         fullname: locationsDining[i].fullname,
// //         address: locationsDining[i].address
// //     };

// //     axios.post("http://designcreatesolar.com/api/locations/add", data);
// // }


// // let result = await axios ({ //for FORECASTS
// //     method: 'post',
// //     url:'http://designcreatesolar.com/api/locations/add', 
// //     params: {
// //         venue_name: locationsStudy[2].fullname,
// //         venue_address: locationsStudy[2].address,
// //     }
// // })




// // async function dothis()
// // {
// //   for (let i = 0; i < mongoNames.length; i++) {
// //     const res = await Venue.updateOne({venue_name: mongoNames[i]}, {$set:{busyness: ''}})
// //     //console.log(res.n)
// //   }
// //   //DELETING
// //   // const res = await Venue.deleteMany({venue_name: "bro"})
// //   // console.log(res.n)
// // }
// // dothis();