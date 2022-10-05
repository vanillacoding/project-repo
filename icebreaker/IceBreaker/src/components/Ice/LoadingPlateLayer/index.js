import { Layer, Line } from 'react-konva';

function LoadingPlateLayer() {
  return (
    <Layer>
      <Line
        points={[
          15, 192, 73, 60, 230, 20, 340, 102, 360, 230, 293, 355, 90, 355,
        ]}
        closed="true"
        fill="#ffffff"
        shadowColor="#000000"
        shadowBlur={10}
        shadowOffset={{ x: 0, y: 10 }}
        shadowOpacity={0.4}
        opacity={0.4}
      />
    </Layer>
  );
}

export default LoadingPlateLayer;
