import { FragmentProps } from "..";
import Wrapper from "../../utils/wrapper"

interface MeasureInfoProps extends FragmentProps {

}

const MeasureInfo = (props: MeasureInfoProps) => {
    return (
        <Wrapper title="检测信息">
            检测信息
        </Wrapper>
    )
};

export default MeasureInfo