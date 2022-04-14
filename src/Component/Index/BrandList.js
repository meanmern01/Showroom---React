import React, {useRef, useEffect, useState} from "react";
import gsap from "gsap";
import {MotionPathPlugin} from "gsap/MotionPathPlugin.js";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Backbutton from "../button/Backbutton";
import "./BrandList.scss";

function BrandList({isDsPage}) {
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
    const section = useRef();
    const array = [
        {brand: "AMOEBA", image: "1.jpg"},
        {brand: "CARMELOA", image: "2.jpg"},
        {brand: "MEN'S WEAR", image: "3.jpg"},
        {brand: "RECTO MAN", image: "4.jpg"},

        {brand: "DAMIAN", image: "5.jpg"},
        {brand: "KEANU REEVES", image: "6.jpg"},
        {brand: "ALAKIIR DENG", image: "7.jpg"},
        {brand: "BEARS BY B", image: "8.jpg"},
        {brand: "AMOEBA1", image: "1.jpg"},
        {brand: "CARMELOA1", image: "2.jpg"},
        {brand: "MEN'S WEAR1", image: "3.jpg"},
        {brand: "RECTO MAN1", image: "4.jpg"},

        {brand: "DAMIAN1", image: "5.jpg"},
        {brand: "KEANU REEVES1", image: "6.jpg"},
        {brand: "ALAKIIR DENG1", image: "7.jpg"},
        {brand: "BEARS BY B1", image: "8.jpg"},
        {brand: "AMOEBA2", image: "1.jpg"},
        {brand: "CARMELOA2", image: "2.jpg"},
        {brand: "MEN'S WEAR2", image: "3.jpg"},
        {brand: "RECTO MAN2", image: "4.jpg"},

        {brand: "DAMIAN2", image: "5.jpg"},
        {brand: "KEANU REEVES2", image: "6.jpg"},
        {brand: "ALAKIIR DENG2", image: "7.jpg"},
        {brand: "BEARS BY B2", image: "8.jpg"},
    ];
    useEffect(() => {
        const element = section.current;
        const brands = gsap.utils.toArray(element.querySelectorAll(".brands"));
        const num = brands.length;
        const image = element.querySelectorAll(".img");
        const items = element.querySelectorAll(".brandName");

        MotionPathPlugin.convertToPath(element.querySelector("#path"));
        brands.forEach((div, i) => {
            gsap.timeline().to(div, {
                motionPath: {
                    path: element.querySelector("#path"),
                    align: element.querySelector("#path"),
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                    end: i * (1 / num),
                },
                duration: 0.5,
                stagger: 1,
            });
        });

        let proxy = {skew: 0},
            skewSetter = gsap.quickSetter(
                element.querySelectorAll(".brands"),
                "skewX",
                "deg"
            ),
            clamp = gsap.utils.clamp(-30, 30);

        gsap.timeline({
            scrollTrigger: {
                trigger: section.current,
                pin: true,
                scrub: 0.4,
                start: "top top",
                end: "+=5000",
                onUpdate: (self) => {
                    let skew = clamp(self.getVelocity() / -600);

                    if (Math.abs(skew) > Math.abs(proxy.skew)) {
                        proxy.skew = skew;
                        gsap.to(proxy, {
                            skew: 0,
                            duration: 1,
                            ease: "power3",
                            overwrite: true,
                            onUpdate: () => skewSetter(proxy.skew),
                        });
                    }
                },
            },
        }).to(element.querySelector("#wrap"), {
            rotation: 360,
            transformOrigin: "center",
            duration: 1.5,
            ease: "none",
        });

        let moveImg = () => {
            items.forEach((e1) => {
                image.forEach((img) => {
                    if (img.id == e1.id) {
                        e1.addEventListener("mouseenter", (e) => {
                            e1.style.color = isDsPage ? "black" : "white";
                            e1.style.textShadow = isDsPage
                                ? "2px 0 0 white, -2px 0 0 white, 0 2px 0 white, 0 -2px 0 white, 1px 1px white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white"
                                : "2px 0 0 black, -2px 0 0 black, 0 2px 0 black, 0 -2px 0 black, 1px 1px black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black";
                            gsap.to(img, {
                                autoAlpha: 1,
                                startAt: {
                                    x: e.offsetX,
                                    y:
                                        e.screenY > 200
                                            ? e.screenY > 500
                                                ? e.screenY - 400
                                                : -100
                                            : -(e.screenY + 75),
                                },
                                x: 400,
                                duration: 1,
                            });
                        });
                        e1.addEventListener("mouseleave", (e) => {
                            e1.style.color = isDsPage ? "white" : "black";
                            e1.style.textShadow = "none";
                            gsap.to(img, {
                                autoAlpha: 0,
                                x: 800,
                                duration: 2,
                            });
                        });
                        return;
                    }
                });
            });
        };

        gsap.timeline({
            scrollTrigger: {
                trigger: section.current,
                pin: true,
                scrub: 0.4,
                start: "top top",
                end: "+=5000",
            },
        }).to(element.querySelector(".Images"), {
            ease: "slow",
            onStart: moveImg(),
        });
    }, []);

    return (
        <div
            style={{
                background: isDsPage ? "black" : "white",
            }}
        >
            <section ref={section} className="container">
                <section className="Images">
                    {array.map((val, index) => (
                        <img
                            src={`Images/BrandMainBanner/${val.image}`}
                            className="img"
                            id={`${val.brand
                                .replace(/ /g, "") //REMOVE WHITE SPACE
                                .replace(/['"]+/g, "")}`} ///REMOVE '' AND ""
                        />
                    ))}
                </section>
                <div>
                    <Backbutton isDsPage={isDsPage} />
                </div>
                <div id="wrap">
                    <svg viewBox="0 0 200 200">
                        <circle id="path" r="200" />
                    </svg>
                    {array.map((val, index) => (
                        <div className="brands">
                            <div className="brandsText" key={index}>
                                <a
                                    href={
                                        isDsPage
                                            ? `/showroom?brandName=${val.brand}`
                                            : "#"
                                    }
                                    className="brandName"
                                    id={`${val.brand
                                        .replace(/ /g, "")
                                        .replace(/['"]+/g, "")}`}
                                    style={{
                                        color: isDsPage ? "white" : "black",
                                    }}
                                >
                                    {val.brand}
                                    <span className="brandsIndex">
                                        {" "}
                                        0{index}{" "}
                                    </span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default BrandList;
