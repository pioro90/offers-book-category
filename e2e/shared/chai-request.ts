import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

export let chaiRequest = chai.request('http://localhost:3000');