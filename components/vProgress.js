import React from "react";
import { useRef } from "react";

export var VProgressBar = ({ width, height, percent, className }) => {

	const [value, setValue] = React.useState(0);
  const ref = useRef(null);
  const leftOffset = 25
  const topOffset = .8

	React.useEffect(() => {
		setValue(percent * width);
	}, [percent, width]);

	return (
		<div>
			<div ref={ref} className={"progress-div"} style={{ width: width }}>
				<div style={{ width: `${value}px`,  height: `${height}px` }} className={"progress "+className} />
			</div>
      <div style={{
            position: "relative",
            left: `${(width*.9)}px`,
            top: `-${height*.95}px`,
            fontSize: '10px',
            // color: '#333',
          }}>{(percent*100).toFixed()}%</div>
		</div>
	);
};
