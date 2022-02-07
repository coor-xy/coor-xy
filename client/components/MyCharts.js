import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchCharts } from '../store/charts';
import { _setData } from '../store/data';
import { _setPrimaryColumn, _setValueColumns } from '../store/selectColumns';
import charts from "./chartComponents";

const {
    BarComp,
    SimpleAreaComp,
    SimpleScatterComp,
    LineComp
  } = charts;

const MyCharts = () => {
    const [charts, setCharts] = useState([])
    const { allCharts } = useSelector(state=>state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCharts())
    },[])

    useEffect(()=>{
        setCharts(allCharts)
    },[allCharts.length])

    return (
        <div className='myCharts'>
            <div className="chart-sidebar">
                <form>
                    <label>Filter by type:</label>
                    <select>
                        <option value="All">All</option>
                        {charts.map(chart=>(
                            <option value={chart.type} key={chart.id}>{chart.type}</option>
                        ))}
                    </select>
                </form>
            </div>
            <div className="mycharts-main-container">
                <div className='charts-header'>
                    <h1>My Charts</h1>
                    <Link to='/create'>
                    <button>Create New Chart</button>
                    </Link>
                </div>
                <div className="charts-container">
                    {charts.map(chart=>(
                        <div key={chart.id}>
                            {chart.type==='Bar' ? 
                            <div>
                                <Link to={{
                                    pathname: "/edit",
                                    state: { type: "Bar" },
                                }}
                                onClick={()=>{
                                    dispatch(_setData(chart.dataTable.data))
                                    dispatch(_setPrimaryColumn(chart.primaryColumn))
                                    chart.valueColumns.forEach(obj=>{
                                        dispatch(_setValueColumns(obj))
                                    })
                                }}
                                >
                                    <BarComp data={chart.dataTable.data} primaryColumn={chart.primaryColumn} valueColumns={chart.valueColumns} height={250} width={300}/>
                                </Link>
                            </div>
                            : chart.type==='Line' ? 
                            <div>
                                <Link to={{
                                    pathname: "/edit",
                                    state: { type: "Line" },
                                }}
                                onClick={()=>{
                                    dispatch(_setData(chart.dataTable.data))
                                    dispatch(_setPrimaryColumn(chart.primaryColumn))
                                    chart.valueColumns.forEach(obj=>{
                                        dispatch(_setValueColumns(obj))
                                    })
                                }}
                                >
                                    <LineComp data={chart.dataTable.data} primaryColumn={chart.primaryColumn} valueColumns={chart.valueColumns} height={250} width={300}/>
                                </Link>
                            </div>
                            : <></>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyCharts;
