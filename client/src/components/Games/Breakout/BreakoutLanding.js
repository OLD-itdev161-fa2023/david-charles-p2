import React from "react";

class BreakoutLanding extends React.Component{
    render() {
        return (
            <div>
                <div id="score">0</div>
                <div className="grid"></div>
                <script src="./BreakoutGame.js"></script>
            </div>
            
            )
    }
}

export default BreakoutLanding;