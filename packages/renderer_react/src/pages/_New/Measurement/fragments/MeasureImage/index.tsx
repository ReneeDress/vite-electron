import { FragmentProps } from "..";
import Wrapper from "../../utils/wrapper"

interface MeasureImageProps extends FragmentProps {

}

const MeasureImage = (props: MeasureImageProps) => {
    return (
        <Wrapper title="检测图片">
            检测图片
        </Wrapper>
    )
};

export default MeasureImage