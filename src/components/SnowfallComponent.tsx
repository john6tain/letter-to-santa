// components/SnowfallComponent.tsx
import React from 'react';
import Snowfall from 'react-snowfall';

const SnowfallComponent: React.FC = () => {
	return (
		<div>
			<Snowfall snowflakeCount={750}/>
		</div>
	);
};

export default SnowfallComponent;