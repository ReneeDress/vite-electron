import { FragmentProps } from "..";
import Wrapper from "../../utils/wrapper"

interface MeasureResultProps extends FragmentProps {

}

const MeasureResult = (props: MeasureResultProps) => {
    return (
        <Wrapper title="检测结果">
            检测结果
        </Wrapper>
    )
};

export default MeasureResult