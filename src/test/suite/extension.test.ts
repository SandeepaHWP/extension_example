import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  test('Extension should activate and Hello World command should run', async () => {
    const extension = vscode.extensions.getExtension('sandeepa.helloworld');
    await extension?.activate();

    assert.ok(extension?.isActive, 'Extension should be active');

    await vscode.commands.executeCommand('helloworld.helloWorld');

    assert.ok(true, 'Command executed');
  });
});
