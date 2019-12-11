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
                            <p>This Lottery Game is based on Ethereum. Contract address is <a href="https://ropsten.etherscan.io/address/0xda776c4884E062bc74eBC22069dF2627CA3D9aC1" target="_blank" rel="noopener noreferrer" className="App-link">0xda776c4884E062bc74eBC22069dF2627CA3D9aC1</a>.</p>
                            <p>
                                You need to install <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="App-link">MetaMask</a> first if you want to participate in this game. Every bet requires 0.1 ether.
                                As soon as players reach 11, we randomly choose a winner 10 blocks in the future, to get 1 ether for reward.
                            </p>
                        </Col>
                    </Row>
                </Container>
            
        );
    }
}

export default Intro;