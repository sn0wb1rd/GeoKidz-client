# **GeoKidz**

[Click here to see deployed app](https://geokidz.herokuapp.com/)

## **Abstract**
GeoKidz is a social outdoor game where kids can create and search for treasures by learning how to find their way with a digital map.
When the treasure is found you can gain rewards and optionally find a new hideout nearby.

## **Description**
GeoKidz is the last project of our bootcamp at Ironhack.

After three months of intense work, we had one week and a half to realized a full-stack application, fully responsive, in React. As a geodata specialist, Cindy suggested using geolocalisation for our project. GeoKidz was born !

We created a game for kids that allows us to use several technologies, including React, MongoDB, an API with NodeJs, and ExpressJs. With GeoKids, the user can visualize the treasures around him, which are painted stones, and collect them in order to earn points. He can also create his own painted stone, and place it on our map. Developing this game and working together has been a great and learningfull experience and we hope that you will feel all the pleasure we had working on it !
Cindy Teeven and Alexandra Westendorp

Follow these links to find more information about the code of the server and the client side.
Or feel free to visit our LinkedIn page:
[Alexandra Westendorp](https://www.linkedin.com/in/alexandra-westendorp/)
[Cindy Teeven](https://www.linkedin.com/in/cindytvn/)

## **MVP**
- Signup/login/logout
    - public and private permission
- Create/edit/delete treasure
    - Deleting only by item owner
    - Uploading picture using Cloudinary when creating new item
- Leaflet mapview
    - Layer control
    - Geolocation of user
    - Accesing objects directly in the map
- Profile page
    - including findings
- Protected routes (server- and clientside)

## **Routes**
### /profile
### /mapdetails/:mapitemId
### /map/create
### /map
### /about
### /

## **APIs**
### api/signup
- POST: create new user. Properties needed:
username, password, guide, superpower 
### api/signin 
- POST: sign in with user, based on unique user
Properties needed:
username, password
### api/logout
- POST: Logout user and delete session
### api/user/finding/:userId
- POST: post findings to userprofile. Properties needed:
itemname, owner, lat, long, points
### api//user/details/:userId
- GET: gets specific user data. Properties needed: userId (from url)
### api/mapitems
- GET: Get all the mapitems. No properties needed as input
### api/create
- POST:Create new mapitem. Properties needed:
mapitemId, itemname, image, owner, locdesc, objhistory (is an object)
### api/mapitem/:mapitemId
- GET: Get a specific mapitem
properties needed: mapitem._id
Gets properties:
itemname, image, owner: {username, superpower}, locdesc, objhistory {finder, lat, long}
### /mapitems/:mapitemId
- PACTH: Update a mapitem it’s description and finder (location). 
properties needed: locdesc, finder, lat, long
last object in Objhistory is the currect location.


## **Models**
### Treasure.model
### User.model

## **Components**
- About
- AddMapItem
- ErrorPage
- Home
- LayerControl
- MapDetails
- MyMap
- MyNav
- NextStep
- PopupTreasure
- Profile
- SignUp
- SignIn

## **Backlog**
- Private game
    - User can create own game (point on the map with quests/treasure, time-set games)
    - User/owner of the group can invite other user
- Rating system
    - Rating User: Being a master of traveller or explorer
    - Rating treasure: giving likes for the stone (color), or hiding place, 
- Other categories of treasures besides stones, like picture bases, little challenges, sport-exercise games, chalk on the ground, find a specific spot based on hint/description
- Compare the new location of the treasure with the surroundings. So when you place a treasure close to a big road, it is not allowed. (comparison with geodata from roads).
- Bingo card to fill when you found a treasure. Full bingo: surprise picture of famous cartoon (Frozen)

## **Links**
- [Presentation Link](https://slides.com/cindytvn/deck-6e9b1f)
- [Github repository Link Server side](https://github.com/sn0wb1rd/GeoKidz-server)
- [Github repository Link Client side](https://github.com/sn0wb1rd/GeoKidz-client)
- [Deployment Link](https://geokidz.herokuapp.com/)


