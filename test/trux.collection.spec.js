/*global describe, it, xit, before, beforeEach, after, afterEach */

import chai from 'chai';
import Trux from '../dist/trux.js';
import { startServer, stopServer, endpoints, token } from './server.js';
import sinon from 'sinon';
import fetch from 'node-fetch';

chai.expect();

global.fetch = fetch;

const test = 'Collection';
const expect = chai.expect;
const assert = chai.assert;
const data = { id: 1, name: 'rohan deshpande' };
const model = new Trux.Model(data);
let sandbox;
