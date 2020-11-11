
import LongMenu from "../Components/sideNav"
import React from "react";






var Home = () => (
    <div className="container">
        <div className="row justify-content-between">
            {/* <div className="col">
        <h3 className="display-5">Student profiles</h3>
      </div> */}
            <div style={{ textAlign: "center", marginBottom: 0 }}>
            <h1 > Home </h1>
            <p> select 3 dots on the left to open navigation bar</p>
            </div>
            <div className="col pt-auto">
                {process.env.REACT_APP_VERSION ? (
                    <h4 style={{ textAlign: "right", marginBottom: 0 }}>
                        {process.env.REACT_APP_VERSION}
                    </h4>
                ) : (
                        ""
                    )}
            </div>
        </div>
        <div className="list-group">
            <LongMenu selected="Home" />
        </div>
    </div>
);

export default Home;
