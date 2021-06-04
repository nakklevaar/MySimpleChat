import "./page-layout.css";

import React, { ReactChild } from "react";

import Sideblock from "../side-block";

interface IProps {
    left?: ReactChild;
    right?: ReactChild;
}

const PageLayout = ({ left, right = <><Sideblock /> <Sideblock /></> }: IProps) => {
    return (
        <main>
            <div className="container">
                <div className="main-body">
                    <div className="main-body__left-column column">{left}</div>
                    <div className="main-body__left-right column">{right}</div>
                </div>
            </div>
        </main>
    );
};

export default PageLayout;
