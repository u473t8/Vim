import * as assert from 'assert';
import * as vscode from 'vscode';

import { BaseAction } from '../src/actions/base';
import { VimState } from '../src/state/vimState';
import { setupWorkspace, cleanUpWorkspace } from './testUtils';
import { ModeName } from '../src/mode/mode';

class TestAction1D extends BaseAction {
  keys = ['a', 'b'];
  modes = [ModeName.Normal];
}

class TestAction2D extends BaseAction {
  keys = [['a', 'b'], ['c', 'd']];
  modes = [ModeName.Normal];
}

suite('base action', () => {
  const action1D = new TestAction1D();
  const action2D = new TestAction2D();
  let vimState: VimState;

  suiteSetup(async () => {
    await setupWorkspace();
    vimState = new VimState(vscode.window.activeTextEditor!, false);
  });

  suiteTeardown(cleanUpWorkspace);

  test('couldActionApply 1D keys positive', () => {
    const result = action1D.couldActionApply(vimState, ['a']);
    assert.strictEqual(result, true);
  });

  test('couldActionApply 1D keys negative', () => {
    const result = action1D.couldActionApply(vimState, ['b']);
    assert.strictEqual(result, false);
  });

  test('couldActionApply 2D keys positive', () => {
    const result = action2D.couldActionApply(vimState, ['c']);
    assert.strictEqual(result, true);
  });

  test('couldActionApply 2D keys negative', () => {
    const result = action2D.couldActionApply(vimState, ['b']);
    assert.strictEqual(result, false);
  });

  test('doesActionApply 1D keys positive', () => {
    const result = action1D.doesActionApply(vimState, ['a', 'b']);
    assert.strictEqual(result, true);
  });

  test('doesActionApply 1D keys negative', () => {
    const result = action1D.doesActionApply(vimState, ['a', 'a']);
    assert.strictEqual(result, false);
  });

  test('doesActionApply 2D keys positive', () => {
    const result = action2D.doesActionApply(vimState, ['c', 'd']);
    assert.strictEqual(result, true);
  });

  test('doesActionApply 2D keys negative', () => {
    const result = action2D.doesActionApply(vimState, ['a', 'a']);
    assert.strictEqual(result, false);
  });
});