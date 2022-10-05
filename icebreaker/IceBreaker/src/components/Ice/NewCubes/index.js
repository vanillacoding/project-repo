import { Group, RegularPolygon } from 'react-konva';

function NewCubes({ cubes }) {
  const onHide = (ev) => ev.target.hide();

  return (
    <Group>
      {cubes.map((pos, i) => (
        <RegularPolygon
          key={String(pos.x) + String(pos.y) + i}
          x={pos.x - 18}
          y={pos.y - 0}
          sides={6}
          radius={17}
          rotation={90}
          fillLinearGradientStartPoint={{ x: 10, y: 5 }}
          fillLinearGradientEndPoint={{ x: 0, y: -10 }}
          fillLinearGradientColorStops={[
            0,
            '#fba85c',
            0.8,
            '#f178b6',
            1,
            '#e95353',
          ]}
          stroke="#F8E8D3"
          strokeWidth={2}
          shadowColor="#B4457E"
          shadowBlur={1}
          shadowOpacity={0.8}
          shadowOffset={{ x: 5, y: 4 }}
          onClick={onHide}
          onTouchEnd={onHide}
        />
      ))}
    </Group>
  );
}

export default NewCubes;
