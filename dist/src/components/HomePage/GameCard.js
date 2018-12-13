var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from "react";
import { css } from "react-emotion";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
var cardMediaClassName = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 140px;\n"], ["\n  height: 140px;\n"])));
export var GameCard = function (props) {
    return (React.createElement(Card, null,
        React.createElement(CardMedia, { className: cardMediaClassName, image: props.imageUrl, title: "" }),
        React.createElement(CardContent, null,
            React.createElement(Typography, { gutterBottom: true, variant: "headline", component: "h2" }, props.title),
            React.createElement(Typography, { component: "p" }, props.overview),
            React.createElement(Typography, { component: "p" },
                React.createElement(Typography, { component: "span", variant: "body2" }, "How to:"),
                props.howTo))));
};
var templateObject_1;
//# sourceMappingURL=GameCard.js.map