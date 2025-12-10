import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let fileWatcher: fs.FSWatcher | null = null;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld" is now active!');

	// Command: Hello World
	const disposableHello = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		vscode.window.showInformationMessage('Hello VS Code!');
	});

	// Command: Show current time
	const disposableTime = vscode.commands.registerCommand('helloworld.showCurrentTime', () => {
		vscode.window.showInformationMessage(`Current time: ${new Date().toLocaleTimeString()}`);
	});

	// Command: Show error message
	const disposableError = vscode.commands.registerCommand('helloworld.showError', () => {
		vscode.window.showErrorMessage('This is not  error message!');
	});

	// Auto-reload on file changes
	const outDir = path.join(context.extensionPath, 'out');
	if (!fileWatcher && fs.existsSync(outDir)) {
		fileWatcher = fs.watch(outDir, { recursive: true }, (eventType, filename) => {
			if (filename && filename.endsWith('.js')) {
				console.log(`File changed: ${filename}, reloading extension...`);
				vscode.commands.executeCommand('workbench.action.reloadWindow');
			}
		});

		context.subscriptions.push({
			dispose: () => {
				if (fileWatcher) {
					fileWatcher.close();
					fileWatcher = null;
				}
			}
		});
	}

	context.subscriptions.push(disposableHello, disposableTime, disposableError);
}

export function deactivate() { }
