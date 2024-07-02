import { FragmentProps } from "..";
import Wrapper from "../../utils/wrapper"

interface SystemInfoProps extends FragmentProps {

}

const SystemInfo = (props: SystemInfoProps) => {
    return (
        <Wrapper title="系统信息">
            系统信息
        </Wrapper>
    )
};

export default SystemInfo