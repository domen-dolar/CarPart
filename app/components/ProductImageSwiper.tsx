"use client"


/*
  Komponenta za prikaz slik izdelka v interaktivnem swiperju.
  - Uporablja knjižnico Swiper.js za navigacijo in paginacijo.
  - Prikazuje vse slike izdelka z možnostjo premikanja (loop, navigation, pagination).
  - Integracija z Next.js Image za optimizirano nalaganje slik.
*/

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper CSS
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

// Props:
// - images: array slik izdelka, vsaka slika ima asset.url
const ProductImageSwiper = ({ images }: { images: any[] }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}  // Omogočimo navigacijo in paginacijo
            navigation={true}                   // Štopalke za premikanje naprej/nazaj
            pagination={{ clickable: true }}    // Klikabilni krogci za paginacijo
            loop={true}                         // Neskončno ponavljanje
            className="mySwiper rounded-md bg-white"
        >
            {images?.map((image: any) => (
                <SwiperSlide className="m-auto">
                        <Image
                        src={image.asset.url}   // URL slike
                        alt={image.asset.url}   // alt atribut
                        width={500}             // fiksna širina
                        height={500}            // fiksna višina
                        className="w-auto m-auto max-h-100" // stilizacija
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
export default ProductImageSwiper;