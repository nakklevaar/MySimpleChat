import "./chats-page.css";

import ChatsPageHeader from "./header";
import ChatsPageMain from "./main";
import PageLayout from "../page-layout";
import { useEffect } from "react";

const ChatsPage = () => {
    useEffect(() => {
        document.body.style.height = "auto";
        return () => {
            document.body.style.height = "100%";
        };
    }, []);
    return (
        <PageLayout
            left={
                <div className="chats-page">
                    <ChatsPageHeader />
                    <ChatsPageMain />
                </div>
            }
        />
    );
};

export default ChatsPage;
