import { useState } from "react";
import "./type1.scss";

const NodeTypes = {
	Init: "Init",
	Default: "Default",
};

const textNodes = {
	Init: {
		id: 0,
		text: "sample text",
		options: [
			{
				text: "Option A",
				setState: { hope: 10 },
				setInventory: { results: false },
				nextNode: NodeTypes.Default,
			},

			{
				text: "Option B",
				// setState: { energy: -15 },
				setInventory: { results: true },
				nextNode: NodeTypes.Default,
			},
			{
				text: "Option C",
				setState: { energy: 10 },
				setInventory: { qual: true },
				nextNode: NodeTypes.Default,
			},
		],
	},

	Default: {
		id: 0,
		text: "sample text 2",
		options: [
			{
				text: "Option A",
				setState: { hope: 10 },
				setInventory: { results: false },
				nextNode: NodeTypes.Default,
			},

			{
				text: "Option B",
				// setState: { energy: -15 },
				setInventory: { results: true },
				nextNode: NodeTypes.Default,
			},
			{
				text: "Option C",
				setState: { energy: 10 },
				setInventory: { qual: true },
				nextNode: NodeTypes.Default,
			},
		],
	},
};

const SRSSim = () => {
	const [stage, setStage] = useState(0);
	const [currentNode, setCurrentNode] = useState(textNodes.Init);
	const [state, setState] = useState({ energy: 50, conscience: 50, hope: 50 });
	const [inventory, setInventory] = useState({});

	return (
		<div id="container">
			<div className="section" id="display">
				<div className="instructions">{currentNode.text}</div>
				<div id="options">
					{currentNode.options.map((i, index) => {
						return (
							<OptionItem
								data={i}
								index={index}
								state={state}
								setState={setState}
								inventory={inventory}
								setInventory={setInventory}
								progressStage={() => setStage(stage + 1)}
							/>
						);
					})}
				</div>
			</div>
			<div className="section" id="inventory">
				<div className="header">Inventory:</div>
			</div>
			<div className="section" id="status">
				<div className="header">Status:</div>
				<div>Energy: {state.energy}</div>
				<div>Conscience: {state.conscience}</div>
				<div>Hope: {state.hope}</div>
			</div>
		</div>
	);
};

const OptionItem = (props) => {
	let item = props.data;

	return (
		<div
			className="option-item"
			onClick={() => {
				props.progressStage();

				// state update behavior
				if (item.setState) {
					let newstate = props.state;
					newstate.energy += item.setState.energy || 0;
					newstate.conscience += item.setState.conscience || 0;
					newstate.hope += item.setState.hope || 0;
					props.setState(newstate);
				}

				// inventory update behavior
				if (item.setInventory) {
					props.setInventory(Object.assign(props.inventory, item.setInventory));
				}

				// Game Over behavior - if state is at something

				if (item.nextNode === NodeTypes.Default) {
					// caculate chance of random event
				} else if (item.nextNode === NodeTypes.Init) {
					// Go back to start
				}
				console.log(props.state);
				console.log(props.inventory);
			}}
			key={props.index}>
			{item.text}
		</div>
	);
};

export default SRSSim;
