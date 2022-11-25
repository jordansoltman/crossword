import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    Typography,
    TextField,
    DialogContent,
    DialogActions,
    DialogContentText
} from "@mui/material";

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
