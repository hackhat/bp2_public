import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRoot from '../components/AppRoot';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { StoreProvider } from "../components/contexts/Store";
import { isProduction } from "../utils/isProduction";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from 'emotion-theming';
import { MaterialUICssOrderFix } from "./MaterialUICssOrderFix";
import { createClientStore } from "./createClientStore";
var disableReduxDevTools = isProduction && location.hash !== '#debug';
var enableReduxDevTools = !disableReduxDevTools;
export var startApp = function (rootElement, roomSCI) {
    var store = createClientStore({ enableReduxDevTools: enableReduxDevTools, roomSCI: roomSCI });
    var theme = createMuiTheme();
    var reactRoot = (React.createElement(MaterialUICssOrderFix, null,
        React.createElement(Provider, { store: store },
            React.createElement(StoreProvider, { value: store },
                React.createElement(MuiThemeProvider, { theme: theme },
                    React.createElement(ThemeProvider, { theme: theme },
                        React.createElement(AppRoot, null)))))));
    if (rootElement.hasChildNodes()) {
        ReactDOM.hydrate(reactRoot, rootElement);
    }
    else {
        ReactDOM.render(reactRoot, rootElement);
    }
    registerServiceWorker();
};
//# sourceMappingURL=startApp.js.map