"use client"
import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { allProducts } from './allProducts';
import { SliderCard } from './SliderCard';
import Link from 'next/link';


const SliderComponent = () => {
  const productsCategory = [
    { type: "iphone", title: "iPhone 精選配件", linkName: 'iPhone 配件' },
    { type: "ipad", title: "iPad 精選配件", linkName: 'iPad 配件' },
    { type: "mac", title: "Mac 精選配件", linkName: 'Mac 配件' },
    { type: "watch", title: "Apple Watch 錶帶", linkName: '錶帶' },
  ];


  const sliderRef = useRef<Slider | null>(null); //用來調用prev, next按鈕

  const handleNext = () => {
    sliderRef.current!.slickNext(); //使用！ 確保 ref 不為 null
  };
  const handlePrev = () => {
    sliderRef.current!.slickPrev(); //使用！ 確保 ref 不為 null
  };


  const settings = {
    dots: true, //顯示slider下方的dot
    infinite: true, //disables infinite loop behavior of the slider
    // slidesToShow: itemsToShow, //一次顯示幾筆資料
    // slidesToScroll: itemsToScroll, //一次滑動滑幾筆資料
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      }
    ]

  };

  return (
    <div id="container" className="w-full">
      {/* <SliderBtn itemsToShow={itemsToShow} handleNext={handleNext} handlePrev={handlePrev} /> */}
      {productsCategory.map(({ type, title, linkName }) => {
        return (
          <>
            <h2 className='text-6xl text-black text-center font-semibold pb-10'>{title}</h2 >
            <Slider {...settings} ref={sliderRef}>

              {allProducts.map((product) => (
                product.category === type ? <SliderCard key={product.id} {...product} /> : null
              ))}

            </Slider>
            <div className="w-full text-center pt-20 pb-40">
              <Link href={`/product/${type}`} className="text-2xl text-[#06c] text-center">選購所有 {linkName} &gt;</Link>
            </div>
          </>
        )
      })}
    </div >
  );
};


export default SliderComponent;