# LandscapeScroll

>This component include all you need when you have to use landscape swipe with dynamic update contents.
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
    
 
 Properties:
 
 <table>
    <thead>
        <tr>
            <th>Prop</td>
            <th>Required</td>
            <th>Type</td>
            <th>Description</td>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>itemList</td>
        <td align="center">YES</td>
        <td align="center">array</td>
        <td align="left">Main object component with list (just like ListView)</td>
    </tr>
    <tr>
        <td>itemStyle</td>
        <td align="center">NO</td>
        <td align="center">obj</td>
        <td align="left">Main component style</td>
    </tr>
    <tr>
        <td>renderLandscapeItem</td>
        <td align="center">YES</td>
        <td align="center">func</td>
        <td align="left">Return a customerized main-component that you want to render on the screen with one parameter (info).</td>
    </tr>
    <tr>
        <td>updateContentItem</td>
        <td align="center">NO</td>
        <td align="center">func</td>
        <td align="left">Return an array that you want to reneder on sub-component with two parameters (index, previousIndex).</td>
    </tr>
    <tr>
        <td>renderContentItem</td>
        <td align="center">NO</td>
        <td align="center">func</td>
        <td align="left">Return a customerized sub-component that you want to render on the screen with two parameters (info, parentIndex).</td>
    </tr>
    <tr>
        <td>scrollableContent</td>
        <td align="center">NO</td>
        <td align="center">bool</td>
        <td align="left">When false, the sub-component cannot be scrolled. Default is true.</td>
    </tr>
    <tr>
        <td>topContent</td>
        <td align="center">NO</td>
        <td align="center">bool</td>
        <td align="left">When true, the sub-component will be rendered on the top of the main component. Defalut is false</td>
    </tr>
    </tbody>
</table>


Example:

![demo gif](https://github.com/EasonLex/LandscapeScroll/blob/master/DEMO.gif)
