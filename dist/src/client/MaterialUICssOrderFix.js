import * as React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
// So you don't need to use when overriding css of material ui.
export var MaterialUICssOrderFix = function (_a) {
    var children = _a.children;
    var generateClassName = createGenerateClassName();
    var jss = create(jssPreset());
    // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
    // @ts-ignore: jss.options
    jss.options.insertionPoint = 'jss-insertion-point';
    jss.setup({
        // https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-dom-insertion-point
        insertionPoint: document.getElementById('jss-css-insertion-point') || undefined,
    });
    return (React.createElement(JssProvider, { jss: jss, generateClassName: generateClassName }, children));
};
//# sourceMappingURL=MaterialUICssOrderFix.js.map