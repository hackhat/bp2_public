var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { connect } from 'react-redux';
import { selectors } from "../../reducers";
import { createSendClientToServerAction } from "../../actions";
import styled from "react-emotion";
import { ChatActions } from "../../actions/ChatActions";
import Typography from "@material-ui/core/Typography";
import { getLastInArray } from "../../utils/getLastInArray";
var Root = styled("section")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: #09132685;\n  background: linear-gradient(to bottom, rgba(9,19,38,0) 0%,rgba(9,19,38,1) 100%);\n  border-left: 0.5px solid #ffffff;\n"], ["\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: #09132685;\n  background: linear-gradient(to bottom, rgba(9,19,38,0) 0%,rgba(9,19,38,1) 100%);\n  border-left: 0.5px solid #ffffff;\n"])));
var ChatMessage = styled(Typography)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: left;\n  word-wrap: break-word;\n"], ["\n  text-align: left;\n  word-wrap: break-word;\n"])));
var ChatInput = styled("input")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: transparent;\n  border: none;\n  border-bottom: 1px solid white;\n  color: white;\n  outline-width: 0;\n  width: 100%;\n  padding: 5px;\n  box-sizing: border-box;\n  \n  &::placeholder, &:-ms-input-placeholder, &::-ms-input-placeholder {\n    color: #ffffffb0;\n  }\n"], ["\n  background: transparent;\n  border: none;\n  border-bottom: 1px solid white;\n  color: white;\n  outline-width: 0;\n  width: 100%;\n  padding: 5px;\n  box-sizing: border-box;\n  \n  &::placeholder, &:-ms-input-placeholder, &::-ms-input-placeholder {\n    color: #ffffffb0;\n  }\n"])));
var MessageList = styled("div")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  overflow-x: auto;\n  overflow-y: auto;\n  flex-grow: 1;\n  padding: 5px;\n  margin-bottom: 0;\n"], ["\n  overflow-x: auto;\n  overflow-y: auto;\n  flex-grow: 1;\n  padding: 5px;\n  margin-bottom: 0;\n"])));
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currentMessageText: '',
        };
        _this.onMessageList = function (messageListElement) {
            _this.messageListElement = messageListElement;
        };
        _this.onKeyPress = function (event) {
            if (event.key === 'Enter') {
                _this.props.sendMessage(_this.state.currentMessageText);
                _this.setState(__assign({}, _this.state, { currentMessageText: '' }));
            }
        };
        _this.onInputChange = function (event) {
            _this.setState(__assign({}, _this.state, { currentMessageText: event.target.value }));
        };
        return _this;
    }
    Chat.prototype.render = function () {
        return (React.createElement(Root, null,
            React.createElement(MessageList, { innerRef: this.onMessageList }, this.props.messages.reduce(function (output, message) {
                output.push(React.createElement(ChatMessage, { key: message.id, variant: "body1", style: { color: message.color }, title: message.date.toString() },
                    React.createElement("strong", null, message.ownerName),
                    ": ",
                    message.text));
                return output;
            }, [])),
            React.createElement(ChatInput, { id: "name", type: "text", onChange: this.onInputChange, value: this.state.currentMessageText, tabIndex: 0, autoComplete: "off", onKeyPress: this.onKeyPress, placeholder: "Type your message here" })));
    };
    Chat.prototype.componentDidUpdate = function (prevProps) {
        var lastMessageCurrentProps = getLastInArray(this.props.messages);
        var lastMessagePrevProps = getLastInArray(prevProps.messages);
        var lastMessageChanged = lastMessageCurrentProps && lastMessagePrevProps && lastMessagePrevProps.id !== lastMessageCurrentProps.id;
        if (this.messageListElement && (!lastMessagePrevProps || lastMessageChanged)) {
            this.messageListElement.scrollTop = this.messageListElement.scrollHeight;
        }
    };
    Chat.prototype.componentDidMount = function () {
        if (this.messageListElement) {
            this.messageListElement.scrollTop = this.messageListElement.scrollHeight;
        }
    };
    return Chat;
}(React.PureComponent));
var mapDispatch = function (dispatch) {
    return {
        sendMessage: function (message) {
            var action = createSendClientToServerAction(ChatActions.requestSendMessage, {
                message: message,
            });
            dispatch(action);
        }
    };
};
var mapState = function (state) {
    return {
        messages: selectors.chat.getMessages(state),
    };
};
var ConnectedComponent = connect(mapState, mapDispatch)(Chat);
export default ConnectedComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=Chat.js.map