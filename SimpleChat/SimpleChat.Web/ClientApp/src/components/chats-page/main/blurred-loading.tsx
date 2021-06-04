import Loading from "components/loading";
import { ReactNode } from "react";

const BlurredLoading = ({ render, className, show }: { render: ReactNode; className: string; show: boolean }) => {
    const loading =
        <div className="chats-loading-box"><div className="cssloader-blured-outer">
            <Loading className={className} />
        </div></div>;
    return <>
        {render}
        {show ? null : loading}
    </>;
};

export default BlurredLoading;