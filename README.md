# LandscapeScroll

This component include all you need when you have to use landscape swipewith dynamic update contents.
Easy separate with views and models with customerized components

Installnation:

$ npm i react-native-landscape-scrollview

Basic usage:

var LandscapeView = require('react-native-landscape-scrollview');

// Define a list that you want to render

let myObjectList = [{'name':'John', 'age':20},
                    {'name':'Mary', 'age':18 ];
                    
return(
    <LandscapeView itemList = {myObjectList}
                   renderLandscapeItem = {this.myComponent}
    />
)

myComponent(info) {
    let item = info.item;
    
    return(
        <View>
          <Text>Name:{item.name}</Text>
          <Text>Name:{item.age}</Text>
        </View>
    )
}
