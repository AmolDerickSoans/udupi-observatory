const test = require('node:test');
const assert = require('node:assert/strict');
const {calculate} = require('../src/returns.js');
const base={price:100,entry:10,rent:1,vacancy:25,costs:2,growth:0,rentGrowth:0,years:2,exit:5};
test('Includes both purchase and sale friction, and deducts vacancy and owner costs',()=>{
  const r=calculate(base);
  assert.ok(Math.abs(r.acquisition-110)<1e-10);
  assert.equal(r.firstNetRent,7);
  assert.equal(r.totalRent,14);
  assert.equal(r.terminal,109);
  assert.ok(Math.abs(r.profit+1)<1e-10);
  assert.ok(Math.abs(r.cagr-(Math.sqrt(109/110)-1)*100)<1e-10);
});
test('Plot has no rental yield and carrying costs reduce terminal value',()=>{
  const r=calculate({...base,price:1000000,entry:0,rent:0,costs:10000,exit:0,years:3});
  assert.equal(r.terminal,970000);
  assert.equal(r.totalRent,-30000);
  assert.equal(r.grossYield,0);
  assert.equal(r.netYield,-1);
});
test('Grows collected rent, while owner cost remains fixed nominal',()=>{
  const r=calculate({...base,rent:10,vacancy:0,costs:20,rentGrowth:10,entry:0,exit:0});
  assert.equal(r.totalRent,212);
});
test('Nonpositive terminal wealth returns no annualized CAGR',()=>{
  assert.equal(calculate({...base,rent:0,costs:1000}).cagr,null);
});
test('Rejects impossible inputs and fractional holding periods',()=>{
  for(const change of [{price:0},{years:1.5},{vacancy:101},{growth:NaN},{entry:-1},{exit:31},{rent:-1}]) assert.throws(()=>calculate({...base,...change}));
});
