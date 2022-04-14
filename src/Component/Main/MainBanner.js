import {
    Parallax as SpringParallax,
    ParallaxLayer,
} from "@react-spring/parallax";
import BrandMainBanner from "./BrandMainBanner/BrandMainBanner";
import MainBannerOne from "./MainBanner/MainBannerOne";
import "./MainBanner/MainBannerOne.scss";
import {useIdleTimer} from "react-idle-timer";
import {useState} from "react";

function MainBanner(props) {
    const [move, setMove] = useState(true);

    const handleOnIdle = (event) => {
        setMove(false);
    };

    const handleOnActive = (event) => {};

    const handleOnAction = (event) => {
        setMove(true);
    };

    const {getRemainingTime, getLastActiveTime} = useIdleTimer({
        timeout: 4000,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        //debounce: 500,
    });
    return (
        <div>
            <MainBannerOne move={move} />
            <div className="brandDiv">
                <BrandMainBanner move={move} />
            </div>
        </div>
    );
}
export default MainBanner;
