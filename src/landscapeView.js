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
  InteractionManager,
} from 'react-native';

import ContentView  from './contentView';

const { width, height } = Dimensions.get('window')

const itemWidth = (315/375)*width;
const itemHeight = (180/375)*width;

let beginDragX = 0;
// let index = 0;

class LandscapeView extends React.Component {

  static defaultProps = {
    itemStyle: { width:        itemWidth,
                 height:       itemHeight,
                 padding:      (width-itemWidth)/3 },
    itemList: [],
    contentStyle: { width:        itemWidth,
                    height:       itemHeight,
                    padding:      (width-itemWidth)/3 },
    scrollableContent: true,
    topContent: false,
  };

  constructor (props) {
    super(props);

    (this: any)._renderItem       = this._renderItem.bind(this);
    (this: any)._scrollBeginDrag  = this._scrollBeginDrag.bind(this);
    (this: any)._scrollEndDrag    = this._scrollEndDrag.bind(this);

    (this: any).renderContentItem = this.renderContentItem.bind(this);

    this.state = {
      contentList:[],
      index:0,
    };
  }

  componentWillMount() {
    if (this.props.renderContentItem) {
      this.updateContentItem(0);
    }
  }

  componentWillReceiveProps(nextProps) {
    let needUpdate = false;

    if (this.props.renderContentItem) {
      let itemList = this.props.itemList;
      let nextItemList = nextProps.itemList;

      if (itemList.length == 1 &&
          nextItemList.length == 1) {
            needUpdate = true;
      }
    }

    if (needUpdate == true) {
      this.updateContentItem(0);
    }
  }

  render() {
    let contentView = <View ref='ContentView'/>

    if (this.props.renderContentItem) {
      contentView =  <ContentView ref='ContentView'
                                  scrollableContent = { this.props.scrollableContent}
                                  parentIndex = { this.state.index }
                                  contentList= { this.state.contentList }
                                  renderContentItem = { this.renderContentItem }/>
    }

    const scrollEnable = (this.props.itemList.length > 1)?true:false;

    let topContent = <View/>
    let bottomContent = <View/>

    if (this.props.topContent == true) {
      topContent = contentView;
    } else {
      bottomContent = contentView;
    }

    return (
      <View>
        <View>{topContent}</View>
        <FlatList
          ref="flatListView"
          horizontal = {true}
          scrollEnabled={scrollEnable}
          showsHorizontalScrollIndicator={false}
          renderItem={this._renderItem}
          onScrollBeginDrag={this._scrollBeginDrag}
          onScrollEndDrag={this._scrollEndDrag}
          data={this.props.itemList}
          keyExtractor={(item, index) => item + index}
        />
        <View>{bottomContent}</View>
      </View>
    );
  }

  _renderItem(info) {
    let item = info.item;
    let landscapeItem = <View />

    if (this.props.renderLandscapeItem) {
      landscapeItem = this.props.renderLandscapeItem(info);
    }

    let itemStyle = this.props.itemStyle;
    var itemWidth = (this.props.itemStyle.width > width)? width:this.props.itemStyle.width;
    var padding = ((this.props.itemStyle.padding*2 + itemWidth) > width)?((width - itemWidth)/2):this.props.itemStyle.padding;
    padding = (this.props.itemList.length === 1)?((width - itemWidth)/2):padding;

    let marginRight = (this.props.itemList.length === (info.index + 1))? padding: 0;
    let itemContainerStyle = { width:           itemWidth,
                               height:          itemStyle.height,
                               marginLeft:      padding,
                               marginRight:     marginRight };
    return (
      <View style={itemContainerStyle}>{
        landscapeItem
      }</View>
    )
  }

  _scrollBeginDrag(event) {
    beginDragX = event.nativeEvent.contentOffset.x;
  }

  _scrollEndDrag(event) {
    var endDragX = event.nativeEvent.contentOffset.x;
    var dragGap = endDragX - beginDragX;

    if (dragGap !== 0) {
      var itemWidth = (this.props.itemStyle.width > width)? width:this.props.itemStyle.width;
      var padding = ((this.props.itemStyle.padding*2 + itemWidth) > width)?((width - itemWidth)/2):this.props.itemStyle.padding;
      let otherWidth = width - itemWidth - padding*2;
      otherWidth = (otherWidth < 0)?0:otherWidth;

      let index = (' ' + this.state.index).slice(1) ;
      if (dragGap > 0) {
        index++;
      } else {
        index--;
      }
      index = (index < 0)?0:index;
      index = (index === this.props.itemList.length)?(index-1):index;

      let frontGap = ((index+1) == this.props.itemList.length)?otherWidth:(otherWidth/2);
      let finalX = (itemWidth+padding)*index - frontGap;
      finalX = (finalX < 0)? 0:finalX;

      this.refs.flatListView.scrollToOffset({offset: finalX, animated: true});

      if (this.props.updateContentItem) {
        this.updateContentItem(index, this.state.index);
      }
    }
  }

  async updateContentItem(index, previousIndex) {
    if (this.refs.ContentView) {
      let ContentView = this.refs.ContentView;
      let contentListView = ContentView.refs.flatListView;
      if (contentListView) {
        contentListView.scrollToOffset({offset: 0, animated: true});
      }
    }

    let contentList = await this.props.updateContentItem(index, previousIndex);
    await this.promisedSetState({contentList: contentList, index:index});
  }

  promisedSetState = (contentList) => {
      return new Promise((resolve) => {
          this.setState(contentList, () => {
              resolve()
          });
      });
  }

  renderContentItem(info, parentIndex) {
    return this.props.renderContentItem(info, parentIndex);
  }
}

module.exports = LandscapeView;
