/*Problem 4

A custom Error class

4.1 Define a class named ActionError that extends the error class
    with following members:
- string member field to represent the action type
- constructor with two parameters - the message and the action type
     - it should call super and send the message
    - constructor should set the name and action type. 
*/

export class ActionError extends Error {
    actionType: string;

    constructor(message: string, actionType: string) {
        super(message); // call the Error constructor with the message
        this.name = "ActionError"; // set the error name
        this.actionType = actionType; // set the custom action type field
    }
}
