'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { spawn, exec } from 'child_process';

interface SedCommand {
    label: string;
    description: string;
    cmd: string;
    args?: Array<string>;
    output?: string;
}


function getCommandList(): [{}, vscode.QuickPickItem[]] {
    let cmdlst: Array<SedCommand> = vscode.workspace.getConfiguration('vscode-sed').get("commands");
    let obj = {};
    let items: vscode.QuickPickItem[] = [];
    cmdlst.forEach(element => {
        obj[element.label] = element;
        items.push({
            label: element.label,
            description: element.description,
        });
    });
    return [obj, items];
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sed" is now active!');



    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('sed.execute', () => {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        let text = editor.document.getText
        let fullName = path.normalize(editor.document.fileName);
        let filePath = path.dirname(fullName);
        // Pick a cmd from the list 
        let configData = getCommandList();
        let items = configData[1];
        let cmds = configData[0];
        console.log(text);

        vscode.window.showQuickPick(items).then((qpSelection) => {
            if (!qpSelection) {
                return;
            }
            let cmd: SedCommand = cmds[qpSelection.label];
            // run CMD
            var space = '\x20';
            var targetExec = 'cat' + space + fullName + space + '|' + space +
                cmd.cmd + space + cmd.args.join(space)
            vscode.window.showInformationMessage(targetExec);
            exec(targetExec, { cwd: filePath }, function (error, stdout, stderr) {
                if (stdout !== null) {
                    console.log("Writing to file");
                    let writer = 'echo' + space + "'" + stdout.toString() + "'" +
                        space + '>' + space + fullName;
                    exec(writer);
                }
                if (stderr !== null) {
                    console.log(stderr.toString());
                    if (stderr !== "") {
                        vscode.window.showErrorMessage('stderr: ' + stderr.toString());
                    }
                }
                if (error !== null) {
                    console.log('exec error: ' + error);
                    vscode.window.showErrorMessage('exec error: ' + error);
                }
            });
        });






    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}