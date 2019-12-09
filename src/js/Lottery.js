import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import '../css/Lottery.css'

class Lottery extends Component {

    render() {
        return (
            <Container className="Lottery">
                <Row>
                    <Col md={{span: 8, offset:2}}>
                        <div className="account">Your Account: {this.props.account}</div>
                        <ProgressBar animated label={`${this.props.numOfPlayers}/${this.props.threshold}`} 
                            now={this.props.numOfPlayers/this.props.threshold * 100} />
                        <div className="button">
                            <Button variant="outline-danger" size="lg">Bet</Button>
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