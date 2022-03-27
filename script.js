const APIurl = "https://www.metaweather.com/api/location/";
const APIsearchName="search/?query=";///"api/location/search/?query=(query)"
const APIsearchLL="search/?lattlong=";//"/api/location/search/?lattlong=(latt),(long)"


class MyApp extends React.Component{
    constructor(props){
      super(props);
      this.state={
          location:"Hong Kong",
          todayDate:"",
          todayText:"",
          NavSearch: false,
          data:{},
    };
    this.showSearch=this.showSearch.bind(this);
    this.closeSearch=this.closeSearch.bind(this);
    this.searchLocationName=this.searchLocationName.bind(this);
    this.getLocationData=this.getLocationData.bind(this);
}

componentDidMount() {
  this.getLocationData();
}

searchLocationName(){
  let woeid="";
  fetch("https://www.metaweather.com/api/location/search/?query=Hong%20Kong")
  .then((res) => res.json())
  .then((json) => {
      woeid=json;
  });
  console.log("woeid");
  console.log(woeid);
}


getLocationData(){
  this.searchLocationName();
  
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
                    <NavSearch closeSearch={this.closeSearch}/>:
                    <NavContent showSearch={this.showSearch}/>;
    return(
    <div id="myApp-box">
       <nav id="nav-bar">
            {NavPage}
       </nav>
       <Main/>
    </div>
    )
}
}

class NavContent extends React.Component{
    constructor(props){
      super(props);
    };
    render(){
        return(
         <div id="nav-bar-content">
            <div id="nav-top-btns"> 
            <button className="search-btn nav-btn top-btn" onClick={this.props.showSearch}>Seach for places</button>
            <button className="place-btn nav-btn top-btn">
            <span className="material-icons gps-icon">
                gps_fixed
            </span>
            </button>
        </div>
         <img id="nav-img" src="images/Shower.png" />
         <p id="nav-temp"><em>15</em>°C</p>
        <p id="nav-desc">Shower</p>
        <div>
        <p id="nav-date">Today&nbsp;&nbsp;•&nbsp;&nbsp;Fri, 5 Jun</p>
        <p id="nav-place">
          <span className="material-icons place-icon">
          place
         </span>
         Helsinki
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
        return(
            <div id="nav-search-panel">
            <button className="close-btn" onClick={this.props.closeSearch}>
              <span className="material-icons-outlined close-icon">
              close
              </span>
            </button>
          <form className="input-box-bar">
          <div className="input-box">
            <input placeholder="search location" defaultValue="" class="input"/>
            <span className="material-icons search-icon">
              search
              </span>
          </div>
          <button className="search-btn search-btn-s" type="submit">Search</button>
          </form>
          <ul className="recent-list">
            <li>
              <button className="nav-recent-btn">London
              <span className="material-icons right-icon">
                chevron_right
              </span>
            </button>
            </li>
            <li>
              <button className="nav-recent-btn">Barcelona
                <span className="material-icons right-icon">
                  chevron_right
                </span>
              </button>
            </li>
            <li>
              <button className="nav-recent-btn">Long Beach
              <span className="material-icons right-icon">
                chevron_right
              </span>
            </button>
            </li>
          </ul>
          </div>
        ) 
    }
}

class Main extends React.Component{
    constructor(props){
      super(props);
    };
    render(){
        return(
            <main>

            <div id="unit-box">
              <button className="cf-btn cf-btn-active top-btn">°C</button>
              <button className="cf-btn top-btn">°F</button>
            </div>
            <div id="forecast-box">
              <div className="forecast-box-s">
                <h2>Tomorrow</h2>
                <img className="week-img" src="images/Shower.png" />
                <p className="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
              <div className="forecast-box-s">
                <h2>Tomorrow</h2>
                <img className="week-img" src="images/Shower.png" />
                <p className="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
              <div className="forecast-box-s">
                <h2>Tomorrow</h2>
                <img className="week-img" src="images/Shower.png" />
                <p className="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
              <div className="forecast-box-s">
                <h2>Tomorrow</h2>
                <img className="week-img" src="images/Shower.png" />
                <p className="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
              <div className="forecast-box-s">
                <h2>Tomorrow</h2>
                <img className="week-img" src="images/Shower.png" />
                <p className="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
            </div>
            <div id="today-box">
              <h1>Today’s Hightlights </h1>
              <div id="today-box-l">
                <div className="today-box-s">
                    <h2>Wind status</h2>
                    <p className="today-info"><em>7</em>mph</p>
                    <div id="direction-box">
                      <div id="near-me-circle">
                      <span id="near-me-icon" className="material-icons">
                        near_me
                      </span>
                    </div>
                        WSW
                    </div>
                </div>
                <div id="humid-box" className="today-box-s">
                  <h2>Humidity</h2>
                  <p className="today-info"><em>84</em>%</p>
                <div id="humid-bar-box">
                  <p className="humid-bar-text-box"><span>0</span><span>50</span><span>100</span></p>
                  <div id="humid-bar"><div id="humid-bar-fill"></div></div>
                  <p className="percent">%</p>
                </div>
                </div>
                <div className="today-box-s">
                <h2>Visibility</h2>
                <p className="today-info"><em>6,4</em>miles</p>
                </div>
                <div className="today-box-s">
                  <h2>Air Pressure</h2>
                  <p className="today-info"> <em>998</em> mb</p>
                </div>
              </div>
            </div>
            
            </main>
        ) 
    }
}


ReactDOM.render(<MyApp />, document.getElementById('myApp'));
