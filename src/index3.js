import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let len = 0, pages = 0, records = 3;
const axios = require('axios');
var uid = '';

class Hello extends React.Component {
    constructor() {
        super();

        this.state = {

            fname: "",
            lname: "",
            email: "",
            state: "",
            city: "",
            data: [],
            city1: [],
            states1: [],
            detailData: [],
            isEditing: false,
            isAss: false,
            cstate: '',
            tpage: [],
            currentPage: ''

        }

        this.getData();
        this.getState();

        this.sendData = this.sendData.bind(this);
        this.getState = this.getState.bind(this);
        this.getCity = this.getCity.bind(this);
        this.editData = this.editData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.handlname = this.handlname.bind(this);


    }

    getInAss = () => {
        axios.get('http://localhost:5051/fetchAss').then((success) => {
            if (!success) {
                console.log("Data Not Get");
            }
            this.setState({data: success.data})

        }).catch((e) => {
            console.log("Error:", e)
        })
    }
    getInDes = () => {
        axios.get('http://localhost:5051/fetchDes').then((success) => {
            if (!success) {
                console.log("Data Not Get");
            }
            this.setState({data: success.data})
            //   console.log("Data1:",this.state.data1)
        }).catch((e) => {
            console.log("Error:", e)
        })
    }
    getData = () => {

        axios.get('http://localhost:5051/fetch').then((success) => {
            if (!success) {
                console.log("Data Not Found");
            }
            this.setState(
                {
                    data: success.data
                });

            len = this.state.data.length;
            pages = Math.ceil(len / records);
            console.log('Total Pages = ', pages);
            for (let i = 1; i <= pages; i++) {
                this.state.tpage.push(i);
            }

        }).catch((e) => {
            console.log("Error", e);
        })
    }
    getPage = (pno) => {
        axios.post(
            'http://localhost:5051/userData',
            {
                pno: pno,
                records: records
            })
            .then((res) => {

                this.setState({data: res.data})
            }).catch((e) => {
            console.log("Error", e);
        });
    }
    getState(e) {
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

        const {value, name} = e.target;
        const detailData = this.state.detailData;
        detailData[name] = value;
        this.setState({detailData}, () => {
            console.log(this.state.name);
        });


        console.log("Target", e.target.value);
        axios.post('http://localhost:5051/fetchcity', {

            state1: e.target.value,

        }).then((success) => {
            if (!success) {
                console.log("Data Not Get");
            }
            //console.log("Data",success.data);
            this.setState({city1: success.data})

        }).catch((e) => {
            console.log("Error:", e)
        });

    }
    handlname(event) {
        console.log("Event", event.target.value)
        const {value, name} = event.target;
        const detailData = this.state.detailData;
        detailData[name] = value;
        this.setState({detailData}, () => {
            console.log(this.state.name);
        });
    }
    sendData() {
        console.log("State", this.state.state1);
        axios.post(
            'http://localhost:5051/savedata',
            {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                state1: this.state.state1,
                city: this.state.city
            })
            .then((res) => {
                console.log("Response", res.data)
                this.getData();

            })
            .catch((e) => {
                console.log("Error" + e);
            });
    }
    updateData() {
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
                    isEditing: false
                })
                this.getData();
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

            })
            .catch((e) => {
                console.log("Error" + e);
            });
    }
    deleteData(eid) {
        console.log("state", uid);
        axios.post(
            'http://localhost:5051/delete',
            {
                id: uid
            })
            .then((res) => {
                console.log("Response", res.data);
                this.getData();
            })
            .catch((e) => {
                console.log("Error" + e);
            });
    }
    render() {
        const detailData = this.state.detailData;
        const isEditing = this.state.isEditing;
        const len = this.state.len;
        return (
            <div>
                <center>
                    <table border='1'>
                        <tbody>
                        <tr>
                            <td colSpan="2" align="center"
                            >User Details
                            </td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td><input type="text" name="fname" id="fname" value={detailData.fname}
                                       onChange={this.handlname} required/></td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td><input type="text" name="lname" id="lname" value={detailData.lname}
                                       onChange={this.handlname} required/></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="email" name="email" id="email" value={detailData.email}
                                       onChange={this.handlname} required/></td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>
                                <select name="state1" id="state1"
                                        onChange={this.getCity}>
                                    {isEditing ? <option defaultValue={detailData.state1}>{detailData.state1}</option> :
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
                                <select name="city" id="city" onChange={this.handlname}>
                                    {isEditing ? <option defaultValue={detailData.city}>{detailData.city}</option> :
                                        <option>--Select--</option>}

                                    {
                                        this.state.city1.map((c, i) => {
                                            return <option value={c.city}>{c.city}</option>
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr align="center">
                            <td>
                                {
                                    isEditing ? <input type="submit" value='Update' align="center" onClick={() => {
                                        this.setState({
                                                fname: document.getElementById('fname').value,
                                                lname: document.getElementById('lname').value,
                                                email: document.getElementById('email').value,
                                                state1: document.getElementById('state1').value,
                                                city: document.getElementById('city').value
                                            },
                                            () => {
                                                console.log("update");
                                                this.updateData(detailData._id);
                                            });
                                    }
                                    }/> : <input type="submit" value='Submit' align="center" onClick={() => {
                                        this.setState({
                                                fname: document.getElementById('fname').value,
                                                lname: document.getElementById('lname').value,
                                                email: document.getElementById('email').value,
                                                state1: document.getElementById('state1').value,
                                                city: document.getElementById('city').value
                                            },
                                            () => {
                                                console.log("Insert");
                                                this.sendData();
                                            });
                                    }
                                    }/>
                                }
                            </td>
                            <td>
                                <input type="reset" value="Reset" align="center" onClick={() => {
                                    document.getElementById('fname').value = '';
                                    document.getElementById('lname').value = '';
                                    document.getElementById('email').value = '';

                                }
                                }/>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <h2>User Data</h2>
                    <input type="button" value="Assending" align="center" onClick={() => {

                        this.getInAss();
                    }}
                    />
                    <table border='1'>
                        <tbody>
                        <tr>
                            <th>Fname</th>
                            <th>Lname</th>
                            <th>Email</th>
                            <th>State</th>
                            <th>City</th>
                            <th colSpan="2">Action</th>
                        </tr>
                        {

                            this.state.data.map((d, i) => {
                                if (i < 3) {
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
                                                    isEditing: true
                                                })
                                                this.editData(uid);

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

                            })
                        }
                        <tr>
                            <td colSpan="7" align="center">
                                {
                                    this.state.tpage.map((p, i) => {
                                        return <a href="#" onClick={() => {
                                            this.getPage(p);
                                        }}>{p}</a>
                                    })
                                }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <input type="button" value="Desending" align="center" onClick={() => {

                        this.getInDes();
                    }}
                    />
                </center>
            </div>
        )
    }

}

ReactDOM.render(<Hello/>, document.getElementById('root'));

