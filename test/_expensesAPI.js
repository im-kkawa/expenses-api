const { request } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

// npm run seedを実行するため
const { execSync } = require('child_process');
let defaultData = require('./_defaultData.json');
let postTestData1 = require('./_postTestData1.json');
let postTestData2 = require('./_postTestData2.json');
let deleteTestData = require('./_deleteTestData.json');

const { setupServer } = require('../src/server');
const server = setupServer();

describe('expenses API Server', () => {
  describe('サンプルテスト', () => {
    let request;
    let stdout;

    beforeEach(() => {
      request = chai.request(server);
    });

    it('テストケース作成時のテンプレ', async () => {
      chai.expect(1).to.equal(1);
    });

    it('[get][/test]テスト用getのレスポンス確認', async () => {
      const res = await request.get('/test');
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal({ test: 'Hello world' });
    });
  });

  describe('getテスト', () => {
    let request;

    beforeEach(() => {
      request = chai.request(server);
    });

    it('[get][/expenses]家計簿の全てのデータを取得', async () => {
      const res = await request.get('/expenses');
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(defaultData);
    });

    it('[get][/expenses]家計簿の全てのデータを取得 by ID', async () => {
      const testID = 3;
      const expected = defaultData.filter((eachData) => eachData.id === testID);

      const res = await request.get('/expenses').query({ id: testID });
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });

  describe('postテスト', () => {
    let request;

    beforeEach(() => {
      request = chai.request(server);
    });

    afterEach(async () => {
      await execSync('npm run seed');
      // stdout = await execSync('npm run seed');
      // console.log(`stdout: ${stdout.toString()}`);
      // defaultData = require('./_defaultData.json');
    });

    it('[post][/expenses]家計簿の登録', async () => {
      // chai.expect(1).to.equal(1);
      let postData = {
        date: '20221105',
        category: '水道光熱費',
        note: '10月分水道代',
        deposit: 0,
        withdrawal: 2000,
      };

      const res = await request.post('/expenses').send(postData);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(postTestData1);
    });

    it('[post][/expenses]家計簿の登録（noteが空欄）', async () => {
      let postData = {
        date: '20221105',
        category: '水道光熱費',
        note: '',
        deposit: 0,
        withdrawal: 2000,
      };

      const res = await request.post('/expenses').send(postData);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(postTestData2);
    });
  });

  describe('deleteテスト', () => {
    let request;

    beforeEach(() => {
      request = chai.request(server);
    });

    afterEach(async () => {
      await execSync('npm run seed');
    });

    it('[delete][/expenses]家計簿の削除', async () => {
      const testID = 3;
      const res = await request.delete('/expenses').query({ id: testID });
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(testID);
    });
  });
});
