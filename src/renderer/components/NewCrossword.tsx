import { Input } from "@mui/material";
import React from "react";
import "./NewCrossword.scss";

export default function NewCrossword(props: {
    createCrossword: (title: string, width: number, height: number) => void;
}): JSX.Element {
    const [width, setWidth] = React.useState(10);
    const [height, setHeight] = React.useState(10);
    const [title, setTitle] = React.useState("");

    return (
        <div className="NewCrossword">
            <div className="NewCrossword-box">
                <div>
                    Name:
                    <Input value={title} onChange={(ev) => setTitle(ev.target.value)} />
                </div>
                <div>
                    Width:
                    <Input
                        type="number"
                        value={width}
                        onChange={(ev) => setWidth(parseInt(ev.target.value, 10))}
                    />
                </div>
                <div>
                    Height:
                    <Input
                        type="number"
                        value={height}
                        onChange={(ev) => setHeight(parseInt(ev.target.value, 10))}
                    />
                </div>
                <div>
                    <button onClick={() => props.createCrossword(title, width, height)}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
