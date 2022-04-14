import gsap from "gsap";
import IdleTimer from "react-idle-timer";
import "./MainBannerOne.scss";
import Parallax from "parallax-js";
import { useEffect, useRef, useState } from "react";

const MovingGalleryV2 = (props) => {
  const refContainer = useRef(null);
  const _movingGalleryRef = useRef();
  const _movingGalleryWrapperRef = useRef();
  const [move, setMove] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const sliderWrapperMultiplier = 1;

  const _generateArrayUtil = (size) => {
    const generateArray = (n) => [...Array(n)].map((_, index) => index + 1);
    return generateArray(size);
  };

  const _assignDynamicRefs = (size) => {
    const arr = _generateArrayUtil(size);
    const refArray = useRef([]);
    const map2 = document.getElementsByClassName("slider");
    let map3 = [];
    for (var i = 0, len = map2.length; i < len; i++) {
      map3.push({ current: map2[i] });
      refArray.current = refArray.current.slice(0, i);
    }
    // const refsArray = arr.map(() => useRef());
    // setTimeout(function () {
    // }, 1000);
    return map3;
    // return refArray;
  };

  const dynamicRefs = _assignDynamicRefs(props.movingGalleryProps.length);
  const [toRender, setToRender] = useState([]);
  const [loading, setLoading] = useState(
    Array.from({ length: props.movingGalleryProps.length }, (i) => (i = false))
  );
  let idleTimer = null;

  useEffect(() => {
    setToRender(_setItemsForRender());
    if (loading.every(Boolean)) _initGallery();
    setTimeout(function () {
      var scene = document.getElementsByClassName("slider");
      if (scene) {
        for (var i = 0, len = scene.length; i < len; i++) {
          var parallaxInstance = new Parallax(scene[i], {
            relativeInput: true,
          });
          parallaxInstance.friction(0.2, 0.2);
        }
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (loading.every(Boolean)) _initGallery();
  });

  const handleOnAction = (event) => {
    setMove(false);
    // ------- when user is idle
    // console.log("home user is idle", event);
    // console.log("home last active", getLastActiveTime());
  };

  const handleOnActive = (event) => {
    // ------- when user is active
    // console.log("home user is active", event);
    // console.log("home time remaining", getRemainingTime());
  };

  const handleOnIdle = (event) => {
    setMove(true);
    // ------- when user did something
    // console.log("home user did something", event);
  };

  const _initGallery = () => {
    setTimeout(function () {
      const imgArrConst = dynamicRefs;

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
      console.log("length : ", totalW);
      let additionalX = { val: 0 };
      let additionalXAnim = null;
      let offset = 0;
      let wrapperHeight = 0;
      dynamicRefs.forEach((item) => {
        if (
          item.current !== null &&
          item.current.getBoundingClientRect().height > wrapperHeight
        )
          wrapperHeight = item.current?.getBoundingClientRect().height;
      });
      if (_movingGalleryWrapperRef.current !== null) {
        _movingGalleryWrapperRef.current.style.height = `${wrapperHeight}px`;
      }

      imgArrConst.forEach((item) => {
        let index = item.current.getAttribute("data-index");
        let move = null;
        const clName = item.current.getAttribute("class");
        const imageSet = props.movingGalleryProps;
        imageSet.map((t) => {
          if (t.className === clName) move = t.move;
        });
        // const ht = item.current.getBoundingClientRect().height;
        // const wt = item.current.getBoundingClientRect().width;
        // const hw = ht * wt;
        // // console.log("space  : ", hw);

        if (!move) {
          move = move / 4;
        }
        totalW = 11615;
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
              var mod = gsap.utils.wrap(maxLeftTravel, rightPositioning);
              offset += additionalX.val;
              return `${mod(parseFloat(x) + offset)}px`;
            },
          },
        });
      });
    }, 1000);
  };

  const _imageLoadedHandler = (index) => {
    let tempState = loading;
    tempState[index] = true;
    setLoading(tempState);
    // this.setState({ loading: tempState });
  };

  const _setItemsForRender = () => {
    let toRenderAssign = [];
    const duplicateArr = (arr, times) =>
      Array(times)
        .fill([...arr])
        .reduce((a, b) => a.concat(b));

    const multipliedSlidesArray = duplicateArr(
      props.movingGalleryProps,
      sliderWrapperMultiplier
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
          ref={dynamicRefs[index]}
          // className="moving-gallery__slide"
          data-relative-input="true"
          id="scene"
          // data-depth={item.depth}
        >
          <img
            data-depth={item.depth}
            // className={item.className}
            className="photos"
            onLoad={() => _imageLoadedHandler(index)}
            src={item.url}
            alt={item.url}
          />
        </a>
      );
    });

    return toRenderAssign;
  };

  const _renderItems = () => toRender.map((item) => item);

  return (
    <div>
      <IdleTimer
        ref={(ref) => {
          idleTimer = ref;
        }}
        timeout={4000}
        onActive={handleOnActive}
        onIdle={handleOnIdle}
        onAction={handleOnAction}
        // debounce={250}
      >
        <div
          // onMouseMove={(e) => this.moveOn(e)}
          ref={_movingGalleryRef}
          className="moving-gallery hidden"
        >
          {move && <div className="ideal_showroom">IDEAL SHOWROOM</div>}
          <div
            ref={_movingGalleryWrapperRef}
            className="moving-gallery__wrapper yo"
            // style={{ background: "transparent" }}
            // data-relative-input="true"
            // id="scene"
          >
            {_renderItems()}
          </div>
        </div>
      </IdleTimer>
    </div>
  );
};

function MainBannerTwo() {
  const min = 1;
  const max = 4;

  let k = Math.floor(Math.random() * (max - min)) + min;

  const _movingGalleryProps1 = [
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

  const _movingGalleryProps2 = [
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
  const _movingGalleryProps3 = [
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
  return (
    <div className="brandmainbanner">
      {k == 1 && <MovingGalleryV2 movingGalleryProps={_movingGalleryProps1} />}
      {k == 2 && <MovingGalleryV2 movingGalleryProps={_movingGalleryProps2} />}
      {k == 3 && <MovingGalleryV2 movingGalleryProps={_movingGalleryProps3} />}
    </div>
  );
}
export default MainBannerTwo;
