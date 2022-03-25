class MyApp extends React.Component{
    constructor(props){
      super(props);
      this.state={
    };
}
render(){
    return(
    <div id="myApp-box">
       <nav id="nav-bar">
            <NavContent/>
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
            <button class="search-btn nav-btn top-btn">Seach for places</button>
            <button class="place-btn nav-btn top-btn">
            <span class="material-icons gps-icon">
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
          <span class="material-icons place-icon">
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
            <button class="close-btn">
              <span class="material-icons-outlined close-icon">
              close
              </span>
            </button>
          <form class="input-box-bar">
          <div class="input-box">
            <input placeholder="search location" defaultValue="Text" class="input"/>
            <span class="material-icons search-icon">
              search
              </span>
          </div>
          <button class="search-btn search-btn-s" type="submit">Search</button>
          </form>
          <ul class="recent-list">
            <li>
              <button class="nav-recent-btn">London
              <span class="material-icons right-icon">
                chevron_right
              </span>
            </button>
            </li>
            <li>
              <button class="nav-recent-btn">Barcelona
                <span class="material-icons right-icon">
                  chevron_right
                </span>
              </button>
            </li>
            <li>
              <button class="nav-recent-btn">Long Beach
              <span class="material-icons right-icon">
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
              <button class="cf-btn cf-btn-active top-btn">°C</button>
              <button class="cf-btn top-btn">°F</button>
            </div>
            <div id="forecast-box">
              <div class="forecast-box-s">
                <h2>Tomorrow</h2>
                <img class="week-img" src="images/Shower.png" />
                <p class="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
              <div class="forecast-box-s">
                <h2>Tomorrow</h2>
                <img class="week-img" src="images/Shower.png" />
                <p class="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
              <div class="forecast-box-s">
                <h2>Tomorrow</h2>
                <img class="week-img" src="images/Shower.png" />
                <p class="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
              <div class="forecast-box-s">
                <h2>Tomorrow</h2>
                <img class="week-img" src="images/Shower.png" />
                <p class="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
              <div class="forecast-box-s">
                <h2>Tomorrow</h2>
                <img class="week-img" src="images/Shower.png" />
                <p class="week-temp"><em>16°C</em>&nbsp;&nbsp;&nbsp;11°C</p>
              </div>
            </div>
            <div id="today-box">
              <h1>Today’s Hightlights </h1>
              <div id="today-box-l">
                <div class="today-box-s">
                    <h2>Wind status</h2>
                    <p class="today-info"><em>7</em>mph</p>
                    <div id="direction-box">
                      <div id="near-me-circle">
                      <span id="near-me-icon" class="material-icons">
                        near_me
                      </span>
                    </div>
                        WSW
                    </div>
                </div>
                <div id="humid-box" class="today-box-s">
                  <h2>Humidity</h2>
                  <p class="today-info"><em>84</em>%</p>
                <div id="humid-bar-box">
                  <p class="humid-bar-text-box"><span>0</span><span>50</span><span>100</span></p>
                  <div id="humid-bar"><div id="humid-bar-fill"></div></div>
                  <p class="percent">%</p>
                </div>
                </div>
                <div class="today-box-s">
                <h2>Visibility</h2>
                <p class="today-info"><em>6,4</em>miles</p>
                </div>
                <div class="today-box-s">
                  <h2>Air Pressure</h2>
                  <p class="today-info"> <em>998</em> mb</p>
                </div>
              </div>
            </div>
            
            </main>
        ) 
    }
}


ReactDOM.render(<MyApp />, document.getElementById('myApp'));