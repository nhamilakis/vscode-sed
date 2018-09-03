# SED : A stream editor for vscode

This is the README "vs-code sed", vscode-sed allows you to edit the
current file using a custom command.

## Features

You can add custom commands in your `settings.json` by adding :

``` json
"vscode-sed.commands": [
        {
            "label": "sed",
            "description": "Replace Hello By Hi",
            "cmd": "sed",
            "args": [
                "'s/Hello/Hi/'"
            ]
        }
    ]
```

## Keybings & Command

To run sed just write sed:execute or by the shortcut `ctrl+K P` for
linux and `cmd+K P` for mac.

## Requirements

The first version works only only linux & mac. Windows is not supported
(will be added in the future).

## Release Notes

Users appreciate release notes as you update your extension.

### 0.1.0

Initial release of sed
