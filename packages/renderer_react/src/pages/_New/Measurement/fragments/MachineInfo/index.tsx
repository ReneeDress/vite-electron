import { FragmentProps } from "..";
import Wrapper from "../../utils/wrapper"

interface MachineInfoProps extends FragmentProps {

}

const MachineInfo = (props: MachineInfoProps) => {
    return (
        <Wrapper title="机床信息">
            机床信息
        </Wrapper>
    )
};

export default MachineInfo