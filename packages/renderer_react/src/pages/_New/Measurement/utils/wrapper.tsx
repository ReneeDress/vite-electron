import { Card } from "antd";
import { ReactNode } from "react";

interface WrapperProps {
    title: string;
    children: ReactNode | ReactNode[];
}

const Wrapper = (props: WrapperProps) => {
    const { title, children } = props;
    return (
        <Card size="small" title={title} style={{ textAlign: 'left', width: '100%' }}>
            {children}
        </Card>
    )
};

export default Wrapper;