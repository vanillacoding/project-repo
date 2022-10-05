var updateStars = function( starGeo ) {
  starGeo.vertices.forEach( function( star ) {
    star.velocity += 0.03;
    star.z += star.velocity;

    if ( star.z > 0 ) {
      star.z = -1000;
      star.velocity = 0;
    }
  } );
  starGeo.verticesNeedUpdate = true;
};

export default updateStars;
