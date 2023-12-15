import randomValue from "./Utils";

const Modal = (props) => {
	return (
		<div id="modal">
			<div className="modal-container">
				<div className="modal-close" onClick={() => props.setModalActive(false)}>
					close
				</div>
				{props.modalContent}
			</div>
		</div>
	);
};

const LearnMethods = (buttonHandler, setModalActive, setMethodKnowledge, methodKnowledge) => {
	const select = (message) => {
		buttonHandler(message);
		setModalActive(false);
	};

	return (
		<div className="modal-content">
			<div className="modal-title title">Study Research Methods</div>
			<div className="modal-message">
				Research methods are hard to get. Trying to understand them makes you feel a little bit
				better about yourself.
				<br />
				<br />
				Choose which research method you would like to study further.
			</div>

			<div className="button-wrapper">
				<button
					onClick={() => {
						select("You decide to study more on qualitative methods.");
						setMethodKnowledge({
							...methodKnowledge,
							qualitative: methodKnowledge.qualitative + randomValue(3),
						});
					}}>
					Qualitative Methods
				</button>
				<button
					onClick={() => {
						select("You decide to study more on quantitative methods.");
						setMethodKnowledge({
							...methodKnowledge,
							qualitative: methodKnowledge.quantitative + randomValue(3),
						});
					}}>
					Quantitative Methods
				</button>
			</div>
		</div>
	);
};

const SelectMethods = (buttonHandler, setModalActive, methodKnowledge, inventory, setInventory) => {
	const select = (message) => {
		buttonHandler(message);
		setModalActive(false);
	};

	return (
		<div className="modal-content">
			<div className="modal-title title">Select Research Methods</div>
			<div className="modal-message">
				You wonder what might be the best way to answer your research question.
				<br />
				<br />
				Choose which research method you would like to use for this study.
			</div>

			<div className="button-wrapper">
				<button
					onClick={() => {
						select("You decide it would be best if you use qualitative methods.");
						setInventory({
							...inventory,
							status: { ...inventory.status, methodSelected: "Qualitative" },
						});
					}}>
					Qualitative Methods
				</button>
				<button
					onClick={() => {
						select("You decide it would be best if you use quantitative methods.");
						setInventory({
							...inventory,
							status: { ...inventory.status, methodSelected: "Quantitative" },
						});
					}}>
					Quantitative Methods
				</button>

				<button
					onClick={() => {
						select(
							"Doing more work is obvious solution. You decide that mixed methods is the way."
						);
						setInventory({
							...inventory,
							status: { ...inventory.status, methodSelected: "Mixed Methods" },
						});
					}}>
					Mixed Methods
				</button>
			</div>
		</div>
	);
};

export { Modal, LearnMethods, SelectMethods };
