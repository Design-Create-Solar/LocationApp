const locations = 
[
    {
        title: 'Covel', latitude: 34.072960,
        longitude: -118.450047,
        fullname: 'Covel Residential Restaurant',
        address: 'Covel Steps, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://dailybruin.com/images/2020/01/web.ns_.covel_.TS_.jpg",
        menu: "http://menu.dining.ucla.edu/Menus/Covel",
        weight:13
    },
    
    {
        title: 'BPlate', latitude: 34.071923,
        longitude: -118.449958,
        fullname: 'Bruin Plate Residential Restaurant',
        address: '350 Charles E Young Drive West, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://www.food-management.com/sites/food-management.com/files/styles/article_featured_retina/public/uploads/2014/08/best-new-facilitypromo.jpg?itok=i2V8M7IP",
        menu: "http://menu.dining.ucla.edu/Menus/BruinPlate",
        weight:13
    },

    {
        title: 'BCafe', latitude: 34.0725,
        longitude: -118.450333,
        fullname: 'Bruin Cafe',
        address: '350 De Neve Dr, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://dailybruin.com/images/2017/02/web.ns_.bcaf_.file_.jpg",
        website: "http://menu.dining.ucla.edu/Menus/BruinCafe",
        weight:13
    },

    {
        title: 'De Neve', latitude: 34.0703,
        longitude: -118.450164,
        fullname: 'De Neve Commons Residential Restaurant',
        address: '351 Charles E Young Drive West, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://healthycampusinitiative.files.wordpress.com/2017/05/image3.jpeg",
        website: "http://menu.dining.ucla.edu/Menus/DeNeve",
        weight:13
    },

    {
        title: 'Feast', latitude: 34.0716,
        longitude: -118.451393,
        fullname: 'FEAST at Rieber',
        address: '310 De Neve Dr, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://portal.housing.ucla.edu/sites/g/files/yaccgq796/f/resize/remote/18a6636c23e58b8a9a699b655ff6e868-800x524.jpg?itok=Q2Qp-YKq",
        website: "http://menu.dining.ucla.edu/Menus/FeastAtRieber",
        weight:13
    },

    {
        title: '1919', latitude: 34.072588,
        longitude: -118.450847,
        fullname: 'Café 1919',
        address: '330 De Neve Dr, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://dailybruin.com/images/2013/09/875affa9-8cc8-484d-89ea-adac933cb14e.jpg",
        website: "http://menu.dining.ucla.edu/Menus/Cafe1919",
        weight:13
    },
    
    {
        title: 'Rendez', latitude: 34.0725,
        longitude: -118.451737,
        fullname: 'Rendezvous',
        address: '330 De Neve Dr, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://cdn.usarestaurants.info/assets/uploads/99b3d00c1c9de792d13244a48fc97d20_-united-states-california-los-angeles-county-los-angeles-648364-rendezvoushtm.jpg",
        website: "http://menu.dining.ucla.edu/Menus/Rendezvous",
        weight:13
    },

    {
        title: 'Study', latitude: 34.07326, //remember that this is a duplicate, use the same one in MongoDB
        longitude: -118.452333,
        fullname: 'The Study at Hedrick',
        address: '250 De Neve Dr, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://dailybruin.com/images/2017/01/web.ae_.studyhedrickfood.review.PicA_.AD_.jpg",
        website: "http://menu.dining.ucla.edu/Menus/HedrickStudy",
        weight:13
    },

    {
        title: 'N.C. Center', latitude: 34.074400,
        longitude: -118.442051,
        fullname: 'North Campus Student Center',
        address: 'Los Angeles, CA 90095',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://asucla.ucla.edu/where-to-eat/#1457972215468-a89ef06e-68d9", //opens the tab dedicated to N.C. Center
        website: "https://asucla.ucla.edu/where-to-eat/",
        weight:13
    },

    {
        title: 'Unt. Café', latitude: 34.075950,
        longitude: -118.440831,
        fullname: 'Untitled Cafe at Broad Art Center',
        address: '240 Charles E Young Dr N, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://mojo.dailybruin.com/wp-content/uploads/2012/01/IMG_0522.jpg",
        website: "https://www.yelp.com/biz/untitled-broad-arts-caf%C3%A9-los-angeles",
        weight:13
    },

    {
        title: 'N. Lights', latitude: 34.074420,
        longitude: -118.442352,
        fullname: 'Northern Lights Cafe',
        address: 'Royce Dr, Los Angeles, CA 90095',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://maps.ucla.edu/photos/locations/large/L83991_201203151334.jpg",
        website: "https://www.yelp.com/biz/northern-lights-cafe-los-angeles",
        weight:13
    },

    {
        title: 'Café 451', latitude: 34.075006, 
        longitude: -118.441186,
        fullname: 'Cafe 451',
        address: 'Charles E. Young Research Library, 280 Charles E Young Dr E, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://dailybruin.com/images/43606_web.news.9.18.regissue.yrlcafeo.jpg",
        website: "https://www.yelp.com/biz/caf%C3%A9-451-los-angeles-2",
        weight:13
    },

    {
        title: 'Lu Valle', latitude: 34.073624,
        longitude: -118.439237,
        fullname: 'Lu Valle Commons',
        address: 'Lu Valle Commons, 398 Portola Plaza, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://i.pinimg.com/originals/b7/e8/7b/b7e87b62b2f5de325aab0d72916294fa.jpg",
        website: "https://asucla.ucla.edu/where-to-eat/#1457973050769-0d011763-5c87",
        weight:13
    },
    //ACKERMAN, SYNTHETIC COORDINATES TO MAKE VIEWING EASIER

    // {
    //     title: 'Gr.House', latitude: 34.070387, 
    //     longitude: -118.444222,
    //     fullname: 'Greenhouse',
    //     address: 'Ackerman, AU-1390B, 308 Westwood Plaza, Los Angeles',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://s3-media0.fl.yelpcdn.com/bphoto/7Fo-Kl_0drun6X1NSArOGw/348s.jpg",
    //     website: "https://www.yelp.com/biz/the-greenhouse-los-angeles",
    //     weight:13
    // },

    // {
    //     title: 'Wetzel\'s', latitude: 34.07043, //synthetic
    //     longitude: -118.444190,
    //     fullname: 'Wetzel\'s Pretzels',
    //     address: '308 Westwood Plaza, AU 1390B, Los Angeles, CA 90024',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://media-cdn.tripadvisor.com/media/photo-s/11/dd/72/f6/pic.jpg",
    //     website: "https://www.wetzels.com/",
    //     weight:13
    // },

    {
        title: 'Rubio\'s', latitude: 34.070377, 
        longitude: -118.444000,
        fullname: 'Rubio\'s',
        address: 'Treehouse Food Court, 308 Westwood Plaza 1st floor, Los Angeles, CA 90024',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://wolfpackboosters.com/wp-content/uploads/2017/02/Rubios.jpg",
        website: "https://www.rubios.com/#block-bean-our-menu",
        weight:13
    },

    // {
    //     title: 'Wolfgang', latitude: 34.07034, //synthetic 
    //     longitude: -118.444206,
    //     fullname: 'Wolfgang Puck Express',
    //     address: 'Ackerman Union, 308 Westwood Plaza level 1, Los Angeles',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://dailybruin.com/images/2013/09/ef3af866-17e2-4b40-a51c-09110f2c5931.jpg",
    //     website: "https://wolfgangpuck.com/dining/wolfgang-puck-express-los-angeles/",
    //     weight:13
    // },

    {
        title: 'Panda', latitude: 34.070481, 
        longitude: -118.444025,
        fullname: 'Panda Express',
        address: '308 Westwood Plaza, Los Angeles, CA',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://maps.ucla.edu/photos/locations/large/L83773_201203151334.jpg",
        website: "https://www.pandaexpress.com/menu",
        weight:13
    },

    // {
    //     title: 'Sweetspot', latitude: 34.070381, //synthetic
    //     longitude: -118.44426, 
    //     fullname: 'Sweetspot',
    //     address: '308 Westwood Plaza, Ackerman Level 1, AU-1390B, Los Angeles',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://s3-media0.fl.yelpcdn.com/bphoto/an86vECSTWN-aHSqi66mlQ/300s.jpg",
    //     website: "https://www.yelp.com/biz/sweetspot-los-angeles",
    //     weight:13
    // },

    // {
    //     title: 'Lollicup', latitude: 34.070419, 
    //     longitude: -118.444144,
    //     fullname: 'Lollicup Fresh',
    //     address: 'Ackerman Union, Westwood Plaza, Los Angeles, CA 90095',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://img.grouponcdn.com/deal/2Fd1WKu43Nj7FFiZAC4PjmYvtXEa/2F-2048x1227/v1/c700x420.jpg",
    //     website: "https://www.lollicupfresh.com/menu",
    //     weight:13
    // },

    // {
    //     title: 'Veggie', latitude: 34.070424, //synthetic
    //     longitude: -118.4441,
    //     fullname: 'Veggie Grill',
    //     address: '308 Westwood Plaza Ackerman Student Union, Level 1, Los Angeles',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://d3vhp0ldxntuok.cloudfront.net/image/1089/b10/0.5,0.5/small",
    //     website: "https://www.veggiegrill.com/menu.html",
    //     weight:13
    // },

    {
        title: 'Taco Bell', latitude: 34.070385, 
        longitude: -118.44418,
        fullname: 'Taco Bell',
        address: 'Ackerman A, 308 Westwood Plaza #245c, Los Angeles, CA 90095',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://www.tacobell.com/medias/taco-bell-2020-DLT-02.jpg?context=bWFzdGVyfGltYWdlc3wxMjI0NjV8aW1hZ2UvanBlZ3xpbWFnZXMvaDA2L2hmNi84OTcwMjM0NTI3Nzc0LmpwZ3xmNTBkMDc3NTY3ZWU4NjAxYzk2ZDgxY2Y4YTBjZGRhZDg2ODYxMjNjYzZmZmM1ODk2Y2MxMTE3ZDMxMWNjODkw",
        website: "https://www.tacobell.com/food",
        weight:13
    },

 //finish from Bruin Buzz
    // {
    //     title: 'B. Buzz', latitude: 34.07044, //synthetic
    //     longitude: -118.44424,
    //     fullname: 'Bruin Buzz',
    //     address: 'Bruin Buzz, 308 Westwood Plaza, Ackerman A-Level, Los Angeles',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://dailybruin.com/images/44852_web.ns.11.8.nightpeople.picco.jpg",
    //     website: "https://www.yelp.com/biz/bruin-buzz-los-angeles",
    //     weight:13
    // },

    // {
    //     title: 'Curbside', latitude: 34.07033,  //synthetic
    //     longitude: -118.444245,
    //     fullname: 'Curbside',
    //     address: 'Curbside, 308 Westwood Plaza, Ackerman A-Level, Los Angeles',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://s3-media0.fl.yelpcdn.com/bphoto/2TqepNGy06qQyWKSy_BjFA/348s.jpg",
    //     website: "https://www.yelp.com/biz/curbside-los-angeles",
    //     weight:13
    // },
    

    // {
    //     title: 'Kikka', latitude: 34.0704,   //synthetic
    //     longitude: -118.4443,
    //     fullname: 'Kikka-Sushi',
    //     address: 'Ackerman A, 308 Westwood Plaza #233b, Los Angeles',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://s3-media0.fl.yelpcdn.com/bphoto/41ZRTDXRYhvDs17ezIxWvA/348s.jpg",
    //     website: "https://www.yelp.com/biz/kikka-los-angeles",
    //     weight:13
    // },

    {
        title: 'Carl\'s Jr.', latitude: 34.07047,    //synthetic
        longitude: -118.444144,
        fullname: 'Carl\'s Jr.',
        address: '308 Westwood Plaza, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://media.graytvinc.com/images/810*464/CARLS+JR+BURGER.jpg",
        website: "https://www.carlsjr.com/menu",
        weight:13
    },

    // {
    //     title: 'Jamba', latitude: 34.070634,     //synthetic
    //     longitude: -118.444308,
    //     fullname: 'Jamba UCLA',
    //     address: '308 Westwood Plaza A260, Los Angeles',
    //     capacity: -1,
    //     capacityQuant: -1,
    //     markerImage: "https://img.grouponcdn.com/deal/3qVF4YZD32qb6GgDzP9dQSMWs1EC/3q-1006x604/v1/c700x420.jpg",
    //     website: "https://www.jamba.com/menu",
    //     weight:13
    // },

    {
        title: 'Kerck.', latitude: 34.070592,     
        longitude: -118.443414,
        fullname: 'Kerckhoff Coffee House',
        address: '308 Westwood Plaza #2, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://s3-media0.fl.yelpcdn.com/bphoto/ZJCaa_NN7J41Zzvvw8ODgQ/o.jpg",
        website: "https://www.yelp.com/biz/kerckhoff-coffee-house-los-angeles",
        weight:13
    },
    
    //MUSIC CAFE

    {
        title: 'Music Ca.', latitude: 34.070274,      
        longitude: -118.440374,
        fullname: 'Evelyn & Mo Ostin Music Café',
        address: '460 Portola Plaza, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://2.bp.blogspot.com/-nmlFDmG0f_c/VVWMmm3eR-I/AAAAAAAAEYA/ZdFaIdz9zwM/s1600/STSS%2BSpring%2BAdventure%2B2015-%2BUCLA%2BMusic%2BCenter%2BCafe.jpg",
        website: "https://www.yelp.com/biz/evelyn-and-mo-ostin-music-caf%C3%A9-los-angeles",
        weight:13
    },

    {
        title: 'Synapse', latitude: 34.067338,      
        longitude: -118.444716,
        fullname: 'Cafe Synapse',
        address: 'Charles E Young Dr S, Los Angeles, CA',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://fastly.4sqi.net/img/general/600x600/54658772_NOr23y8uNnRSruQ1hBDTLQ5pqzX2Aet8aGnWZDmdhqA.jpg",
        website: "https://www.yelp.com/biz/caf%C3%A9-synapse-los-angeles-2",
        weight:13
    },

    {
        title: 'Blaze', latitude: 34.068135,      
        longitude: -118.442133,
        fullname: 'Blaze Pizza',
        address: '617 Charles E Young Dr N E, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://www.pasadenastarnews.com/wp-content/uploads/2019/01/PAS-L-BLAZE-0117-2-1.jpg",
        website: "https://hq.blazepizza.com/menu/",
        weight:13
    },

    {
        title: 'Fusion', latitude: 34.068191,       
        longitude: -118.442111,
        fullname: 'Fusion',
        address: '617 Charles E Young Dr E, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://dailybruin.com/images/47646_web.ae.3.7.scsc.preview.picao.jpg",
        website: "https://www.yelp.com/biz/fusion-los-angeles",
        weight:13
    },

    {
        title: 'S. Lights', latitude: 34.068339,        
        longitude: -118.442367,
        fullname: 'Southern Lights',
        address: '617 Charles E Young Dr E, Los Angeles',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://s3-media0.fl.yelpcdn.com/bphoto/w21-X929mcLzLRIrIPxKbg/348s.jpg",
        website: "https://www.yelp.com/biz/southern-lights-los-angeles",
        weight:13
    },

    {
        title: 'Subway', latitude: 34.068275,        
        longitude: -118.442247,
        fullname: 'Subway',
        address: '617 Charles Young Drive East Court of Sciences Student Cntr',
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/news-image/subway-partners-feeding-america-world-sandwich-day_0.jpg?itok=fPw59XRy",
        website: "https://www.subway.com/en-US/MenuNutrition/Menu",
        weight:13
    },

    {
        title: 'Yoshinoya', latitude: 34.0683,         
        longitude: -118.442109,
        fullname: 'Yoshinoya',
        address: '617 Charles E Young Dr E, Los Angeles', //synthetic
        capacity: -1,
        capacityQuant: -1,
        markerImage: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ilXTu7bUFcU0/v0/1000x-1.jpg",
        website: "https://www.yoshinoyaamerica.com/our-menu",
        weight:13
    },
]
module.exports = locations;