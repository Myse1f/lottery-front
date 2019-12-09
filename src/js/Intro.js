import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../css/Intro.css'

class Intro extends Component {

    render() {
        
        return (
            
                <Container className="Intro">
                    <Row>
                        <Col md={{span: 6, offset:3}}>
                            <p>This Lottery Game is based on Ethereum. Contract address is <a href="https://ropsten.etherscan.io/address/0x4B693E745eAaa995aA70c4e10F807d1a6f689A9b" className="App-link">0x4B693E745eAaa995aA70c4e10F807d1a6f689A9b</a>.</p>
                            <p>
                                You need install <a href="https://metamask.io/" class="App-link">MetaMask</a> first if you want to participate in this game. Every bet requires 0.1 ether.
                                As soon as players reach 11, we randomly choose a winner 10 blocks in the future, to get 1 ether for reward.
                            </p>
                        </Col>
                    </Row>
                </Container>
            
        );
    }
}

export default Intro;