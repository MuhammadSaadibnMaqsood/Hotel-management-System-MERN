import React from 'react'
import Hero from '../components/Hero'
import FearturedDestination from '../components/FearturedDestination'
import Exclusiveoffer from '../components/Exclusiveoffer'
import Testimonail from '../components/Testimonail'
import Newsletter from '../components/Newletter'


export const Home = () => {
  return (
    <div>
        <Hero/>
      
        <FearturedDestination/>

        <Exclusiveoffer/>

        <Testimonail/>

        <Newsletter/>
        
        
    </div>
  )
}
export default Home
