import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sample,decodeBackup,toCSV,getAlerts} from './model.ts';
test('backup round-trip preserves inventory',()=>assert.deepEqual(decodeBackup(JSON.stringify({version:1,servers:sample})),sample));
test('malformed, duplicate and out-of-range records are rejected',()=>{for(const value of [null,{},[sample[0],sample[0]],[{...sample[0],cpu:101}],[{...sample[0],status:'Made up'}]])assert.throws(()=>decodeBackup(JSON.stringify(value)));});
test('empty inventory is a valid backup',()=>assert.deepEqual(decodeBackup('[]'),[]));
test('CSV quotes embedded commas and mitigates spreadsheet formula injection',()=>{const csv=toCSV([{...sample[0],name:'=1+1',notes:'hello, "world"'}]);assert.ok(csv.includes('"\'=1+1"'));assert.ok(csv.includes('"hello, ""world"""'));});
test('alerts include unavailable hosts and high memory; unmonitored excluded',()=>{assert.equal(getAlerts(sample).length,2);assert.equal(getAlerts([{...sample[0],status:'Unmonitored',memory:99}]).length,0);});
