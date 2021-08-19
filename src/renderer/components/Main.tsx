import * as React from "react";
import { useSelector } from "react-redux";
import CrosswordContainer from "../containers/CrosswordContainer";

export default function Main() {
    return (
        <div>
            <div>TOOL: </div>
            <CrosswordContainer />
        </div>
    );
}
