import { Layer, Line } from 'react-konva';

function PlateLayer() {
  return (
    <Layer>
      <Line
        points={[
          15, 192, 73, 60, 230, 20, 340, 102, 360, 230, 293, 355, 90, 355,
        ]}
        closed="true"
        fillLinearGradientStartPoint={{ x: 100, y: -80, z: 0 }}
        fillLinearGradientEndPoint={{ x: -30, y: 0, z: 0 }}
        fillLinearGradientColorStops={[
          0,
          '#62a8f2',
          0.5,
          '#b7a4ee',
          1,
          '#8bcffc',
        ]}
        shadowColor="#000000"
        shadowBlur={10}
        shadowOffset={{ x: 0, y: 10 }}
        shadowOpacity={0.4}
      />
    </Layer>
  );
}

export default PlateLayer;
