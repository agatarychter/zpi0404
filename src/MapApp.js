import React, { Component } from "react";
import ReactDOM from "react-dom"
import Map from './MapManager';
import {Nav, Navbar} from "react-bootstrap";
import './App.css'

const axios = require('axios')

const fullscreenControlStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

const navStyle = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'
};


class MapApp extends Component {

    // initialize our state
    state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
        langlat: null,
        categoryToAdd: null,
        checked: []
    };


    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.filterGroup = React.createRef();
        console.log("o chuj")
        this.state.checked = ["zabawki", "jedzenie"]
    }

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 100000);
            this.setState({ intervalIsSet: interval });
        }
            // this.myRef.current.capture().then((uri)=>{
            //     console.log("Sraka: "+ uri)
            // })
        var filters = this.filterGroup.current;
        console.log("Dupa: " + filters)
        this.state.checked.forEach(value => console.log("&&&&&&&&&& po: " + value))
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }

    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
        fetch("https://backendzpipwr.herokuapp.com/users")
            .then(data => data.json())
            .then(res => {console.log(res); this.setState({ data: res })});
        console.log("Fetched");
    };





    // our put method that uses our backend api
    // to create new query into our data base
    putDataToDB = message => {
        console.log("Insert");
        console.log(message);

        axios.post("http://localhost:3001/addOffer", {
            langlat: 12312
            ,message: "kakababa"
        }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {
                console.log(`statusCode: ${res.message}`)
            })
            .catch((error) => {
                console.error(error)
            })
        // let currentIds = this.state.data.map(data => data.id);
        // let idToBeAdded = 0;
        // while (currentIds.includes(idToBeAdded)) {
        //     ++idToBeAdded;
        // }
        //
        // axios.post("http://localhost:3001/api/putData", {
        //     id: idToBeAdded,s
        //     message: message


        // });
    };


    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = idTodelete => {
        console.log("Deleted");
        //
        // let objIdToDelete = null;
        // this.state.data.forEach(dat => {
        //     if (dat.id == idTodelete) {
        //         objIdToDelete = dat._id;
        //     }
        // });
        //
        // axios.delete("http://localhost:3001/api/deleteData", {
        //     data: {
        //         id: objIdToDelete
        //     }
        // });
    };


    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
        console.log("Update");
        //
        // let objIdToUpdate = null;
        // this.state.data.forEach(dat => {
        //     if (dat.id == idToUpdate) {
        //         objIdToUpdate = dat._id;
        //     }
        // });
        //
        // axios.post("http://localhost:3001/api/updateData", {
        //     id: objIdToUpdate,
        //     update: { message: updateToApply }
        // });
    };

    addToDatabase(){
        console.log("Langlat: " + this.state.langlat)
        console.log("Cat: " + this.state.categoryToAdd)
    }

    change(){
        var divElement = this.refs.kontent;
        var checkBoxes = divElement.children;
        var listOfValues = [];
        for (var i=0; i<checkBoxes.length; i++){
            var input = checkBoxes[i].children[0];
            console.log("dziecko ----- " + input)
            var isChecked = input.checked;
            if (isChecked){
                listOfValues.push(checkBoxes[i].innerText)
            }
        }
        listOfValues.forEach(val => console.log("^^^^^^ " + val))
        this.state.checked = listOfValues;
        this.state.checked.forEach(value => console.log("haha: " + value))
        this.forceUpdate();
    }


    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
        const { data } = this.state;
        const vals = this.state.data.length <= 0 ? [[]] : this.state.data;
        if (vals.length != 0){
            console.log("Juz : " + vals.length)
        }

        return (
            <div className="LoginButton">
                <head>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <meta name="description" content=""/>
                    <meta name="author" content=""/>
                    <meta name='google-signin-client_id'
                          content='545384910825-14gu3jrktnjfcjrntbv4t3akclpk2hn2.apps.googleusercontent.com'/>
                    <title>Hello right here</title>
                    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"
                          type="text/css"/>
                    <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700"
                          rel="stylesheet"/>
                    <link
                        href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic'
                        rel='stylesheet' type='text/css'/>
                    <link
                        href='mapstylesheet.css'
                        rel='stylesheet' type='text/css'/>
                    <link href="vendor/magnific-popup/magnific-popup.css" rel="stylesheet"/>

                    <link href="css/creative.min.css" rel="stylesheet"/>
                </head>
                <body id="page-top">

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Charytatywni.pl</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <Nav.Link to="/" classname="nav-link js-scroll-trigger">Strona główna</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <header className="mapHeader">
                    <div>
                        {/*<div className="container_login" style="margin-top: 10%">*/}
                        <div>
                                {
                                    this.state.data.length <= 0
                                        ? ""
                                        :

                                                <div>
                                                    <div id={"popup"} style={{
                                                        color: "red",
                                                        zIndex: 9999,
                                                        fontSize: '2em'
                                                    }}>
                                                        {/*<form id={"addOfferForm"} action={"/saveNewOffer"} method={"get"}>*/}

                                                            {/*<input type="text"*/}
                                                                   {/*id={"textInput"}*/}
                                                                   {/*style={{ width: "200px" }}*/}
                                                                   {/*onChange={e => this.setState({ langlat: e.target.value })}*/}
                                                            {/*/>*/}
                                                            {/*<input type={"text"} id={"categoryInput"}/>*/}
                                                            {/*<select name={"category"} id={"categoryInput"}*/}
                                                                    {/*onChange={e => this.setState({ categoryToAdd: e.target.value})}>*/}
                                                                {/*<option value={"food"}>Jedzenie</option>*/}
                                                                {/*<option value={"toys"}>Zabawki</option>*/}
                                                            {/*</select>*/}
                                                            {/*<input type={"submit"}*/}
                                                                   {/*onClick={() =>*/}
                                                                       {/*this.putDataToDB(this.state.langlat, this.state.categoryToAdd)*/}
                                                                   {/*}*/}
                                                                   {/*value={"Wyslij"}*/}
                                                            {/*/>*/}
                                                        {/*</form>*/}
                                                    </div>
                                                    {/*<span>{loc.Latitude}, {loc.Longitude}, {loc.Description}</span>*/}
                                                    <div className={"mapContainer"}>
                                                        <div id={"optionsMap"}>
                                                            <div className={"dropdown"}>
                                                                <div id={"optionsMapHeader"}>
                                                                    Filtruj:
                                                                </div>
                                                                <div className="dropdown-content" ref={"kontent"} onChange={event => {
                                                                this.change()}
                                                                }>
                                                                    <div>
                                                                        <input type={"text"} id={"searchOffers"} />
                                                                    </div>
                                                                    <div><input type='checkbox'
                                                                                className='filter'
                                                                                name='filter' id='food'
                                                                                value='food'/><label
                                                                        htmlFor='food'>jedzenie</label></div>
                                                                    <div><input type='checkbox'
                                                                                className='filter'
                                                                                name='filter' id='toys'
                                                                                value='toys'/><label
                                                                        htmlFor='toys'>zabawki</label></div>
                                                                    <div><input type='checkbox'
                                                                                className='filter'
                                                                                name='filter' id='bar'
                                                                                value='bar'/><label
                                                                        htmlFor='bar'>bar</label></div>
                                                                    {/*<nav id='filter-group'*/}
                                                                         {/*className='filter-group'*/}
                                                                         {/*onChange={console.log("SIE ZMIENILO XD")}*/}
                                                                        {/*>*/}
                                                                        {/*<input type="checkbox" id="poi-theatre" />*/}
                                                                        {/*<label htmlFor="poi-theatre">theatre</label>*/}
                                                                        {/*<input type="checkbox" id="poi-theatre2" />*/}
                                                                        {/*<label htmlFor="poi-theatre2">dwo</label>*/}
                                                                    {/*</nav>*/}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*<div className="dropdown">*/}
                                                            {/*<span>Mouse over me</span>*/}
                                                            {/*<div className="dropdown-content">*/}
                                                                {/*<p>Hello World!</p>*/}
                                                            {/*</div>*/}
                                                        {/*</div>*/}
                                                        <div>
                                                            {console.log("Kalarepka: " + this.state.checked)}
                                                            <Map id={"mojaMapa"} ref={this.myRef} locations={data} checked={this.state.checked}/>
                                                        </div>
                                                    </div>
                                                </div>

                                        // data.map(loc => (
                                        //     <li>
                                        //         <div id={"popup"} style={{
                                        //             color: "red",
                                        //             zIndex: 9999,
                                        //             fontSize: '2em'
                                        //         }}>Hello there</div>
                                        //         {/*<span>{loc.Latitude}, {loc.Longitude}, {loc.Description}</span>*/}
                                        //         <Map locations={data}/>
                                        //     </li>
                                        // ))
                                    // data.map(dat => (
                                    //     <li style={{ padding: "10px" }} key={data.message}>
                                    //         <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                                    //         <span style={{ color: "gray" }}> data: </span>
                                    //         {dat.message}
                                    //     </li>
                                    // ));
                                }
                            {/*<div style={{ padding: "10px" }}>*/}
                                {/*<input*/}
                                    {/*type="text"*/}
                                    {/*onChange={e => this.setState({ message: e.target.value })}*/}
                                    {/*placeholder="add something in the database"*/}
                                    {/*style={{ width: "200px" }}*/}
                                {/*/>*/}

                                {/*<button onClick={() => this.putDataToDB(this.state.message)}>*/}
                                    {/*ADD*/}
                                {/*</button>*/}
                            {/*</div>*/}
                            {/*<div style={{ padding: "10px" }}>*/}
                                {/*<input*/}
                                    {/*type="text"*/}
                                    {/*style={{ width: "200px" }}*/}
                                    {/*onChange={e => this.setState({ idToDelete: e.target.value })}*/}
                                    {/*placeholder="put id of item to delete here"*/}
                                {/*/>*/}
                                {/*onClick={() => this.deleteFromDB(this.state.idToDelete)}*/}
                                {/*<button >*/}
                                    {/*Wyślij*/}
                                {/*</button>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                                {/*{this.state.data.length <= 0 ? <Map locations={this.state.data}/> : <div id={"testerid"}>Ahaa</div>}*/}
                            {/*</div>*/}
                            <div style={{ padding: "10px" }}>
                                {/*<input*/}
                                    {/*type="text"*/}
                                    {/*style={{ width: "200px" }}*/}
                                    {/*onChange={e => this.setState({ idToUpdate: e.target.value })}*/}
                                    {/*placeholder="id of item to update here"*/}
                                {/*/>*/}
                                {/*<input*/}
                                    {/*type="text"*/}
                                    {/*style={{ width: "200px" }}*/}
                                    {/*onChange={e => this.setState({ updateToApply: e.target.value })}*/}
                                    {/*placeholder="put new value of the item here"*/}
                                {/*/>*/}
                                {/*<input type={"submit"}*/}
                                       {/*onClick={() =>*/}
                                           {/*this.updateDB(this.state.idToUpdate, this.state.updateToApply)*/}
                                       {/*}*/}
                                       {/*value={"Wyslij"}*/}
                                       {/*/>*/}
                                {/*<button*/}
                                    {/*onClick={() =>*/}
                                        {/*this.updateDB(this.state.idToUpdate, this.state.updateToApply)*/}
                                    {/*}*/}
                                {/*>*/}
                                    {/*UPDATE*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    </div>
                </header>
                <footer className="footerMap">
                    <div className="container">
                        <div className="small text-center text-muted">Copyright &copy; 2019 - Start Bootstrap oraz super
                            programistka frontu Ewa Łyko
                        </div>
                    </div>
                </footer>
                </body>
            </div>

        );
    }
}

export default MapApp;