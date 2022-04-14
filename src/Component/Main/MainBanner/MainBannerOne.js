import React, {Component, createRef} from "react";
// import { iMovingGalleryItem } from "../../../types/props/CMovingGallery";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./MainBannerOne.scss";
import Parallax from "parallax-js";
import {
    Parallax as SpringParallax,
    ParallaxLayer,
} from "@react-spring/parallax";
import axios from "axios";
import moment from "moment-timezone";
import TopButtons from "../../button/TopButtons";
import BottomButtons from "../../button/BottomButtons";

gsap.registerPlugin(ScrollTrigger);

class MovingGalleryV2 extends Component {
    constructor(props) {
        super(props);
        this.refContainer = React.createRef();
        this._movingGalleryRef = React.createRef();
        this._movingGalleryWrapperRef = React.createRef();
        this._headline = React.createRef();
        this.state = {
            move: true,
            width: 0,
            height: 0,
            sliderWrapperMultiplier: 1,
            // Array of booleans to check if all images finished loading
            dynamicRefs: this._assignDynamicRefs(
                this.props.movingGalleryProps.length
            ),
            toRender: [],
            loading: Array.from(
                {length: this.props.movingGalleryProps.length},
                (i) => (i = false)
            ),
            time_kst: null,
            time_bst: null,
            time_edt: null,
            time_cst: null,
            options: {
                root: null,
                // rootMargin: "100px",
                threshold: 0.6,
            },
            visible: false,
        };
        this.idleTimer = null;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({move: nextProps.move});
    }

    componentDidMount() {
        this.setState({toRender: this._setItemsForRender()});
        if (this.state.loading.every(Boolean)) this._initGallery();
        setTimeout(() => {
            var scene = document.getElementsByClassName("slider");
            if (scene) {
                for (var i = 0, len = scene.length; i < len; i++) {
                    var parallaxInstance = new Parallax(scene[i], {
                        relativeInput: true,
                    });
                    parallaxInstance.friction(0.05, 0.05);
                    // parallaxInstance.friction();
                }
            }
            const observer = new IntersectionObserver(
                this.callbackFunction,
                this.state.options
            );
            if (this._movingGalleryRef.current) {
                observer.observe(this._movingGalleryRef.current);
            }

            return () => {
                if (this._movingGalleryRef.current) {
                    observer.unobserve(this._movingGalleryRef.current);
                }
            };
        }, 500);
        setInterval(() => {
            this.fetchTime();
        }, 1000);
    }

    callbackFunction = (entries) => {
        const [entry] = entries;
        // console.log("Header tag entry: ", entry.isIntersecting);
        // setIsVisible(entry.isIntersecting);
        this.setState({...this.state, visible: entry.isIntersecting});
    };

    fetchTime() {
        axios
            .get("https://www.worldtimeapi.org/api/timezone/Etc/UTC")
            .then((res) => {
                const time_utc = res.data.datetime;
                this.setState({
                    ...this.state,
                    time_kst: moment
                        .utc(time_utc)
                        .tz("Asia/Seoul")
                        .format("HH:mm"),
                    time_bst: moment
                        .utc(time_utc)
                        .tz("Europe/London")
                        .format("HH:mm"),
                    time_edt: moment
                        .utc(time_utc)
                        .tz("America/New_York")
                        .format("HH:mm"),
                    time_cst: moment
                        .utc(time_utc)
                        .tz("America/Chicago")
                        .format("HH:mm"),
                });
            })
            .catch((err) => {
                console.log("error on fetching time : ", err);
            });
    }

    componentDidUpdate() {
        if (this.state.loading.every(Boolean)) this._initGallery();
    }

    _initGallery = () => {
        const imgArrConst = this.state.dynamicRefs;

        imgArrConst.forEach((item) => {
            gsap.set(item.current, {
                left: 0,
            });
        });

        let imagesPosition = 0;
        let totalW = 0;
        let imgWidths = {};
        imgArrConst.map((img, i) => {
            if (img.current) {
                let imgWidth = img.current?.getBoundingClientRect().width;
                //initial left position depending on previous photos
                let leftPosition = imagesPosition;
                //positioning the images before moving them
                gsap.set(img.current, {
                    left: leftPosition,
                    width: img.current?.getBoundingClientRect().width,
                    height: img.current?.getBoundingClientRect().height,
                });
                imagesPosition += imgWidth;
                //calculating total imgs width
                totalW += imgWidth;
                //create hash of width per index
                imgWidths[i] = totalW;
            }
        });
        // console.log("total slider length : ", totalW);
        let additionalX = {val: 0};
        let additionalXAnim = null;
        let offset = 0;
        let wrapperHeight = 0;
        this.state.dynamicRefs.forEach((item) => {
            if (
                item.current !== null &&
                item.current.getBoundingClientRect().height > wrapperHeight
            )
                wrapperHeight = item.current?.getBoundingClientRect().height;
        });
        if (this._movingGalleryWrapperRef.current !== null) {
            this._movingGalleryWrapperRef.current.style.height = `${wrapperHeight}px`;
        }

        imgArrConst.forEach((item) => {
            let index = item.current.getAttribute("data-index");
            let move = null;
            const clName = item.current.getAttribute("class");
            const imageSet = this.props.movingGalleryProps;
            imageSet.map((t) => {
                if (t.className === clName) move = t.move;
            });
            // const ht = item.current.getBoundingClientRect().height;
            // const wt = item.current.getBoundingClientRect().width;
            // const hw = ht * wt;
            // // console.log("space  : ", hw);

            if (!this.state.move) {
                move = move / 4;
            }
            // totalW = 11615;
            gsap.to(item.current, {
                x: `-=${totalW}`,
                duration: move,
                repeat: -1,
                // paddingTop: "500px",
                ease: "none",
                modifiers: {
                    x: (x, arr) => {
                        const imgIndex = arr.getAttribute("data-index");
                        let maxLeftTravel = -imgWidths[imgIndex];
                        let rightPositioning = totalW + maxLeftTravel;
                        var mod = gsap.utils.wrap(
                            maxLeftTravel,
                            rightPositioning
                        );
                        offset += additionalX.val;
                        return `${mod(parseFloat(x) + offset)}px`;
                    },
                },
            });
        });
    };

    _imageLoadedHandler(index) {
        let tempState = this.state.loading;
        tempState[index] = true;
        this.setState({loading: tempState});
    }

    _setItemsForRender = () => {
        let toRenderAssign = [];
        const duplicateArr = (arr, times) =>
            Array(times)
                .fill([...arr])
                .reduce((a, b) => a.concat(b));

        const multipliedSlidesArray = duplicateArr(
            this.props.movingGalleryProps,
            this.state.sliderWrapperMultiplier
        );
        let status = true;
        let trueCount = 0;
        let falseCount = 0;

        multipliedSlidesArray.forEach((item, index) => {
            toRenderAssign.push(
                <a
                    className={item.className}
                    // onMouseMove={(e) => this.moveOnImage(e)}
                    data-index={index}
                    ref={this.state.dynamicRefs[index]}
                    // className="moving-gallery__slide"
                    data-relative-input="true"
                    // data-depth={item.depth}
                >
                    <img
                        data-depth={item.depth}
                        // className={item.className}
                        className="photos"
                        onLoad={() => this._imageLoadedHandler(index)}
                        src={item.url}
                        alt={item.url}
                    />
                </a>
            );
        });

        return toRenderAssign;
    };

    _generateArrayUtil(size) {
        const generateArray = (n) => [...Array(n)].map((_, index) => index + 1);
        return generateArray(size);
    }

    _assignDynamicRefs = (size) => {
        const arr = this._generateArrayUtil(size);
        const refsArray = arr.map(() => createRef());
        const map2 = document.getElementsByClassName("slider");
        let map3 = [];
        for (var i = 0, len = map2.length; i < len; i++) {
            map3.push({current: map2[i]});
        }
        // return map3;
        return refsArray;
    };

    moveOn = (e) => {};

    parallaxIt(e, ele, movement) {
        // var scene = document.getElementById("scene");
        if (this._movingGalleryRef.current.getBoundingClientRect()) {
            const relX =
                e.pageX -
                this._movingGalleryRef.current.getBoundingClientRect().left;
            const relY =
                e.pageY -
                this._movingGalleryRef.current.getBoundingClientRect().top;
            const yoX = this._movingGalleryRef.current.getBoundingClientRect();

            gsap.to(ele, {
                duration: 1,
                stagger: 0,
                x:
                    ((relX -
                        this._movingGalleryRef.current.getBoundingClientRect()
                            .width /
                            2) /
                        this._movingGalleryRef.current.getBoundingClientRect()
                            .width) *
                    movement,
                y:
                    ((relY -
                        this._movingGalleryRef.current.getBoundingClientRect()
                            .height /
                            2) /
                        this._movingGalleryRef.current.getBoundingClientRect()
                            .height) *
                    movement,
            });
            // );
        }
    }

    _renderItems = () => this.state.toRender.map((item) => item);

    render() {
        return (
            <div style={{overflowY: "hidden"}}>
                <div
                    // onMouseMove={(e) => this.moveOn(e)}
                    ref={this._movingGalleryRef}
                    className="moving-gallery hidden"
                    style={{overflow: "hidden"}}
                >
                    {/* <ParallaxLayer sticky={{ start: 0, end: 1 }}> */}
                    {/* <div>
              <h2 ref={this._headline} className="ideal_showroom">
                IDEAL SHOWROOM
              </h2>
            </div> */}

                    {this.state.move && (
                        <>
                            <div className="ideal-logo">
                                <img src="/Images/Logo/ideal_logo.svg" />
                            </div>
                            <div className="world-clock">
                                <img src="/Images/Clock/Clock.svg" />
                                <div className="clock_content">
                                    <p>
                                        <span>{this.state.time_kst}</span>{" "}
                                        <span>kst</span>
                                    </p>
                                    <p>
                                        <span>{this.state.time_bst}</span>{" "}
                                        <span>bst</span>
                                    </p>
                                    <p>
                                        <span>{this.state.time_edt}</span>{" "}
                                        <span>edt</span>
                                    </p>
                                    <p>
                                        <span>{this.state.time_cst}</span>{" "}
                                        <span>cst</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <TopButtons />
                                </div>
                                {this.state.visible && (
                                    <h2
                                        ref={this._headline}
                                        style={{zIndex: 2}}
                                        className="ideal_showroom"
                                    >
                                        IDEAL SHOWROOM
                                    </h2>
                                )}
                            </div>
                            <div>
                                <BottomButtons />
                            </div>
                        </>
                    )}
                    {/* </ParallaxLayer> */}
                    <div
                        ref={this._movingGalleryWrapperRef}
                        className="moving-gallery__wrapper yo"
                        // style={{ background: "transparent" }}
                        // data-relative-input="true"
                        // id="scene"
                    >
                        {this._renderItems()}
                    </div>
                </div>
            </div>
        );
    }
}

class MainBannerOne extends Component {
    constructor(props) {
        super(props);
        const min = 1;
        const max = 4;
        this.state = {
            k: Math.floor(Math.random() * (max - min)) + min,
            move: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({move: nextProps.move});
    }

    _movingGalleryProps1 = [
        {
            url: "/Images/Pallets/One/1.jpg",
            className: "banOne1 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/One/2.jpg",
            className: "banOne2 slider",
            depth: 0.8,
            move: 180,
        },
        {
            url: "/Images/Pallets/One/3.jpg",
            className: "banOne3 slider",
            depth: 0.4,
            move: 200,
        },
        {
            url: "/Images/Pallets/One/4.jpg",
            className: "banOne4 slider",
            depth: 0.6,
            move: 190,
        },
        {
            url: "/Images/Pallets/One/5.jpg",
            className: "banOne5 slider",
            depth: 0.4,
            move: 200,
        },
        {
            url: "/Images/Pallets/One/6.jpg",
            className: "banOne6 slider",
            depth: 0.6,
            move: 195,
        },
        {
            url: "/Images/Pallets/One/7.jpg",
            className: "banOne7 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/One/8.jpg",
            className: "banOne8 slider",
            depth: 0.4,
            move: 200,
        },
        {
            url: "/Images/Pallets/One/9.jpg",
            className: "banOne9 slider",
            depth: 0.8,
            move: 195,
        },
        {
            url: "/Images/Pallets/One/10.jpg",
            className: "banOne10 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/One/11.jpg",
            className: "banOne11 slider",
            depth: 0.8,
            move: 180,
        },
        {
            url: "/Images/Pallets/One/12.jpg",
            className: "banOne12 slider",
            depth: 0.4,
            move: 195,
        },
        {
            url: "/Images/Pallets/One/13.jpg",
            className: "banOne13 slider",
            depth: 0.8,
            move: 180,
        },
        {
            url: "/Images/Pallets/One/14.jpg",
            className: "banOne14 slider",
            depth: 0.6,
            move: 195,
        },
        {
            url: "/Images/Pallets/One/15.jpg",
            className: "banOne15 slider",
            depth: 0.4,
            move: 200,
        },
        {
            url: "/Images/Pallets/One/16.jpg",
            className: "banOne16 slider",
            depth: 0.3,
            move: 198,
        },
        {
            url: "/Images/Pallets/One/17.jpg",
            className: "banOne17 slider",
            depth: 0.6,
            move: 185,
        },
        {
            url: "/Images/Pallets/One/18.jpg",
            className: "banOne18 slider",
            depth: 0.8,
            move: 200,
        },
    ];

    _movingGalleryProps2 = [
        {
            url: "/Images/Pallets/Two/1.jpg",
            className: "banTwo1 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Two/2.jpg",
            className: "banTwo2 slider",
            depth: 0.8,
            move: 198,
        },
        {
            url: "/Images/Pallets/Two/3.jpg",
            className: "banTwo3 slider",
            depth: 0.4,
            move: 199,
        },
        {
            url: "/Images/Pallets/Two/4.jpg",
            className: "banTwo4 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Two/5.jpg",
            className: "banTwo5 slider",
            depth: 0.6,
            move: 195,
        },
        {
            url: "/Images/Pallets/Two/6.jpg",
            className: "banTwo6 slider",
            depth: 0.4,
            move: 194,
        },
        {
            url: "/Images/Pallets/Two/7.jpg",
            className: "banTwo7 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Two/8.jpg",
            className: "banTwo8 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Two/9.jpg",
            className: "banTwo9 slider",
            depth: 0.8,
            move: 190,
        },
        {
            url: "/Images/Pallets/Two/10.jpg",
            className: "banTwo10 slider",
            depth: 0.6,
            move: 195,
        },
        {
            url: "/Images/Pallets/Two/11.jpg",
            className: "banTwo11 slider",
            depth: 0.8,
            move: 185,
        },
        {
            url: "/Images/Pallets/Two/12.jpg",
            className: "banTwo12 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Two/13.jpg",
            className: "banTwo13 slider",
            depth: 0.6,
            move: 190,
        },
        {
            url: "/Images/Pallets/Two/14.jpg",
            className: "banTwo14 slider",
            depth: 0.3,
            move: 198,
        },
        {
            url: "/Images/Pallets/Two/15.jpg",
            className: "banTwo15 slider",
            depth: 0.8,
            move: 185,
        },
        {
            url: "/Images/Pallets/Two/16.jpg",
            className: "banTwo16 slider",
            depth: 0.6,
            move: 195,
        },
        {
            url: "/Images/Pallets/Two/17.jpg",
            className: "banTwo17 slider",
            depth: 0.4,
            move: 195,
        },
    ];
    _movingGalleryProps3 = [
        {
            url: "/Images/Pallets/Three/1.jpg",
            className: "banThree1 slider",
            depth: 0.8,
            move: 185,
        },
        {
            url: "/Images/Pallets/Three/2.jpg",
            className: "banThree2 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Three/3.jpg",
            className: "banThree3 slider",
            depth: 0.4,
            move: 195,
        },
        {
            url: "/Images/Pallets/Three/4.jpg",
            className: "banThree4 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Three/5.jpg",
            className: "banThree5 slider",
            depth: 0.6,
            move: 190,
        },
        {
            url: "/Images/Pallets/Three/6.jpg",
            className: "banThree6 slider",
            depth: 0.5,
            move: 195,
        },
        {
            url: "/Images/Pallets/Three/7.jpg",
            className: "banThree7 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Three/8.jpg",
            className: "banThree8 slider",
            depth: 0.5,
            move: 185,
        },
        {
            url: "/Images/Pallets/Three/9.jpg",
            className: "banThree9 slider",
            depth: 0.3,
            move: 195,
        },
        {
            url: "/Images/Pallets/Three/10.jpg",
            className: "banThree10 slider",
            depth: 0.6,
            move: 200,
        },
        {
            url: "/Images/Pallets/Three/11.jpg",
            className: "banThree11 slider",
            depth: 0.8,
            move: 180,
        },
        {
            url: "/Images/Pallets/Three/12.jpg",
            className: "banThree12 slider",
            depth: 0.5,
            move: 190,
        },
        {
            url: "/Images/Pallets/Three/13.jpg",
            className: "banThree13 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Three/14.jpg",
            className: "banThree14 slider",
            depth: 0.6,
            move: 185,
        },
        {
            url: "/Images/Pallets/Three/15.jpg",
            className: "banThree15 slider",
            depth: 0.8,
            move: 180,
        },
        {
            url: "/Images/Pallets/Three/16.jpg",
            className: "banThree16 slider",
            depth: 0.3,
            move: 200,
        },
        {
            url: "/Images/Pallets/Three/17.jpg",
            className: "banThree17 slider",
            depth: 0.4,
            move: 195,
        },
        {
            url: "/Images/Pallets/Three/18.jpg",
            className: "banThree18 slider",
            depth: 0.8,
            move: 180,
        },
    ];

    render() {
        return (
            <div className="brandmainbanner">
                {this.state.k == 1 && (
                    <MovingGalleryV2
                        move={this.state.move}
                        movingGalleryProps={this._movingGalleryProps1}
                    />
                )}
                {this.state.k == 2 && (
                    <MovingGalleryV2
                        move={this.state.move}
                        movingGalleryProps={this._movingGalleryProps2}
                    />
                )}
                {this.state.k == 3 && (
                    <MovingGalleryV2
                        move={this.state.move}
                        movingGalleryProps={this._movingGalleryProps3}
                    />
                )}
            </div>
        );
    }
}

export default MainBannerOne;
