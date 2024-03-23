import { FragmentProps } from "..";
import Wrapper from "../../utils/wrapper"

interface RealtimeDataProps extends FragmentProps {

}

const RealtimeData = (props: RealtimeDataProps) => {
    return (
        <Wrapper title="当前检测数据">
            当前检测数据
        </Wrapper>
    )
};

export default RealtimeData