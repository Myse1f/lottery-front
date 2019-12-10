import React, {Component} from 'react';
import TruffleContract from '@truffle/contract'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import '../css/Lottery.css'

class Lottery extends Component {

    constructor(props) {
        super(props);
        this.handleBet = this.handleBet.bind(this);
        this.state = {
            numOfPlayers: 0,
            threshold: 0,
            drawing: false,
            // settleNumber: -1,
            winner: '',
        }
    }

    async componentDidMount() {

        var contract = TruffleContract({
            abi: [{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"settlementBlockNumber","type":"uint256"}],"name":"Drawing","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"}],"name":"Drawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"numOfPlayers","type":"uint256"}],"name":"Play","type":"event"},{"constant":false,"inputs":[],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"draw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSettlementBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getThreshold","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastWinner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}],
        });
        contract.setProvider(this.props.web3Provider);
        const lottery = await contract.at("0x9aF84C9465402BFC484735391e401A1f24fbF1Cd");
        const players = await lottery.getPlayers();
        const threshold = await lottery.getThreshold();
        const winner = await lottery.getLastWinner();
        const drawing = players.length === threshold.toNumber();
        this.setState({
            lottery: lottery,
            numOfPlayers: players ? players.length : 0,
            threshold: threshold.toNumber(),
            betting: false,
            drawing: drawing,
            winner: winner,
        });

        this.playerTimer = setInterval(
            async () => {
                const players = await lottery.getPlayers();
                const winner = await lottery.getLastWinner();
                if (players.length !== this.state.numOfPlayers) {
                    this.setState({
                        numOfPlayers: players.length,
                    });
                    if (players.length === this.state.threshold) {
                        this.setState({
                            drawing: true,
                        });
                    } else {
                        this.setState({
                            drawing: false,
                        })
                    }
                }
                
                if (winner !== this.state.winner) {
                    this.setState({
                        winner: winner
                    })
                }
            },
            2*1000
        )
    }

    // clear timer
    componentWillUnmount() {
        this.playerTimer && clearInterval(this.playerTimer);
    }

    async handleBet() {
        const lottery = this.state.lottery;
        try {
            this.setState({
                betting: true
            })
            const res = await lottery.play({from: this.props.account, value: 10**17});
            this.setState({
                betting: false
            })
            for (var i=0; i<res.logs.length; i++){
                switch (res.logs[i].event) {
                    case 'Play': 
                        this.setState({
                            numOfPlayers: res.logs[i].args[1].toNumber(),
                        });
                        break;
                    case 'Drawing': 
                        this.setState({
                            // settleNumber: settleNumber,
                            drawing: true,
                        });
                        break;
                    default: break;
                }
            }
        } catch (e) {
            console.log(e);
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
                            {
                                this.state.drawing 
                                ? 
                                    <Button variant="outline-danger" disabled>
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        Drawing...
                                    </Button>
                                : (
                                    this.state.betting 
                                    ?
                                        <Button variant="outline-danger" disabled>
                                            <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            />
                                            Betting...
                                        </Button>
                                    :
                                        <Button onClick={this.handleBet} variant="outline-danger" size="lg">Bet</Button>
                                ) 
                                }
                        </div>
                            {this.state.winner !== '' && <div className="winner">last winner: {this.state.winner}
                        </div>}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Lottery;