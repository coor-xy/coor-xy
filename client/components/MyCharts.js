import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios"

const MyCharts = () => {
    const dispatch = useDispatch()
    // let allCharts;
    useEffect(() => {
        fetchCharts()
    },[])

    const fetchCharts = async () => {
        const {data} = await axios.get('/api/charts')
        console.log(data)
    }

    return (
        <div className='myCharts'>
            <div className="chart-sidebar">
                <p>All</p>
                <p>Bar</p>
                <p>Line</p>
                <p>Scatter</p>
            </div>
            <div className="mycharts-main-container">
                <div className='charts-header'>
                    <h1>My Charts</h1>
                    <Link to='/create'>
                    <button>Create New Chart</button>
                    </Link>
                </div>
                <div className="charts-container">
                    <p>chart1</p>
                    <p>chart2</p>
                    <p>chart3</p>
                </div>
            </div>
        </div>
    )
}

export default MyCharts;
