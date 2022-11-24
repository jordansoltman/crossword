import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

export default function AddDictionaryDialog(props: {
    filename: string;
    chooseFile: () => void;
    import: (name: string) => void;
}): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const [dictionaryName, setDictionaryName] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.import(dictionaryName);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Import Dictionary</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Dictionaries can be added as txt files (one word per line).
                    </DialogContentText>
                    <Typography>{props.filename}</Typography>
                    <Button onClick={props.chooseFile}>Choose File</Button>
                    <TextField
                        value={dictionaryName}
                        onChange={(ev) => setDictionaryName(ev.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Dictionary Name"
                        required
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleClose}
                        disabled={dictionaryName.length === 0}
                        color="primary"
                    >
                        Import
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
