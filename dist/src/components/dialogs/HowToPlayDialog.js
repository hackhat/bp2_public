import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import ReactPlayer from 'react-player';
import { RESOURCES_PER_PLANET_KILL } from "../../reducers/playersReducer";
import { PLANET_RESOURCES_COST } from "../../reducers/advancedSelectors/canPlayerCreatePlanet";
import { SHIP_STREAM_RESOURCE_COST } from "../../epics/server/requestShipStreamEpic";
export var HowToPlayDialog = function (props) {
    return (React.createElement(Dialog, { open: props.open, onClose: props.onClose, maxWidth: "xs" },
        React.createElement(DialogTitle, { id: "alert-dialog-title" }, "How to play?"),
        React.createElement(DialogContent, null,
            React.createElement(ReactPlayer, { url: "https://www.youtube.com/watch?v=HeOmYdYUgeQ", playing: true, loop: true, controls: true, volume: 0, muted: true, width: "100%", height: "auto" }),
            React.createElement(DialogContentText, null,
                "Start the game by selecting a empty planet (grey planets). You can create new planets by clicking on the black background, they will cost you $",
                PLANET_RESOURCES_COST,
                "."),
            React.createElement(DialogContentText, null,
                "While you have your planet selected click on a close planet to start streaming units to that planet. After a while you will own that new planet and earn $",
                RESOURCES_PER_PLANET_KILL,
                ". Click on the circle near your source planet to destroy the stream. Each stream costs $",
                SHIP_STREAM_RESOURCE_COST,
                "."),
            React.createElement(DialogContentText, null, "Every few seconds all planets receive new units (recharging), the more planets you have, the less units you received. Also you receive resources every few seconds. Game restarts every few minutes.")),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: props.onClose, color: "primary" }, "Got it"))));
};
//# sourceMappingURL=HowToPlayDialog.js.map