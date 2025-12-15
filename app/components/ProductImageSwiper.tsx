"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

const ProductImageSwiper = ({ images }: { images: any[] }) => {
    console.log(images);
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation={true}
            pagination={{ clickable: true }}
            loop={true}
            className="mySwiper rounded-md bg-white"
        >
            {images?.map((image: any) => (
                <SwiperSlide className="m-auto">
                        <Image
                        src={image.asset.url}
                        alt={image.asset.url}
                        width={500}
                        height={500}
                        className="w-auto m-auto max-h-100"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
export default ProductImageSwiper;