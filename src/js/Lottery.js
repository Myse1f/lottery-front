import React, {Component} from 'react';
import TruffleContract from '@truffle/contract'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import '../css/Lottery.css'

class Lottery extends Component {

    constructor(props) {
        super(props);
        this.handleBet = this.handleBet.bind(this);
        this.state = {
            numOfPlayers: 0,
            threshold: 0,
        }
    }

    async componentDidMount() {
        var contract = TruffleContract({
            abi: [{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"settlementBlockNumber","type":"uint256"}],"name":"Drawing","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"}],"name":"Drawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"}],"name":"Play","type":"event"},{"constant":false,"inputs":[],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"draw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSettlementBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getThreshold","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}],
        });
        contract.setProvider(this.props.web3Provider);
        const lottery = await contract.at("0x4CAeD04F3841204e7AB110D1f1Bd5A1b60555EFc");
        const players = await lottery.getPlayers();
        const threshold = await lottery.getThreshold();
        this.setState({
            lottery: lottery,
            numOfPlayers: players ? players.length : 0,
            threshold: threshold,
        });
    }

    async handleBet() {
        const lottery = this.props.lottery;
        const res = await lottery.play({from: this.props.account, value: 10**17});
        for (var i=0; i<res.logs.length; i++){
            switch (res.logs[i].event) {
                case 'Play': 
                    
                    break;
                case 'Drawing': break;
                default: break;
            }
        }
    }

    render() {
        return (
            <Container className="Lottery">
                <Row>
                    <Col md={{span: 8, offset:2}}>
                        <div className="account">Your Account: {this.props.account}</div>
                        <ProgressBar animated label={`${this.state.numOfPlayers}/${this.state.threshold}`} 
                            now={this.state.numOfPlayers/this.state.threshold * 100} />
                        <div className="button">
                            <Button onClick={this.handleBet} variant="outline-danger" size="lg">Bet</Button>
                        </div>
                            {this.props.winner !== '' && <div className="winner">winner: {this.props.winner}
                        </div>}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Lottery;