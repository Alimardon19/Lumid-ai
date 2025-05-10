import {FC} from "react";
import {Button, Flex} from "antd";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {storage} from "../utils/storage.ts";
import {updateAppState} from "../store/actions";
import {ONBOARDING_STEP} from "../config/constants.ts";


type OnboardingFooterButton = {
    prev: number;
    goNext: VoidFunction;
    loading?: boolean;
}

export const OnboardingFooterButtons: FC<OnboardingFooterButton> = ({prev, goNext, loading}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickPrevBtn = () => {
        const step = prev === 0 ? 1 : prev;
        storage.set(ONBOARDING_STEP, step);
        dispatch(updateAppState("onboardingStep", {step}));
    };

    return (
        <>
            <Flex justify="space-between" gap={30}>
                {prev === 0 ?
                    <Button
                        block
                        size="large"
                        color="primary"
                        variant="outlined"
                        onClick={() => navigate("/")}
                    >
                        <i className="ri-arrow-left-long-line"/> Back home
                    </Button>
                    :
                    <Button
                        block
                        size="large"
                        color="primary"
                        variant="outlined"
                        onClick={onClickPrevBtn}
                    >
                        <i className="ri-arrow-left-long-line"/> Prev
                    </Button>
                }
                <Button
                    block
                    size="large"
                    type="primary"
                    onClick={goNext}
                    loading={loading}
                >
                    Next <i className="ri-arrow-right-long-line"/>
                </Button>
            </Flex>
        </>
    )
}


export default OnboardingFooterButtons;