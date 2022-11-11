const { request } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const { setupServer } = require('../src/server');
const server = setupServer();

describe('expenses API Server', () => {
  describe('サンプルテスト', () => {
    let request;

    beforeEach(() => {
      request = chai.request(server);
    });

    it('テストケース作成時のテンプレ', async () => {
      chai.expect(1).to.equal(1);
    });

    it('テスト用getのレスポンス確認', async () => {
      const res = await request.get('/test');
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal({ test: 'Hello world' });
    });
  });
});
