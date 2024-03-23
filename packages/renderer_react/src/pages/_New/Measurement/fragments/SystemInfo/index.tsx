import { FragmentProps } from "..";
import Wrapper from "../../utils/wrapper"

interface SystemInfoProps extends FragmentProps {

}

const SystemInfo = (props: SystemInfoProps) => {
    return (
        <Wrapper title="机床信息">
            机床信息
        </Wrapper>
    )
};

export default SystemInfo