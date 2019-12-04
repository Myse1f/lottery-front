const helper = require("./helper/test_helper");
const LotteryGame = artifacts.require('LotteryGame');

contract('LotteryGame', (accounts) => {
    it('should have 1 Ether at the first deploy', async () => {
        const lottery = await LotteryGame.deployed();
        var balance = await web3.eth.getBalance(lottery.address);
        balance = await web3.utils.fromWei(balance, 'ether');
        assert.equal(balance.valueOf(), 1, "1 ehter wasn't at the first deploy");
    });

    it('play without 0.1 ehter should fail', async () => {
        const lottery = await LotteryGame.deployed();
        try {
            await lottery.play({value: 10});
            assert.fail('play without 0.1 ether should fail');
        } catch (err) {
            //console.log(err);
        };
    });

    it('play should add 0.1 ether to contract', async () => {
        const lottery = await LotteryGame.deployed();
        const balanceBefore = await web3.eth.getBalance(lottery.address);
        await lottery.play({value: 10**17});
        const balanceAfter = await web3.eth.getBalance(lottery.address);
        assert.equal(balanceAfter.valueOf() - balanceBefore.valueOf(), 10**17, "0.1 ether wasn't add to contract after play");
    });

    it('draw without contract owner should fail', async () => {
        const lottery = await LotteryGame.deployed();
        try {
            await lottery.draw({from: accounts[1]});
            assert.fail('draw without contract owner should fail');
        } catch (err) {
            //console.log(err);
        };
    });

    it('draw with less than 11 people should fail', async () => {
        const lottery = await LotteryGame.deployed();
        try {
            await lottery.draw();
            assert.fail('draw with less than 11 people should fail');
        } catch (err) {
            //console.log(err);
        };
    });

    it('draw before settlement block should fail', async () => {
        const lottery = await LotteryGame.deployed();
        for (var i=0; i<10; i++) { // one player has participated in during test above
            await lottery.play({from: accounts[i % 10], value: 10**17});
        }
        try {
            await lottery.draw();
            assert.fail('draw before settlement block should fail');
        } catch (err) {
            //console.log(err);
        }
    });

    it('play with more than 11 people should fail', async () => {
        const lottery = await LotteryGame.deployed();
        try {
            await lottery.play({value: 10**17});
            assert.fail('play with more than 11 people should fail');
        } catch (err) {
            //console.log(err);
        };
    });

    it('draw after 11 people participate', async () => {
        const lottery = await LotteryGame.deployed();
        await helper.advanceBlock();await helper.advanceBlock();await helper.advanceBlock();await helper.advanceBlock();
        await helper.advanceBlock();await helper.advanceBlock();await helper.advanceBlock();await helper.advanceBlock();
        await helper.advanceBlock();await helper.advanceBlock();await helper.advanceBlock();await helper.advanceBlock();
        const result = await lottery.draw();
        assert.notEqual(result.logs[0].args['winner'], '', 'winner should not be empty');
    });

    it('kill from non-owner should fail', async () => {
        const lottery = await LotteryGame.deployed();
        try {
            await lottery.kill({from: accounts[1]});
            assert.fail('kill from non-owner should fail');
        } catch (err) {
            //console.log(err);
        };
        try {
            await lottery.kill();
        } catch (err) {
            assert.fail('kill from owner should make')
        }
    });

});