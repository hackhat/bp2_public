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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import componentQueries from 'react-component-queries';
import backgroundNarrowImageUrl from './backgroundNarrow.jpg';
import backgroundWideImageUrl from './backgroundWide.jpg';
import CardMedia from '@material-ui/core/CardMedia';
import styled, { css } from "react-emotion";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import { Link } from "react-router-dom";
var Root = styled('section')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  overflow: hidden;\n"], ["\n  position: relative;\n  overflow: hidden;\n"])));
var IMAGE_HEIGHT = 400;
var GRADIENT_HEIGHT = 100;
var cardMediaClassName = css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: ", "px;\n  position: absolute;\n  width: 100%;\n"], ["\n  height: ", "px;\n  position: absolute;\n  width: 100%;\n"])), IMAGE_HEIGHT);
var Gradient = styled("div")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: linear-gradient(to bottom, rgba(9, 19, 38, 0) 0%,rgba(9, 19, 38, 1) 99%,rgba(9, 19, 38, 1) 100%);  height: 100px;\n  width: 100%;\n  position: absolute;\n  top: ", "px;\n"], ["\n  background: linear-gradient(to bottom, rgba(9, 19, 38, 0) 0%,rgba(9, 19, 38, 1) 99%,rgba(9, 19, 38, 1) 100%);  height: 100px;\n  width: 100%;\n  position: absolute;\n  top: ", "px;\n"])), IMAGE_HEIGHT - GRADIENT_HEIGHT);
var Content = styled("div")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-top: ", "px;\n  background: rgba(9, 19, 38, 1);\n  position: relative;\n  color: white;\n  padding: 0 20px 20px 20px;\n"], ["\n  margin-top: ", "px;\n  background: rgba(9, 19, 38, 1);\n  position: relative;\n  color: white;\n  padding: 0 20px 20px 20px;\n"])), IMAGE_HEIGHT);
var InnerContentOffset = styled("div")(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: relative;\n  top: -", "px;\n"], ["\n  position: relative;\n  top: -", "px;\n"])), GRADIENT_HEIGHT * 0.5);
var MainCTA = styled(Button)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: rgba(255, 255, 255, 1);\n  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);\n  font-size: 27px;\n  width: 100%;\n  max-width: 239px;\n  margin: 0 auto;\n  text-align: center;\n  display: block;\n  \n  &:hover {\n    background: linear-gradient(45deg,#ff2957 30%,#f45c0d 90%);\n  }\n"], ["\n  color: rgba(255, 255, 255, 1);\n  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);\n  font-size: 27px;\n  width: 100%;\n  max-width: 239px;\n  margin: 0 auto;\n  text-align: center;\n  display: block;\n  \n  &:hover {\n    background: linear-gradient(45deg,#ff2957 30%,#f45c0d 90%);\n  }\n"])));
var noteClassName = css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  opacity: 0.8;\n  font-size: 12px;\n"], ["\n  opacity: 0.8;\n  font-size: 12px;\n"])));
export var InnerHero = function (props) {
    var imageUrl = props.size === 'narrow' ? backgroundNarrowImageUrl : backgroundWideImageUrl;
    return (React.createElement(Root, null,
        React.createElement(CardMedia, { className: cardMediaClassName, image: imageUrl }),
        React.createElement(Gradient, null),
        React.createElement(Content, null,
            React.createElement(InnerContentOffset, null,
                React.createElement(Typography, { variant: "display1", color: "inherit", align: "center" }, "Conquer the universe."),
                React.createElement(Typography, { variant: "subheading", color: "inherit", align: "center" }, "Build and attack planets. Play with your friends online.")),
            React.createElement(MainCTA, { component: function (_a) {
                    var innerRef = _a.innerRef, props = __rest(_a, ["innerRef"]);
                    return React.createElement(Link, __assign({ to: '/game' }, props));
                } }, "Play now!"),
            React.createElement(Typography, { variant: "body1", color: "inherit", align: "center", className: noteClassName }, "No need to install, download or register."),
            React.createElement(Typography, { variant: "body1", color: "inherit", align: "center", className: noteClassName }, "Free and works from any device."))));
};
var query = function (_a) {
    var width = _a.width;
    return ({ size: width < 500 ? 'narrow' : 'wide' });
};
export var Hero = componentQueries(query)(InnerHero);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=Hero.js.map