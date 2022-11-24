import React, { PropsWithChildren } from "react";
import styles from "./ToolButton.scss";
import Icon from "@material-ui/core/Icon";
import CreateIcon from "@material-ui/icons/Create";
export default function ToolButton(
    props: PropsWithChildren<{ backgroundColor: string; color: string }>
): JSX.Element {
    return (
        <div className={styles.ToolButton} style={{ backgroundColor: props.backgroundColor }}>
            {props.children}
        </div>
    );
}
