import React from 'react';

function Home (){

  const a = [];

  function bbb () {
    console.log(a)
  }

  function ccc (){
    a.push(...a, {title: 'iii', image: 'jjj'});
  }

  return( 
    <>
    </>
  );
}

export default Home;