import MachineInfo from "./MachineInfo";
import Measure3dModel from "./Measure3dModel";
import MeasureImage from "./MeasureImage";
import MeasureInfo from "./MeasureInfo";
import MeasureResult from "./MeasureResult";
import RealtimeData from "./RealtimeData";
import ShiftStatistics from "./ShiftStatistics";
import SystemInfo from "./SystemInfo";

export {
    ShiftStatistics,
    MeasureResult,
    MeasureInfo,
    RealtimeData,
    MachineInfo,
    SystemInfo,
    Measure3dModel,
    MeasureImage,
}

export interface FragmentProps {
    data?: any;
}