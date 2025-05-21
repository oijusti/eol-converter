# EOL Converter

A Visual Studio Code extension that allows you to convert End of Line Sequence between CRLF (Windows) and LF (Unix/macOS) for files and folders via the right-click menu.

## Features

- Convert end of line sequence to LF (Line Feed, Unix/macOS style)
- Convert end of line sequence to CRLF (Carriage Return + Line Feed, Windows style)
- Works on individual files or entire folders (recursively)
- Accessible via right-click context menu in Explorer and Editor

## Usage

1. Right-click on a file or folder in the Explorer view
2. Select "Change End of Line Sequence" from the context menu
3. Choose either "LF" or "CRLF" to convert the line endings

You can also right-click in an open editor and use the same menu options.

## Why use this extension?

Different operating systems use different characters to represent the end of a line:
- Windows uses CRLF (`\r\n`)
- Unix/macOS uses LF (`\n`)

This can cause issues when working with files across different platforms or when collaborating with developers using different operating systems. This extension makes it easy to convert between these formats with a simple right-click.

## Requirements

No additional requirements or dependencies.

## Extension Settings

This extension does not add any VS Code settings.

## Known Issues

None at this time. Please report any issues on the [GitHub repository](https://github.com/oijusti/eol-converter/issues).

## Release Notes

### 0.0.3

- Initial release
- Support for converting files and folders to LF or CRLF line endings

---

## License

[MIT](LICENSE)
