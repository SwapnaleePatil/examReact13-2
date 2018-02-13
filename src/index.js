import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Modal from 'react-modal';
import {Table, Button, Glyphicon} from 'react-bootstrap';
import {confirmAlert} from 'react-confirm-alert/src/react-confirm-alert.css'

const axios = require('axios');
var uid = '';

class Hello extends React.Component {
    constructor() {
        super();
        this.state = {

            data: [],
            city1: [],
            states1: [],
            detailData: [],
            isEditing: false,
            isAss: false,
            cstate: '',
            currentPage: '',
            currentRecord: [],
            records: 2,
            curr: 1,
            isActive: false,
            isSearch: false,
            searchArray: [],
            temp: [],
            isDactive: false

        }
        //  this.getData();
        this.getState();
        this.getCity();
        //
        this.toggleActive = this.toggleActive.bind(this);
        this.dtoggleActive = this.dtoggleActive.bind(this);
        this.sendData = this.sendData.bind(this);
        this.getState = this.getState.bind(this);
        this.getCity = this.getCity.bind(this);
        this.editData = this.editData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.handlname = this.handlname.bind(this);
        this.changeRec = this.changeRec.bind(this);
        this.clearData = this.clearData.bind(this);
        this.searchData = this.searchData.bind(this);
    }

    clearData() {
        this.state.detailData = [];
        this.state.currentRecord = [];
        // this.setState({detailData},()=>{
        //     console.log();
        // })
        console.log("DetailData", this.state.detailData)
        console.log("currentData", this.state.currentRecord)

    }

    componentDidMount() {
        this.getData();
    }

    toggleActive() {

        this.setState({
            isActive: !this.state.isActive,
            isEditing: false
        })
    }

    dtoggleActive() {

        this.setState({
            isDactive: !this.state.isDactive,
           // isEditing: false
        })
    }

    changeRec(e) {
        e.preventDefault();
        this.setState({
            records: e.target.value
        })
        console.log("Records", e.target.value);
    }

    getInAss = (e) => {
        e.preventDefault();
        // axios.get('http://localhost:5051/fetch').then((success) => {
        //     if (!success) {
        //         console.log("Data Not Get");
        //     }
        //     this.state.data.sort();
        //     this.setState({data: success.data})
        //     console.log("Data:",this.state.data)
        // }).catch((e) => {
        //     console.log("Error:", e)
        // })
        console.log("aData", e.target.id)
        const key = e.target.id;
        var myData = [].concat(this.state.data)
            .sort((a, b) => a[key] > b[key]);
        this.setState({
            data: myData
        })
        console.log('sorted : ', this.state.data);
    }
    getInDes = (e) => {
        e.preventDefault();
        // axios.get('http://localhost:5051/fetch').then((success) => {
        //     if (!success) {
        //         console.log("Data Not Get");
        //     }
        //     //this.state.data.sort();
        //     this.state.data.reverse();
        //     this.setState({data: success.data})
        //        console.log("Data1:",this.state.data)
        // }).catch((e) => {
        //     console.log("Error:", e)
        //})
        const key = e.target.id;
        var myData = [].concat(this.state.data)
            .sort((a, b) => a[key] > b[key]);
        this.setState({
            data: myData.reverse()
        })
        console.log('sorted : ', this.state.data);
    }
    getData = () => {

        console.log("RecordsIn", this.state.records);
        axios.get('http://localhost:5051/fetch').then((success) => {
            if (!success) {
                console.log("Data Not Found");
            }
            this.setState(
                {
                    data: success.data
                });

        }).catch((e) => {
            console.log("Error", e);
        })
    }
    getPage = (pno) => {
        //event.preventDefault();
        this.setState({
            curr: pno
        })
    }

    getState(e) {
        //  event.preventDefault();
        axios.get('http://localhost:5051/fetchstate').then((success) => {
            if (!success) {
                console.log("Data Not Get");
            }
            this.setState({states1: success.data})

        }).catch((e) => {
            console.log("Error:", e)
        });


    }

    getCity(e) {
        // event.preventDefault();
        axios.get('http://localhost:5051/fetchcity').then((success) => {
            if (!success) {
                console.log("Data Not Get");
            }
            this.setState({city1: success.data})

        }).catch((e) => {
            console.log("Error:", e)
        });

    }

    handlname(event) {
        // event.preventDefault();
        console.log("Event", event.target.value)
        const {value, name} = event.target;
        const detailData = this.state.detailData;
        detailData[name] = value;
        this.setState({detailData}, () => {
            // console.log(this.state.name);
        });

        console.log("Event", event.target.value)
        //   const {value1, name}=event.target;
        const currentRecord = this.state.currentRecord;
        currentRecord[name] = value;
        this.setState({currentRecord}, () => {
            console.log("CRecord", this.state.currentRecord.fname);
        });


    }

    sendData(e) {
        e.preventDefault();
        console.log("State", this.state.currentRecord);
        axios.post(
            'http://localhost:5051/savedata',
            {
                ...this.state.currentRecord
            })
            .then((res) => {
                console.log("Response", res.data)
                this.state.data.push(res.data);
                this.setState({
                    data: this.state.data,
                })
                this.clearData();
                //this.getData();
                this.toggleActive();
            })
            .catch((e) => {
                console.log("Error" + e);
            });

    }

    updateData(e) {
        e.preventDefault();
        console.log("Detail state", this.state.detailData);
        axios.post(
            'http://localhost:5051/update',
            {
                id: this.state.detailData._id,
                ...this.state.detailData
            })
            .then((res) => {
                console.log("Response", res.data)
                this.setState({
                    isEditing: false,
                    isActive: false,
                    data: this.state.data
                })
                this.clearData();

            })
            .catch((e) => {
                console.log("Error" + e);
            });

    }

    editData(uid) {
        console.log("state", uid);
        axios.post(
            'http://localhost:5051/edit',
            {
                id: uid
            })
            .then((res) => {
                console.log("Response", res.data);
                this.setState({
                    detailData: res.data[0],
                    isEditing: true
                });
                console.log("Data", this.state.detailData);
                this.getData();
            })
            .catch((e) => {
                console.log("Error" + e);
            });
    }

    deleteData(uid) {

        console.log("state", uid);
        axios.post(
            'http://localhost:5051/delete',
            {
                id: uid
            })
            .then((res) => {
                console.log("Response", res.data);
                this.state.data.pop(res.data);
                this.setState({data: this.state.data})
                this.dtoggleActive();
            })
            .catch((e) => {
                console.log("Error" + e);
            });

    }

    searchData(event) {
        console.log(event.target.value);
        this.setState({
            isSearch: true,
            searchArray: []
        });
        let {searchArray} = this.state;
        searchArray = [];
        console.log("Search Array", this.state.searchArray);
        this.state.data.map((values, index) => {
            console.log("data", values.fname);
            if (values.fname.includes(event.target.value)) {
                searchArray.push(values);
            }
            else if (values.lname.includes(event.target.value)) {
                searchArray.push(values);
            }
            else if (values.email.includes(event.target.value)) {
                searchArray.push(values);
            }

            if (event.target.value === "") {
                this.setState({
                    isSearch: false
                });
            }
        });

        this.setState({searchArray}, () => {
            console.log("searchArray", searchArray);
        });

    }

    render() {
        var tpages = [];

        var lastrec = this.state.curr * this.state.records;
        var firstrec = lastrec - this.state.records;
        var totrec = this.state.data.slice(firstrec, lastrec);
        var len = this.state.data.length;
        var pages = Math.ceil(len / this.state.records);
        console.log('Total Pages = ', pages);
        for (let i = 1; i <= pages; i++) {
            tpages.push(i);
        }
        const detailData = this.state.detailData;
        const isEditing = this.state.isEditing;
        return (
            <div>
                <center>
                    <div>

                        <button onClick={this.toggleActive}>Insert New Record</button>
                        <Modal isOpen={this.state.isActive} onRequestClose={this.toggleActive} style={{
                            Overlay: {
                                height: '70%',
                                position: 'fixed',
                                top: '20%',
                                left: '20%',
                                right: '20%',
                                bottom: '20%',
                                background: 'white'
                            },
                            content: {

                                left: '20%',
                                right: '20%',
                                bottom: '20%',
                                border: 'solid brown',
                                background: 'white',
                                overflow: 'auto',
                                borderRadius: '4px',
                                outline: 'none',
                                padding: '100px'
                            }
                        }}>
                            <form className="form-group">
                                <center>

                                    <Table>
                                        <tbody>
                                        <tr>
                                            <td colSpan="2" align="center">User Details</td>
                                        </tr>
                                        <tr>
                                            <td>First Name</td>
                                            <td><input className="form-control" type="text" name="fname" id="fname"
                                                       value={detailData.fname}
                                                       onChange={this.handlname} required={true}/></td>
                                        </tr>
                                        <tr>
                                            <td>Last Name</td>
                                            <td><input className="form-control" type="text" name="lname" id="lname"
                                                       value={detailData.lname}
                                                       onChange={this.handlname} required={true}/></td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td><input className="form-control" type="email" name="email" id="email"
                                                       value={detailData.email}
                                                       onChange={this.handlname} required={true}/></td>
                                        </tr>
                                        <tr>
                                            <td>State</td>
                                            <td>
                                                <select className="form-control" name="state1" id="state1"
                                                        onChange={this.handlname}>
                                                    {isEditing ? <option
                                                            defaultValue={detailData.state1}>{detailData.state1}</option> :
                                                        <option>--Select--</option>}

                                                    {
                                                        this.state.states1.map((s, i) => {
                                                            return <option value={s.state1}>{s.state1}</option>
                                                        })
                                                    }
                                                </select>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>city</td>
                                            <td>
                                                <select className="form-control" name="city" id="city"
                                                        onChange={this.handlname}>

                                                    {isEditing ? <option
                                                            defaultValue={detailData.city}>{detailData.city}</option> :
                                                        <option>--Select--</option>}
                                                    {
                                                        this.state.city1.map((c, i) => {
                                                            if (c.state1 === this.state.currentRecord.state1) {
                                                                console.log("city");
                                                                return <option value={c.city}>{c.city}</option>
                                                            }
                                                        })
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                        <tr align="center">
                                            <td>
                                                {
                                                    isEditing ?
                                                        <input className="form-control" type="submit" value='Update'
                                                               align="center"
                                                               onClick={this.updateData}/> :
                                                        <input className="form-control" type="submit" value='Submit'
                                                               align="center" onClick={this.sendData}
                                                        />
                                                }
                                            </td>
                                            <td>
                                                <button className="form-control" onClick={this.toggleActive}>Close
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>

                                </center>
                            </form>
                        </Modal>
                    </div>


                    <h2>User Data</h2>
                    <div>
                        <form className="form-group">
                            Search
                            <input type="text" id="txts" name="txts" onChange={(e) => {
                                this.searchData(e);
                            }}/>

                        </form>
                    </div>
                    <div>
                        Select Any Number
                        <select onChange={this.changeRec}>
                            <option>--Select--</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="container">
                        <table className="table table-striped" border='1'>

                            <thead>
                            <tr>
                                <th>Fname <a href="#" onClick={this.getInAss}>
                                    <span id="fname" className="glyphicon glyphicon-sort-by-attributes"/>
                                </a></th>
                                <th>Lname <a href="#" onClick={this.getInAss}>
                                    <span id="lname" className="glyphicon glyphicon-sort-by-attributes"/>
                                </a></th>
                                <th>Email <a href="#" onClick={this.getInAss}>
                                    <span id="email" className="glyphicon glyphicon-sort-by-attributes"/>
                                </a></th>
                                <th>State <a href="#" onClick={this.getInAss}>
                                    <span id="state1" className="glyphicon glyphicon-sort-by-attributes"/>
                                </a></th>
                                <th>City <a href="#" onClick={this.getInAss}>
                                    <span id="city" className="glyphicon glyphicon-sort-by-attributes"/>
                                </a></th>
                                <th colSpan="2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.isSearch ? this.state.searchArray.map((d, i) => {
                                        if (i < this.state.records) {
                                            return <tr>
                                                <td>{d.fname}</td>
                                                <td>{d.lname}</td>
                                                <td>{d.email}</td>
                                                <td>{d.state1}</td>
                                                <td>{d.city}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        uid = d._id;
                                                        this.setState({
                                                            isEditing: true,
                                                            isActive: true,
                                                            detailData: d
                                                        })
                                                    }}>Edit
                                                    </button>
                                                </td>
                                                <th>
                                                    <button onClick={() => {
                                                        uid = d._id
                                                        console.log("uid", uid);
                                                        this.deleteData(uid);
                                                    }}>Delete
                                                    </button>
                                                </th>
                                            </tr>
                                        }
                                    }) :
                                    totrec.map((d, i) => {
                                        if (i < this.state.records) {
                                            return <tr>
                                                <td>{d.fname}</td>
                                                <td>{d.lname}</td>
                                                <td>{d.email}</td>
                                                <td>{d.state1}</td>
                                                <td>{d.city}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        uid = d._id;
                                                        this.setState({
                                                            isEditing: true,
                                                            isActive: true,
                                                            detailData: d
                                                        })
                                                    }}>Edit
                                                    </button>
                                                </td>
                                                <th>
                                                    <Glyphicon glyph="glyphicon glyphicon-remove"
                                                               onClick={this.dtoggleActive}/>

                                                    <Modal isOpen={this.state.isDactive} ariaHideApp={false} style={{

                                                        Overlay: {
                                                            height: '50%',
                                                            position: 'fixed',
                                                            top: '25px',
                                                            left: '30%',
                                                            right: '100px',
                                                            bottom: '20px',
                                                            background: 'white'
                                                        },
                                                        content: {
                                                            top: '20%',
                                                            left: '30%',
                                                            right: '30%',
                                                            bottom: '30%',
                                                            border: 'solid brown',
                                                            background: 'white',
                                                            overflow: 'auto',
                                                            borderRadius: '4px',
                                                            outline: 'none',
                                                            padding: '100px'
                                                        }
                                                    }}>
                                                        <div>
                                                            <Table>
                                                                <h2>Are you sure, you want to delete</h2>
                                                                <button onClick={() => {
                                                                    uid = d._id
                                                                    console.log("uid", uid);
                                                                    this.deleteData(uid);
                                                                }}>Delete
                                                                </button>
                                                                <Button bsStyle="danger" onClick={this.dtoggleActive}>Cancel</Button>
                                                            </Table>
                                                        </div>
                                                    </Modal>

                                                </th>
                                            </tr>
                                        }
                                    })
                            }
                            </tbody>
                            <thead>
                            <tr>
                                <th>Fname <a href="#" onClick={this.getInDes}>
                                    <span id="fname" className="glyphicon glyphicon-sort-by-attributes-alt"/>
                                </a></th>
                                <th>Lname <a href="#" onClick={this.getInDes}>
                                    <span id="lname" className="glyphicon glyphicon-sort-by-attributes-alt"/>
                                </a></th>
                                <th>Email <a href="#" onClick={this.getInDes}>
                                    <span id="email" className="glyphicon glyphicon-sort-by-attributes-alt"/>
                                </a></th>
                                <th>State <a href="#" onClick={this.getInDes}>
                                    <span id="state1" className="glyphicon glyphicon-sort-by-attributes-alt"/>
                                </a></th>
                                <th>City <a href="#" onClick={this.getInDes}>
                                    <span id="city" className="glyphicon glyphicon-sort-by-attributes-alt"/>
                                </a></th>
                                <th colSpan="2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan="7" align="center">
                                    {
                                        tpages.map((p, i) => {
                                            return <a href="#" onClick={() => {
                                                this.getPage(p);
                                            }}>{p}</a>
                                        })
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </center>

            </div>
        )
    }

}

ReactDOM.render(<Hello/>, document.getElementById('root'));

