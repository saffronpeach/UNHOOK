import test from 'node:test';import assert from 'node:assert/strict';import {fallback,safeResult} from '../coach.js';
test('task phrasing selects existing task game',()=>assert.equal(fallback('I cannot start studying','bored').game,'switch'));
test('notification phrasing selects notification game',()=>assert.equal(fallback('I keep checking notifications','stressed').game,'notifications'));
test('fallback always returns allowed action',()=>assert.equal(fallback('','stressed').game,'adventure'));
test('valid schema passes',()=>assert.equal(safeResult({trigger:'x',game:'switch',insight:'a',action:'b'}).game,'switch'));
test('rejects nonexistent game',()=>assert.equal(safeResult({trigger:'x',game:'magical',insight:'a',action:'b'}),null));
