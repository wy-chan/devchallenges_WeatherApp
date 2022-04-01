//Data
const APIurl = "https://www.metaweather.com/api/location/";
const APIsearchName="search/?query=";///"api/location/search/?query=(query)"
const APIsearchLL="search/?lattlong=";//"/api/location/search/?lattlong=(latt),(long)"
const CORSanywhere = "https://secret-waters-93419.herokuapp.com/";//clone cors-anywhere CORS proxy

//Get Date
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const getThisWeek = (day) => week[day];
const getThisMonth = (month) => Month[month];
const getThisDate = (date) => (getThisWeek(date.getDay())+", "+date.getDate()+" "+getThisMonth(date.getMonth()));
const today = new Date();
const days = getTheDays(today);

function getTheDays(today){
  let days = [];
  for(var i=0; i<7; i++){
    days.push(new Date(today));
    today.setDate(today.getDate() +1);
  }
  return days;
}

function getImage(state){
return "images/"+state.replace(/\s/g, '')+".png"
}


class MyApp extends React.Component{
    constructor(props){
      super(props);
      this.state={
          location:"",
          woeid:"",
          lattlong: "",
          NavSearch: false,
          data:{},
          unit: "C",
          recentSearch:["London", "Barcelona", "Long Beach"],
          input:"",
          submit:"",
    };
    this.showSearch=this.showSearch.bind(this);
    this.closeSearch=this.closeSearch.bind(this);
    this.searchLocationName=this.searchLocationName.bind(this);
    this.getLocationData=this.getLocationData.bind(this);
    this.changeUnit=this.changeUnit.bind(this);
    this.getLocation=this.getLocation.bind(this);
    this.changeLocation=this.changeLocation.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.checkLocationText=this.checkLocationText.bind(this);
    this.handleRecentSearch=this.handleRecentSearch.bind(this);
  }


componentDidMount() {
  this.getLocation();
}

//Get user location(latitude+longitude) - HTML5 Geolocation API 
getLocation() {  
  if("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(position=>{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    this.setState({
      lattlong: latitude+","+longitude,
    })
    console.log(this.state.lattlong);
    this.searchLocationLL(this.state.lattlong);
  });
  }else{
    console.log("Geolocation is not supported in your browser.");
    alert("Geolocation is not supported in your browser.");
  }
}  

searchLocationLL(lattlong){
 fetch(CORSanywhere + APIurl + APIsearchLL + lattlong)
 .then((res) => res.json())
  .then((json) => {
    this.setState({
      woeid: json[0].woeid,
      location: json[0].title,
      data:{},
    })
    this.getLocationData(this.state.woeid);
    this.handleRecentSearch(json[0].title);
  })
  .catch(error=>{
    log('Request failed', error)
  });
}

searchLocationName(location){
  fetch(CORSanywhere + APIurl + APIsearchName + location)
  .then((res) => res.json())
  .then((json) => {
    this.setState({
      woeid: json[0].woeid,
      location: json[0].title,
    })
    this.getLocationData(this.state.woeid);
  })
  .catch(error=>{
    log('Request failed', error)
  });
}

getLocationData(woeid){
  fetch(CORSanywhere + APIurl + woeid)
  .then((res) => res.json())
  .then((json) => {
    this.setState({
      data: json
    })
    console.log(this.state.data)
  })
  .catch(error=>{
    log('Request failed', error)
  });
}

changeLocation(event){
  this.setState({
    location: event.target.id.substring(1),
    data: {},
  });
  this.searchLocationName(event.target.id.substring(1));
  this.handleRecentSearch(event.target.id.substring(1));
  this.closeSearch();
}

handleChange(event){
this.setState({
  input: event.target.value,
})
}

checkLocationText(text){
  fetch(CORSanywhere + APIurl + APIsearchName + text)
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    (json[0] == null)?  
    alert("Location" +' "' +text +'" '+ "is not found."): 
    this.searchLocationName(json[0].title);
    this.handleRecentSearch(json[0].title);
  })
}

handleSubmit(event){
event.preventDefault();
this.setState({
  submit: this.state.input,
  input:"",
  data:{},
  location:"",
})
console.log(this.state.input);
this.checkLocationText(this.state.input);
this.closeSearch();
}

handleRecentSearch(location){
let newList = this.state.recentSearch;
let index = newList.indexOf(location);
(index != -1)? newList.splice(index, 1):
(newList.length >=5)? newList.pop()://max 5 items on the recent search list
null;
newList.unshift(location);
}

changeUnit(event){
  this.setState({
    unit: event.target.id
  })
}

showSearch(){
    this.setState({
        NavSearch: true,
    })
}
closeSearch(){
    this.setState({
        NavSearch: false,
    })
}

render(){
    const NavPage = (this.state.NavSearch)? 
                    <NavSearch 
                    closeSearch={this.closeSearch}
                    recentSearch={this.state.recentSearch}
                    changeLocation={this.changeLocation}
                    input={this.state.input}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    />:
                    <NavContent 
                    showSearch={this.showSearch}
                    location={this.state.location}
                    data={this.state.data}
                    unit={this.state.unit}
                    getLocation={this.getLocation}
                    />;
    return(
    <div id="myApp-box">
       <nav id="nav-bar">
            {NavPage}
       </nav>
       <Main
       data={this.state.data}
       unit={this.state.unit}
       changeUnit={this.changeUnit}
       />
    </div>
    )
}
}

class NavContent extends React.Component{
    constructor(props){
      super(props);
    };
    render(){
        const weather = this.props.data["consolidated_weather"];
        const temp = (!weather)? "-":weather[0]["the_temp"];
        const state = (!weather)? "...":weather[0]["weather_state_name"];
        const stateImg = (!weather)?
                          <div className="nav-img-div">
                          <div className="load-circle load-circle-anim"></div>
                          <p className="loading-text">Loading</p>
                          </div>:        
                          <div className="nav-img-div">
                          <img id="nav-img" src={getImage(weather[0]["weather_state_name"])} />
                          </div>;
        const unit = (this.props.unit == "C")? "C":"F";
        const calcData = (data) => (!weather)?
                                   "-":
                                   (this.props.unit == "C")? 
                                   Number(data).toFixed(): 
                                   (data*1.8+32).toFixed();

        return(
         <div id="nav-bar-content">
            <div id="nav-top-btns"> 
            <button className="search-btn nav-btn top-btn" onClick={this.props.showSearch}>Seach for places</button>
            <button className="place-btn nav-btn top-btn" onClick={this.props.getLocation}>
            <span className="material-icons gps-icon">
                gps_fixed
            </span>
            </button>
        </div>
        {stateImg}
         <p id="nav-temp"><em>{calcData(temp)}</em>°{unit}</p>
        <p id="nav-desc">{state}</p>
        <div>
        <p id="nav-date">Today&nbsp;&nbsp;•&nbsp;&nbsp;{getThisDate(days[0])}</p>
        <p id="nav-place">
          <span className="material-icons place-icon">
          place
          </span>
         {this.props.location}
        </p>
        </div>
        </div>
        ) 
    }
}

class NavSearch extends React.Component{
    constructor(props){
      super(props);
    };
    render(){
        //const recentList = this.props.recentSearch.map((item,index) => <Recent location={item} index={index}/>);
        return(
            <div id="nav-search-panel">
            <button className="close-btn" onClick={this.props.closeSearch}>
              <span className="material-icons-outlined close-icon">
              close
              </span>
            </button>
          <form className="input-box-bar" onSubmit={this.props.handleSubmit}>
          <div className="input-box">
            <input placeholder="search location" type="text" className="input" value={this.props.input} onChange={this.props.handleChange}/>
            <span className="material-icons search-icon">
              search
              </span>
          </div>
          <button className="search-btn search-btn-s" type="submit">Search</button>
          </form>
          <RecentList recentSearch={this.props.recentSearch} changeLocation={this.props.changeLocation}/>
          </div>
        ) 
    }
}

class RecentList extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
    return(
      <ul className="recent-list">

        {this.props.recentSearch.map(
          (item, index) =>
          <li key={index}>
          <button className="nav-recent-btn" onClick={this.props.changeLocation} id={index+item}>{item}
          <span className="material-icons right-icon">
            chevron_right
          </span>
          </button>
        </li>
        )
        }

      </ul>
    )}
};

class Main extends React.Component{
    constructor(props){
      super(props);
    };
    render(){
      const weather = this.props.data["consolidated_weather"];
      const stateImg = (DayNum) => (!weather)? null:getImage(weather[DayNum]["weather_state_name"]);
      const getData = (DayNum, type, decimal) => (!weather)? "-": weather[DayNum][type].toFixed(decimal);
      const getDataText = (DayNum, type) => (!weather)? "-":weather[DayNum][type];
      const windIconStyle = (!weather)? {transform: "rotate(0deg)"}:{transform: "rotate("+weather[0]["wind_direction"].toString()+"deg)"};
      const cfBtnClass = (unit) => (this.props.unit == unit)?"cf-btn cf-btn-active top-btn":"cf-btn top-btn";
      const humidFill = getData(0, "humidity", 0)+"%";

        return(
            <main>

            <div id="unit-box">
              <button className={cfBtnClass("C")} id="C" onClick={this.props.changeUnit}>°C</button>
              <button className={cfBtnClass("F")} id="F" onClick={this.props.changeUnit}>°F</button>
            </div>
            <div id="forecast-box">
              <Forcast day={days[1]} stateImg={stateImg(1)} maxTemp={getData(1, "max_temp", 0)} minTemp={getData(1, "min_temp", 0)} unit={this.props.unit}/>
              <Forcast day={days[2]} stateImg={stateImg(2)} maxTemp={getData(2, "max_temp", 0)} minTemp={getData(2, "min_temp", 0)} unit={this.props.unit}/>
              <Forcast day={days[3]} stateImg={stateImg(3)} maxTemp={getData(3, "max_temp", 0)} minTemp={getData(3, "min_temp", 0)} unit={this.props.unit}/>
              <Forcast day={days[4]} stateImg={stateImg(4)} maxTemp={getData(4, "max_temp", 0)} minTemp={getData(4, "min_temp", 0)} unit={this.props.unit}/>
              <Forcast day={days[5]} stateImg={stateImg(5)} maxTemp={getData(5, "max_temp", 0)} minTemp={getData(5, "min_temp", 0)} unit={this.props.unit}/>
            </div>
            <div id="today-box">
              <h1>Today’s Hightlights </h1>
              <div id="today-box-l">
                <div className="today-box-s">
                    <h2>Wind status</h2>
                    <p className="today-info"><em>{getData(0, "wind_speed", 0)}</em>mph</p>
                    <div id="direction-box">
                      <div id="near-me-circle" style={windIconStyle}>
                      <span id="near-me-icon" className="material-icons">
                        near_me
                      </span>
                    </div>
                    {getDataText(0, "wind_direction_compass")}
                    </div>
                </div>
                <div id="humid-box" className="today-box-s">
                  <h2>Humidity</h2>
                  <p className="today-info"><em>{getData(0, "humidity", 0)}</em>%</p>
                <div id="humid-bar-box">
                  <p className="humid-bar-text-box"><span>0</span><span>50</span><span>100</span></p>
                  <div id="humid-bar"><div id="humid-bar-fill" style={{width:humidFill}}></div></div>
                  <p className="percent">%</p>
                </div>
                </div>
                <div className="today-box-s">
                <h2>Visibility</h2>
                <p className="today-info"><em>{getData(0, "visibility", 1)}</em>miles</p>
                </div>
                <div className="today-box-s">
                  <h2>Air Pressure</h2>
                  <p className="today-info"> <em>{getData(0, "air_pressure", 0)}</em> mb</p>
                </div>
              </div>
            </div>
            
            </main>
        ) 
    }
}

class Forcast extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
    const unit = (this.props.unit == "C")? "C":"F";
    const maxTemp = this.props.maxTemp;
    const minTemp = this.props.minTemp;
    const calcData = (data) => (data=="-")?
                                "-":
                                (this.props.unit == "C")? 
                                Number(data).toFixed(): 
                                (data*1.8+32).toFixed();
    const image = (this.props.stateImg == null)? 
                  <div className="load-circle-s load-circle-anim"></div>:
                  <img className="week-img" src={this.props.stateImg}/>;
   

      return(
        <div className="forecast-box-s">
                <h2>{getThisDate(this.props.day)}</h2>
                <div className="week-img-div">
                    {image}
                </div>
                <p className="week-temp"><em>{calcData(maxTemp)}°{unit}</em>&nbsp;&nbsp;&nbsp;{calcData(minTemp)}°{unit}</p>
         </div>
        ) 
      }
  }

ReactDOM.render(<MyApp />, document.getElementById('myApp'));
