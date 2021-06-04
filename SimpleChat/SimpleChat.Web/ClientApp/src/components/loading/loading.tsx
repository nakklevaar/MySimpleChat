import "./loading.css";

const Loading = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`cssload-container ${className}`}>
            <div className="cssload-whirlpool"></div>
        </div>
    );
};

export default Loading;