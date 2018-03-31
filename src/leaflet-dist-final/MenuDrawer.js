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
            open: true,
            munBorder: true, govBorder: false,
        };
    }

    handleToggle() { this.setState({ open: !this.state.open }) }

    /*This func to handle what to show as border  */
    handleBorderSelection(e, isInputChecked) {
        console.log(e.target.value);
        if (e.target.value == 'munBorder') {
            this.setState({ munBorder: isInputChecked });
            this.props.getBorderSelection({ munBorder: isInputChecked, govBorder: this.state.govBorder });
        } else {
            this.setState({ govBorder: isInputChecked });
            this.props.getBorderSelection({ govBorder: isInputChecked, munBorder: this.state.munBorder });
        }
    }
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
                    <div style={{ marginTop: '5vh', marginBottom: '2vh',marginLeft:'2vh' }}>
                        <h5 className='bulletPoint fiveMarginTop' >Choose to show or hide borders</h5>
                        <Checkbox
                            value="munBorder"
                            label='Municipality border'
                            defaultChecked={true}
                            onCheck={this.handleBorderSelection.bind(this)}
                        />
                        <Checkbox
                            value="govBorder"
                            label='governrate border'
                            onCheck={this.handleBorderSelection.bind(this)}
                        />

                    </div>

                </Drawer>
            </div>
        );
    }
}

export default MenuDrawerActiveReg;