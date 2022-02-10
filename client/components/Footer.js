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
                <h2>Coor|xy</h2>
                <p>Developers:</p>
                <div>
                    <a href="https://github.com/davidjchoi">
                        <span style={{color:"white",textDecoration:"none", margin:"10px"}}>David Choi</span>
                    </a>
                    <a href="https://github.com/interranteblaine/">
                        <span style={{color:"white",textDecoration:"none", margin:"10px"}}>Blaine Interrante</span>
                    </a>
                    <a href="https://github.com/dannypacheco4">
                        <span style={{color:"white",textDecoration:"none", margin:"10px"}}>Danny Pacheco</span>
                    </a>
                    <a href="https://github.com/3eds3">
                        <span style={{color:"white",textDecoration:"none", margin:"10px"}}>Edward Shevchuk</span>
                    </a>
                </div>
            </div>
            <div style={{
                "width": "100vw",
                "padding": "3px 0",
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
