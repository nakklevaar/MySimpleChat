import "./row.css";

interface IProps {
    prop: string;
    value: string;
}

const Row = ({ prop, value }: IProps) => {
    return (
        <div className="profile-about-content__row">
            <div className="profile-about-content__label">{`${prop.charAt(0).toUpperCase() + prop.slice(1)}:`}</div>
            <div className="profile-about-content__info">{value}</div>
        </div>
    );
};

export default Row;