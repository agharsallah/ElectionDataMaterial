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
            open: true, error: false, errorColor: false, errOpacity: false,
            SamplingArray: '[400, 450, 500, 550, 600, 650]',
            circleColorArr: '#7fc97f,#beaed4,#fdc086,#ffff99,#386cb0,#f0027f',
            opacityCircle: 0.5
        };
    }
    handleToggle() { this.setState({ open: !this.state.open }) }

    handleSamplingRadius() {// button clicked
        var arrayRadius = JSON.parse(this.state.SamplingArray)
        var circleColorArr = (this.state.circleColorArr).split(',')
        var opacityCircle = this.state.opacityCircle
        console.log(circleColorArr);
        console.log('arrayRadius.length', arrayRadius.length);
        if ((arrayRadius.length == 6) && (circleColorArr.length == 6) && (!isNaN(opacityCircle))) {
            console.log('hhh');
            arrayRadius.sort()
            this.setState({ error: false, errorColor: false, errOpacity: false });
            this.props.getSampling(arrayRadius, circleColorArr, opacityCircle)
        } else {
            console.log('errr');
            this.setState({ error: true, errorColor: true, errOpacity: true })
        }

    }
    handleChangeInput(e, val) {// input handle
        {/* console.log(val); */}
        this.setState({ SamplingArray: '[' + val + ']' });
    }
    handleChangeColor(e, val) {// color handle
       {/*  console.log('ddddddddddddddddddd');
        console.log('changecol', val); */}
        this.setState({ circleColorArr: val });
    }
    handleChangeOpacity(e, val) {
        this.setState({ opacityCircle: val });
    }
    handleCheck(e, isInputChecked) {
        console.log(e.target.value);
        {/* console.log(data, isInputChecked);*/}    
        this.props.getCheckBoxDelete({arrayToDeleteNum:e.target.value,deleteBool:isInputChecked});
    }
    handleSaveRadius(){
        (this.props.xlsSave).exportToCSV('edited vcs.xls')

    }
    render() {
        if (Array.isArray(this.state.circleColorArr)) {
            var colorArr = this.state.circleColorArr
        } else {

            var colorArr = (this.state.circleColorArr).split(',')
            console.log(colorArr[0]);
        }

        if (Array.isArray(this.state.SamplingArray)) {
            var SamplingArray = this.state.SamplingArray
        } else {

            var SamplingArray = JSON.parse(this.state.SamplingArray)
        }
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
                    <section style={{ marginLeft: '2vh' }}>
                        <h5 style={{ marginTop: '5vh', marginBottom: '2vh' }}>Please define 6 sampling radius</h5>
                        {this.state.error ?
                            <TextField
                                hintText="should have this format : 1,2,3,4,5,6"
                                defaultValue="400, 450, 500, 550, 600, 650"
                                onChange={this.handleChangeInput.bind(this)}
                                errorText='you have to enter 6 numbers seperateb by ,'
                            />
                            : <TextField
                                hintText="should have this format : 1,2,3,4,5,6"
                                defaultValue="400, 450, 500, 550, 600, 650"
                                onChange={this.handleChangeInput.bind(this)}
                            />
                        }


                        <h5 style={{ marginTop: '5vh', marginBottom: '2vh' }}>you can select 6 colors accordingly for the circle fill</h5>
                        {this.state.errorColor ?
                            <TextField
                                hintText="pick 6 colors seperated by ,"
                                defaultValue="'#7fc97f,#beaed4,#fdc086,#ffff99,#386cb0,#f0027f'"
                                onChange={this.handleChangeColor.bind(this)}
                                errorText='you have to enter 6 ddd seperateb by ,'
                            />
                            : <TextField
                                hintText="pick 6 colors seperated by ,"
                                defaultValue='#7fc97f,#beaed4,#fdc086,#ffff99,#386cb0,#f0027f'
                                onChange={this.handleChangeColor.bind(this)}
                            />
                        }
                        <h5 style={{ marginTop: '5vh', marginBottom: '2vh' }}>select the color fill opacity from 0.1 to 1</h5>
                        {this.state.errOpacity ?
                            <TextField
                                hintText="default value is 0.5"
                                defaultValue={0.5}
                                onChange={this.handleChangeOpacity.bind(this)}
                                errorText='you have to enter a number from 0.1 to 1 '
                            />
                            : <TextField
                                hintText="default value is 0.5"
                                defaultValue={0.5}
                                onChange={this.handleChangeOpacity.bind(this)}
                            />
                        }


                    </section>
                    <section>
                        <table>
                            <tr>
                                <th>Hide radius</th>
                                <th>Registered Voters</th>
                                <th>Sampling Radius (m)</th>
                                <th>color</th>
                            </tr>
                            <tr>
                                <td>
                                    <Checkbox
                                        key='0'
                                        value={0}
                                        onCheck={this.handleCheck.bind(this)}
                                    />
                                </td>
                                <td>≥1000</td>
                                <td>{SamplingArray[0]}</td>
                                <td style={{ backgroundColor: colorArr[0] }}></td>
                            </tr>
                            <tr>
                                <td>
                                    <Checkbox
                                    key='1'
                                    value={1}
                                        onCheck={this.handleCheck.bind(this)}
                                    />
                                </td>
                                <td>800-999</td>
                                <td>{SamplingArray[1]}</td>
                                <td style={{ backgroundColor: colorArr[1] }}></td>
                            </tr>
                            <tr>
                                <td>
                                    <Checkbox
                                    key='2'
                                    value={2}
                                        onCheck={this.handleCheck.bind(this)}
                                    />
                                </td>
                                <td>700-899</td>
                                <td>{SamplingArray[2]}</td>
                                <td style={{ backgroundColor: colorArr[2] }}></td>
                            </tr>
                            <tr>
                                <td>
                                    <Checkbox
                                    key='3'
                                    value={3}
                                        onCheck={this.handleCheck.bind(this)}
                                    />
                                </td>
                                <td>600-799</td>
                                <td>{SamplingArray[3]}</td>
                                <td style={{ backgroundColor: colorArr[3] }}></td>
                            </tr>
                            <tr>
                                <td>
                                    <Checkbox
                                    key='4'
                                    value={4}
                                        onCheck={this.handleCheck.bind(this)}
                                    />
                                </td>
                                <td>500-699</td>
                                <td>{SamplingArray[4]}</td>
                                <td style={{ backgroundColor: colorArr[4] }}></td>
                            </tr>
                            <tr>
                                <td>
                                    <Checkbox
                                    key='5'
                                    value={5}
                                        onCheck={this.handleCheck.bind(this)}
                                    />
                                </td>
                                <td>≤500</td>
                                <td>{SamplingArray[5]}</td>
                                <td style={{ backgroundColor: colorArr[5] }}></td>
                            </tr>
                        </table>
                    </section>
                    <div>
                    <RaisedButton
                        style={{ marginLeft: "2vh", marginTop: "2vh", zIndex: 500 }}
                        label='update Map'
                        primary={true}
                        onClick={this.handleSamplingRadius.bind(this)}
                    />
                    <RaisedButton
                        style={{ marginLeft: "2vh", marginTop: "2vh", zIndex: 500 }}
                        label='Save VCs after deletion'
                        primary={true}
                        onClick={this.handleSaveRadius.bind(this)}
                    />
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default MenuDrawerActiveReg;