import React from 'react' 
import Dest from '../Dest/Dest' 
import Search from '../Search/Search'
import Side from '../side bar/Side'
import Foot from '../Footer/Foot'
import Nav from '../Nav/Nav'
import Pack from '../Pack/Pack'
function Home() {
  return (
    <div> 
       <Dest/>
       
        <Search/>
        <Pack/>
       <Side/>
       
       <Foot/>
    </div>
  )
}

export default Home