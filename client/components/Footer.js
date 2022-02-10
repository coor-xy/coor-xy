import React from "react"


const Footer = () => {

    return (
        <footer style={{
            "position": "relative",
            "bottom": "0",
            "marginTop": "30px",
            "backgroundColor": "#686d76",
            "color": "#fff",
            "height": "auto",
            "width": "100vw",
            "paddingTop": "15px",
        }}>
            <div style={{
                "display": "flex",
                "alignItems": "center",
                "justifyContent": "center",
                "flexDirection": "column",
                "textAlign": "center",}}>
                <h3>Coor|xy</h3>
                
            </div>
            <div style={{
                "backgroundColor": "#000",
                "width": "100vw",
                "padding": "5px 0",
                "textAlign": "center",
            }}>
                <p>
                    copyright &copy;2022 Coor|xy.
                </p>
            </div>
        </footer>
    )
}

export default Footer;
