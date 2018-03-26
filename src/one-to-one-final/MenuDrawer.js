import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import InputRange from 'react-input-range';
import Checkbox from 'material-ui/Checkbox';

class MenuDrawerActiveReg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    handleToggle() { this.setState({ open: !this.state.open }) }

    render() {

        return (
            <div>
                <RaisedButton
                    style={{ position: "absolute", left: "2vh", top: "50vh", zIndex: 500 }}
                    label='open'
                    primary={true}
                    onClick={this.handleToggle.bind(this)}
                />
                <Drawer width={"25%"}
                    open={this.state.open}
                    openSecondary={false}
                    containerStyle={{ top: "0vh", height: "100%", zIndex: "1001", position: "absolute" }}
                    onRequestChange={(open) => this.setState({ open })}
                    zDepth={2}
                >
                    <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleToggle.bind(this)} />
                   
                    
                </Drawer>
            </div>
        );
    }
}

export default MenuDrawerActiveReg;