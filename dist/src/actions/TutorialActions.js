export var TutorialActions;
(function (TutorialActions) {
    /**
     * Called when a tutorial has been completed.
     */
    TutorialActions.completed = 'tutorial.completed';
    /**
     * Can be called manually, but normally is called
     * automatically after a tutorial is completed.
     */
    TutorialActions.next = 'tutorial.next';
    /**
     * Is dispatched when the app starts.
     */
    TutorialActions.start = 'tutorial.start';
    /**
     * Is dispatched when the user wants to close the tutorial.
     */
    TutorialActions.close = 'tutorial.close';
})(TutorialActions || (TutorialActions = {}));
//# sourceMappingURL=TutorialActions.js.map