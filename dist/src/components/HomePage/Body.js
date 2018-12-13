var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import Grid from '@material-ui/core/Grid';
import styled, { css } from "react-emotion";
import { GameCard } from "./GameCard";
import winImageUrl from './images/win.png';
import sendShipImageUrl from './images/sendShip.png';
import shipStreamImageUrl from './images/shipStream.png';
import createPlanetImageUrl from './images/createPlanet.png';
import overlayRankingImageUrl from './images/overlayRanking.png';
var Root = styled("section")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  background-color: #c3c3c3;\n"], ["\n  position: relative;\n  background-color: #c3c3c3;\n"])));
var GridWrapper = styled('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: auto;\n  padding: ", "px 0;\n  margin-left: ", "px;\n  margin-right: ", "px;\n  \n  ", " {\n    width: 1100px;\n    margin-left: auto;\n    marginRight: auto;\n  }\n"], ["\n  width: auto;\n  padding: ", "px 0;\n  margin-left: ", "px;\n  margin-right: ", "px;\n  \n  ", " {\n    width: 1100px;\n    margin-left: auto;\n    marginRight: auto;\n  }\n"])), function (props) { return props.theme.spacing.unit * 8; }, function (props) { return props.theme.spacing.unit * 3; }, function (props) { return props.theme.spacing.unit * 3; }, function (props) { return props.theme.breakpoints.up(1100 + props.theme.spacing.unit * 3 * 2); });
var gridItemClassName = css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 5px;\n"], ["\n  padding: 5px;\n"])));
var cards = [
    {
        id: "gameObjective",
        title: "Objective of the game",
        overview: "Conquer as many planets as you can before the time runs out.",
        howTo: "Send ships to other planets to own them",
        imageUrl: winImageUrl,
    },
    {
        id: "sendShips",
        title: "Sending ships",
        overview: "Time to own more planets? To conquer new planets you need to send ships and kill the units in the destination planet. Once you do that you will own the new planet.",
        howTo: "To send a ship, select your planet and then click on the destination planet. A ship will be prepared and send as soon as possible.",
        imageUrl: sendShipImageUrl,
    },
    {
        id: "shipStreams",
        title: "Ship streams",
        overview: "Tired of manually sending ships one by one? Now you can create a ship stream and it will send ships automatically. It will only send a new ship if the destination planet is not full and the origin planet has at least ~50% units.",
        howTo: "To create a ship stream, click on the icon labelled \"Stream\", select the origin planet and then click on the destination planet. To delete the ship stream, just press on the platform with arrows.",
        imageUrl: shipStreamImageUrl,
    },
    {
        id: "createPlanets",
        title: "Create planets",
        overview: "Time to expand your colony ... or just stuck? No problem, save some resources and create a new planet.",
        howTo: "To create a new planet, click on the icon labelled \"Planet\" and click on an empty space. Make sure there is enough space around, if it doesn't work, try again in another place, you will only be charged when a planet is created. Look for notification in the bottom right area for more info.",
        imageUrl: createPlanetImageUrl,
    },
    {
        id: "overlayRanking",
        title: "Overlay ranking",
        overview: "Want to be the best? Better keep an eye on the ranking. ",
        howTo: "Is located in the top right area. The number is the rank of that player, the cloud icon indicates whenever the player is online or not. Last is the number of planets owned out of total planets in the game (1/160 = 1 planet owned out of 160 total planets).",
        imageUrl: overlayRankingImageUrl,
    },
];
export var Body = function () {
    return (React.createElement(Root, null,
        React.createElement(GridWrapper, null,
            React.createElement(Grid, { container: true, spacing: 40 }, cards.map(function (card) {
                return (React.createElement(Grid, { item: true, key: card.id, xs: 12, sm: 6, md: 4, lg: 3, className: gridItemClassName },
                    React.createElement(GameCard, __assign({}, card))));
            })))));
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Body.js.map