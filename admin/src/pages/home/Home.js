import React, { useEffect, useMemo, useState } from 'react'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import Chart from '../../components/chart/Chart'
import { userData } from '../../dummyData'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import { getUsersStats } from '../../api2/apiCalls'
import './home.css'

const Home = () => {
  const [userStats, setUserStats] = useState([])
  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ], [])

  const getStats = async () => {
    const res = await getUsersStats()
    // console.log(res.data);
    if(res?.status == 200){
    res.data.map((item) => {
      setUserStats(prev => [
        ...prev,
        { name: MONTHS[item._id - 1], "Active User": item.total }
      ])
    })
  }
  }

  useEffect(() => {
    getStats()
  }, [MONTHS])
  // console.log(userStats);
  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart title="UserData" data={userStats} dataKey="Active User" grid />
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />

      </div>
    </div>
  )
}

export default Home
