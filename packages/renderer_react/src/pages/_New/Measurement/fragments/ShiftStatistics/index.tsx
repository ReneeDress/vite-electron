import { FragmentProps } from "..";
import Wrapper from "../../utils/wrapper"

interface ShiftStatisticsProps extends FragmentProps {

}

const ShiftStatistics = (props: ShiftStatisticsProps) => {
    return (
        <Wrapper title="班次统计信息">
            班次统计信息
        </Wrapper>
    )
};

export default ShiftStatistics