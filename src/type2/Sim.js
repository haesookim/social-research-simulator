import { useState } from "react";
import { Modal, LearnMethods, SelectMethods } from "./Modal";
import randomValue from "./Utils";
import "./style.scss";

const Sim = () => {
	const [displayMessage, setDisplayMessage] = useState([
		"You are a social researcher now (whatever that means).",
	]);
	const [domainKnowledge, setDomainKnowledge] = useState(0);
	const [methodKnowledge, setMethodKnowledge] = useState({
		quantitative: 0,
		qualitative: 0,
		mixed: 0,
	});

	const [inventory, setInventory] = useState({
		countables: { researchIdea: 0, researchQuestion: 0, studyResults: 0 },
		booleans: {
			qualMethod: false,
			quantMethod: false,
			mixedMethod: false,
			irb: false,
			domainExpert: false,
		},
		status: { IRBWaiting: false, IRBRecieved: false, methodSelected: "", studyRunning: false },
	});

	const [showInventory, setShowInventory] = useState([false, false, false]);
	const [showSection, setShowSection] = useState([false]);

	const [irbCounter, setIRBCounter] = useState(0);
	const [studyCounter, setStudyCounter] = useState(0);

	const [modalActive, setModalActive] = useState(false);
	const [modalContent, setModalContent] = useState(LearnMethods);

	function buttonHandler(nextMessage, intermediate = false) {
		setDisplayMessage((displayMessage) => [...displayMessage, nextMessage]);

		if (intermediate) {
			return;
		}
		if (domainKnowledge / 20 >= inventory.countables.researchIdea + 1) {
			setDisplayMessage((displayMessage) =>
				displayMessage.concat(["You get a new Research Idea."])
			);
			setInventory({
				...inventory,
				countables: {
					...inventory.countables,
					researchIdea: inventory.countables.researchIdea + 1,
				},
			});
			setDomainKnowledge(domainKnowledge % 20);

			if (!showInventory[0]) setShowInventory([true, showInventory[1], showInventory[2]]);
			setShowSection([true, showSection[1]]);
		}

		if (irbCounter > 0) {
			if (irbCounter === 1) {
				if (randomValue(10) > 7) {
					setInventory({
						...inventory,
						status: { ...inventory.status, IRBWaiting: false, IRBRecieved: true },
					});
					setDisplayMessage((displayMessage) =>
						displayMessage.concat(["You recieved your IRB. You can now conduct your studies."])
					);
					setShowSection([showSection[0], true]);
				} else {
					setInventory({ ...inventory, status: { ...inventory.status, IRBWaiting: false } });
					setDisplayMessage((displayMessage) =>
						displayMessage.concat([
							"The IRB committee didn't approve your request. Back to the drawing board.",
						])
					);
				}
			}
			setIRBCounter(irbCounter - 1);
		}

		if (studyCounter > 0) {
			if (studyCounter === 1) {
				setInventory({
					...inventory,
					countables: {
						...inventory.countables,
						studyResults: inventory.countables.studyResults + 1,
					},
					status: { ...inventory.status, studyRunning: false },
				});
				setDisplayMessage((displayMessage) =>
					displayMessage.concat(["You finished running the study."])
				);
			}
			setStudyCounter(studyCounter - 1);
		}
	}

	return (
		<div id="page-container">
			<div id="display" key={displayMessage.length}>
				{[...displayMessage].map((message, index) => {
					return (
						<div
							className={
								index === displayMessage.length - 1 ? "display-message fade" : "display-message"
							}
							key={index}>
							{message}
						</div>
					);
				})}
			</div>
			<div id="controls">
				<div className="section" id="exploration">
					<div className="section-title title">Exploration</div>
					<div className="button-wrapper">
						<button
							onClick={() => {
								setDomainKnowledge(domainKnowledge + randomValue(10));
								buttonHandler("You dive into the pile of papers on your desk.");
							}}>
							Read Papers
						</button>
						<button
							onClick={() => {
								setDomainKnowledge(domainKnowledge + randomValue(3));
								buttonHandler("You browse around the news to see what's happening in the world.");
							}}>
							Read the News
						</button>
					</div>
				</div>

				{showSection[0] && (
					<div className="section" id="Elaboration">
						<div className="section-title title">Development</div>
						<div className="button-wrapper">
							<button
								onClick={() => {
									// setMethodsVisible(!methodsVisible);
									setModalActive(true);
									buttonHandler(
										"Research methods are hard to get. Trying to understand them makes you feel a little bit better about yourself.",
										true
									);
									setModalContent(
										LearnMethods(buttonHandler, setModalActive, setMethodKnowledge, methodKnowledge)
									);
								}}>
								Study Research Methods
							</button>
							<button
								disabled={inventory.countables.researchIdea === 0}
								onClick={() => {
									let rand = randomValue(10);
									if (rand > 8) {
										buttonHandler("You have developed a Research Question.");
										setInventory({
											...inventory,
											countables: {
												...inventory.countables,
												researchIdea: inventory.countables.researchIdea - 1,
												researchQuestion: inventory.countables.researchQuestion + 1,
											},
										});
									} else if (rand > 3) {
										buttonHandler("You need some more time to devlop this idea.");
									} else {
										buttonHandler(
											"You couldn't come up with a way to make this into an interesting research question."
										);
										setInventory({
											...inventory,
											countables: {
												...inventory.countables,
												researchIdea: inventory.countables.researchIdea - 1,
											},
										});
									}
								}}>
								Develop Research Idea
							</button>
							<button
								disabled={
									inventory.status.studyRunning || inventory.countables.researchQuestion === 0
								}
								onClick={() => {
									setModalActive(true);
									buttonHandler(
										"You wonder what might be the best way to answer your research question.",
										true
									);
									setModalContent(
										SelectMethods(
											buttonHandler,
											setModalActive,
											methodKnowledge,
											inventory,
											setInventory
										)
									);
								}}>
								Select Method
							</button>
							<button
								disabled={
									inventory.status.IRBWaiting ||
									inventory.status.IRBRecieved ||
									inventory.countables.researchQuestion === 0
								}
								onClick={() => {
									buttonHandler("You have submitted your IRB. Fingers Crossed.");
									setInventory({ ...inventory, status: { ...inventory.status, IRBWaiting: true } });
									setIRBCounter(randomValue(6, 6));
								}}>
								Apply for IRB
							</button>
						</div>
					</div>
				)}

				{showSection[1] && (
					<div className="section" id="Execution">
						<div className="section-title title">Data Collection</div>
						<div className="button-wrapper">
							<button
								disabled={inventory.status.studyRunning || !inventory.status.IRBRecieved}
								onClick={() => {
									buttonHandler("You begin to run your study.");
									let range, val;
									if (inventory.status.methodSelected === "Qualitative") {
										[range, val] = [6, 6];
									} else if (inventory.status.methodSelected === "Quantitative") {
										[range, val] = [6, 3];
									} else if (inventory.status.methodSelected === "Mixed Methods") {
										[range, val] = [8, 8];
									} else {
										buttonHandler("You were unable to run your study.", true);
										return;
									}
									setStudyCounter(randomValue(range, val));
									setInventory({
										...inventory,
										status: { ...inventory.status, studyRunning: true },
									});
								}}>
								Obtain Data
							</button>
							{inventory.status.studyRunning && (
								<button
									onClick={() => {
										buttonHandler(
											"This isn't working like you thought it would. You stopped running your study.",
											true
										);
										setStudyCounter(0);
										setInventory({
											...inventory,
											status: { ...inventory.status, studyRunning: false },
										});
									}}>
									Cancel Study
								</button>
							)}
						</div>
					</div>
				)}
			</div>

			<div id="inventory">
				{showInventory[0] && (
					<div id="exploration" className="inventory-section">
						<div className="inventory-title title"></div>
						<div className="inventory-item">
							<div className="inventory-item-name">Research Ideas</div>
							<div className="inventory-item-value">{inventory.countables.researchIdea}</div>
						</div>
						<div className="inventory-item">
							<div className="inventory-item-name">Research Questions</div>
							<div className="inventory-item-value">{inventory.countables.researchQuestion}</div>
						</div>
						<div className="inventory-item">
							<div className="inventory-item-name">Results</div>
							<div className="inventory-item-value">{inventory.countables.studyResults}</div>
						</div>
					</div>
				)}

				<div id="status" className="inventory-section">
					<div className="inventory-title title">Status</div>
					<div className="inventory-item">
						<div className="inventory-item-name">IRB</div>
						{inventory.status.IRBRecieved ? (
							<div className="inventory-item-value">Received</div>
						) : inventory.status.IRBWaiting ? (
							<div className="inventory-item-value">Waiting for Approval</div>
						) : (
							<div className="inventory-item-value">Not submitted</div>
						)}
					</div>
					<div className="inventory-item">
						<div className="inventory-item-name">Method</div>
						<div className="inventory-item-value">{inventory.status.methodSelected}</div>
					</div>
					{inventory.status.studyRunning && <div className="inventory-item">Study in Progress</div>}
				</div>
			</div>
			{modalActive && <Modal setModalActive={setModalActive} modalContent={modalContent}></Modal>}
		</div>
	);
};

export default Sim;
