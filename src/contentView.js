//
//  Created by Eason Lin on 2018/09/28.
//  Copyright © 2016年 EJStudio. All rights reserved.
//

import React, { Component } from 'react';

import {
  Image,
  Text,
  View,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';

var {TouchableWithoutFeedback, TouchableNativeFeedback} = require('react-native');

if (Platform.OS === 'android') {
  var ButtonTouch = TouchableNativeFeedback;
} else {
  var ButtonTouch = TouchableWithoutFeedback;
}

const { width, height } = Dimensions.get('window')

const itemWidth = (315/375)*width;
const itemHeight = (180/375)*width;

let beginDragX = 0;
let index = 0;

class ContentView extends React.Component {

  static defaultProps = {
    contentList:[],
  };

  constructor (props) {
    super(props);

    (this: any)._renderItem =       this._renderItem.bind(this);
  }

  render() {
    if (this.props.scrollableContent == true) {
      return (
        <View>
          <FlatList
            ref="flatListView"
            horizontal = {true}
            showsHorizontalScrollIndicator={false}
            renderItem={this._renderItem}
            data={this.props.contentList}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      );
    } else {
      let content = <View />
      if (this.props.renderContentItem) {
        content = this.props.renderContentItem(this.props.contentList);
      }
      return (
        <View>{
          content
        }</View>
      )
    }

  }

  _renderItem(info) {
    let item = info.item;
    let content = <View />
    if (this.props.renderContentItem) {
      content = this.props.renderContentItem(info, this.props.parentIndex);
    }
    return (
      <View>{
        content
      }</View>
    )
  }

}

module.exports = ContentView;
