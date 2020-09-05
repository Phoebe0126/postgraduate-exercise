<template>
  <view>
      <mp-tabs 
        tabs="{{tabs}}" 
        activeTab="{{activeTab}}" 
        swiperClass="weui-tabs-swiper"
        @click="onTabClick"
        change="onChange"
        activeClass="tab-bar-title__selected"
  >
    <block wx:for="{{tabs}}" wx:key="title">
      <view class="tab-content" data-set="{{item}}" slot="tab-content-{{index}}" bind:tap="handleClick" >
        <image src="{{item.img}}" mode="widthFix"></image>
        <view class="item-title">
          {{item.title2}}
        </view>
        <view class="item-desc">
          {{item.desc}}
        </view>
      </view>
    </block>
  </mp-tabs>
  </view>
</template>

<script>
export default {

}
</script>

<style>

</style>