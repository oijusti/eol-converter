import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

async function walkAndConvert(fsPath: string, toCRLF: boolean) {
  const stats = await fs.promises.stat(fsPath);
  
  if (stats.isFile()) {
    // Handle single file
    await convertFile(fsPath, toCRLF);
  } else if (stats.isDirectory()) {
    // Handle directory recursively
    const entries = await fs.promises.readdir(fsPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(fsPath, entry.name);
      if (entry.isDirectory()) {
        await walkAndConvert(fullPath, toCRLF);
      } else {
        await convertFile(fullPath, toCRLF);
      }
    }
  }
}

async function convertFile(filePath: string, toCRLF: boolean) {
  try {
    const content = await fs.promises.readFile(filePath, "utf8");
    const converted = toCRLF
      ? content.replace(/\r?\n/g, "\r\n")
      : content.replace(/\r\n/g, "\n");
    await fs.promises.writeFile(filePath, converted, "utf8");
  } catch (error) {
    // Skip files that can't be read as text
    console.log(`Skipped file: ${filePath} - ${error}`);
  }
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "eol-converter.convertToLF",
      async (uri: vscode.Uri) => {
        // If no URI is provided (e.g., command invoked from editor context menu)
        if (!uri && vscode.window.activeTextEditor) {
          const document = vscode.window.activeTextEditor.document;
          if (document.isDirty) {
            await document.save();
          }
          uri = document.uri;
        }

        if (!uri) {
          vscode.window.showErrorMessage("No folder or file selected.");
          return;
        }

        try {
          await walkAndConvert(uri.fsPath, false);
          vscode.window.showInformationMessage("Converted to LF");
        } catch (error) {
          vscode.window.showErrorMessage(`Failed to convert: ${error}`);
        }
      }
    ),
    vscode.commands.registerCommand(
      "eol-converter.convertToCRLF",
      async (uri: vscode.Uri) => {
        // If no URI is provided (e.g., command invoked from editor context menu)
        if (!uri && vscode.window.activeTextEditor) {
          const document = vscode.window.activeTextEditor.document;
          if (document.isDirty) {
            await document.save();
          }
          uri = document.uri;
        }

        if (!uri) {
          vscode.window.showErrorMessage("No folder or file selected.");
          return;
        }

        try {
          await walkAndConvert(uri.fsPath, true);
          vscode.window.showInformationMessage("Converted to CRLF");
        } catch (error) {
          vscode.window.showErrorMessage(`Failed to convert: ${error}`);
        }
      }
    )
  );
}

export function deactivate() {}
