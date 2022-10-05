var updateBlast = function( blast ) {
  blast.position.z -= 5;
  blast.position.x += blast.direction.x * 2;
  blast.position.y += blast.direction.y * 2;
};

export default updateBlast;
