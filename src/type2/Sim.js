import { useState } from "react";
import {
	Modal,
	LearnMethods,
	SelectMethods,
	SelectVenue,
	FakeResults,
	SelectQual,
	SelectQuant,
} from "./Modal";
import randomValue from "./Utils";
import "./style.scss";

const Sim = () => {
	const [displayMessage, setDisplayMessage] = useState([
		"You are a social researcher now (whatever that means).",
	]);
	const [domainKnowledge, setDomainKnowledge] = useState(0);
	const [socialKnowledge, setSocialKnowledge] = useState(0);
	const [ethicsKnowledge, setEthicsKnowledge] = useState(0);

	const [methodKnowledge, setMethodKnowledge] = useState({
		quantitative: 0,
		qualitative: 0,
		mixed: 0,
	});

	const [inventory, setInventory] = useState({
		countables: {
			researchIdea: 0,
			researchQuestion: 0,
			studyResults: 0,
			draftPapers: 0,
			RnRPapers: 0,
			RNRSubmittedPapers: 0,
			conferencePapers: 0,
			journalPapers: 0,
		},
		booleans: {
			qualMethod: false,
			quantMethod: false,
			mixedMethod: false,
			irb: false,
			domainExpert: false,
		},
		status: {
			IRBWaiting: false,
			IRBRecieved: false,
			methodSelected: "",
			qualSelected: "",
			quantSelected: "",
			usingQual: false,
			usingQuant: false,
			studyRunning: false,
			paperWriting: false,
			venueSelected: "",
		},
		outreach: {
			fame: 0,
			citations: 0,
			followers: 0,
			talks: 0,
			books: 0,
			newsreports: 0,
		},
	});

	const [showInventory, setShowInventory] = useState([false, false, false]);
	const [showSection, setShowSection] = useState([false, false, false]);

	const [irbCounter, setIRBCounter] = useState(0);
	const [irbTimes, setIRBTimes] = useState(0);
	const [studyCounter, setStudyCounter] = useState(0);
	const [qualCounter, setQualCounter] = useState(0);
	const [quantCounter, setQuantCounter] = useState(0);

	const [paperCounter, setPaperCounter] = useState(0);
	const [submissionCounter, setSubmissionCounter] = useState(0);

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
			setShowSection([true, showSection[1], showSection[2]]);
		}

		IRBLogic();
		methodLogic();
		studyLogic();
		paperWritingLogic();
		submissionLogic();

		if (randomValue(100) < 5) {
			randomEventLogic();
		}
	}

	function methodLogic() {
		if (methodKnowledge.qualitative > 20 && !inventory.booleans.qualMethod) {
			setInventory({
				...inventory,
				booleans: {
					...inventory.booleans,
					qualMethod: true,
				},
			});
			setDisplayMessage((displayMessage) =>
				displayMessage.concat([
					"You now feel more confident in understanding and using qualitative methods.",
				])
			);
		}
		if (methodKnowledge.quantitative > 20 && !inventory.booleans.quantMethod) {
			setInventory({
				...inventory,
				booleans: {
					...inventory.booleans,
					quantMethod: true,
				},
			});
			setDisplayMessage((displayMessage) =>
				displayMessage.concat([
					"You now feel more confident in understanding and using quantitative methods.",
				])
			);
		}
	}

	function IRBLogic() {
		if (irbCounter > 0) {
			if (irbCounter === 1) {
				if (randomValue(10, irbTimes / 2) > 7) {
					setInventory({
						...inventory,
						status: { ...inventory.status, IRBWaiting: false, IRBRecieved: true },
					});
					setDisplayMessage((displayMessage) =>
						displayMessage.concat(["You recieved your IRB. You can now conduct your studies."])
					);
					setShowSection([showSection[0], true, showSection[2]]);
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
		} else {
			// IRB expiration logic
		}
	}

	function studyLogic() {
		if (studyCounter > 0 && inventory.status.studyRunning) {
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
				setShowSection([true, showSection[1], true]);
			}
			setStudyCounter(studyCounter - 1);
		}
	}

	function paperWritingLogic() {
		if (paperCounter > 0) {
			if (randomValue(100) > 95) {
				// Fake Results
				setDisplayMessage((displayMessage) =>
					displayMessage.concat([
						"You realize that there was a critical error in your data collection process, and that your results are all useless. You could start again, but it will take a long time..",
					])
				);
				setModalActive(true);
				setModalContent(FakeResults(buttonHandler, setModalActive, inventory, setInventory));
				setInventory({
					...inventory,
					countables: {
						...inventory.countables,
						studyResults: inventory.countables.studyResults - 1,
						draftPapers: inventory.countables.draftPapers + 1,
					},
					status: { ...inventory.status, paperWriting: false },
				});
				setPaperCounter(0);
				return;
			}

			if (paperCounter === 1) {
				setInventory({
					...inventory,
					countables: {
						...inventory.countables,
						studyResults: inventory.countables.studyResults - 1,
						draftPapers: inventory.countables.draftPapers + 1,
					},
					status: { ...inventory.status, paperWriting: false },
				});
				setDisplayMessage((displayMessage) =>
					displayMessage.concat(["You finished a draft paper."])
				);
			}
			setPaperCounter(paperCounter - 1);
		}
	}

	function submissionLogic() {
		//let domainKnowledgeBonus = domainKnowledge
		let bonus = 0;
		let comment = "";
		if (
			(inventory.status.usingQuant && !inventory.booleans.quantMethod) ||
			(inventory.status.usingQual && !inventory.booleans.qualMethod)
		) {
			comment +=
				"The reviewers suggested you to double check if the methods are applied properly. ";
		} else {
			bonus += 3;
		}

		if (randomValue(10, Math.floor(Math.log10(socialKnowledge))) > 5) {
			//social knowledge
			comment +=
				"They mentioned that the phenomena is not described accurately, and advised you to do more research on the subject. ";
		} else {
			bonus += 2;
		}

		if (randomValue(10, Math.floor(Math.log10(ethicsKnowledge))) > 5) {
			//ethics
			comment +=
				"The reviewers noted that the work can have harmful implications to certain populations. ";
		} else {
			bonus += 1;
		}

		if (submissionCounter > 0) {
			if (submissionCounter === 1) {
				if (inventory.status.venueSelected === "Conference") {
					if (randomValue(10, bonus) > 8) {
						// accepted
						setInventory({
							...inventory,
							countables: {
								...inventory.countables,
								draftPapers: inventory.countables.draftPapers - 1,
								conferencePapers: inventory.countables.conferencePapers + 1,
							},
						});

						setDisplayMessage((displayMessage) =>
							displayMessage.concat([
								"Your paper was accpeted to the conference after minor revisions.",
							])
						);
					} else {
						//rejected

						setDisplayMessage((displayMessage) =>
							displayMessage.concat([
								"Your paper was rejected. " +
									comment +
									"We can learn from the reviews to see how we can improve.",
							])
						);
					}
				} else {
					// in case of journal paper
					if (inventory.countables.RNRSubmittedPapers > 0) {
						//RNR logic
						let rand = randomValue(10, bonus);
						if (rand > 6) {
							// Accepted
							setDisplayMessage((displayMessage) =>
								displayMessage.concat([
									"The Journal sent a note saying that they are happy with the revisions, and they will be publishing your paper in the next issue.",
								])
							);

							setInventory({
								...inventory,
								countables: {
									...inventory.countables,
									draftPapers: inventory.countables.RnRSubmittedPapers - 1,
									journalPapers: inventory.countables.journalPapers + 1,
								},
							});
						} else if (rand > 4) {
							setDisplayMessage((displayMessage) =>
								displayMessage.concat([
									"The Journal sent back your paper with reviews and a note to resubmit. " +
										comment,
								])
							);
							setInventory({
								...inventory,
								countables: {
									...inventory.countables,
									draftPapers: inventory.countables.RnRPapers + 1,
									journalPapers: inventory.countables.RnRSubmittedPapers - 1,
								},
							});
						} else {
							setDisplayMessage((displayMessage) =>
								displayMessage.concat(["Your paper was rejected after the revision process."])
							);
							setInventory({
								...inventory,
								countables: {
									...inventory.countables,
									draftPapers: inventory.countables.RnRPapers - 1,
									journalPapers: inventory.countables.journalPapers + 1,
								},
							});
						}
					} else {
						if (randomValue(10, bonus) > 8) {
							setDisplayMessage((displayMessage) =>
								displayMessage.concat(["Your paper was accepted to a scientific journal."])
							);

							setInventory({
								...inventory,
								countables: {
									...inventory.countables,
									draftPapers: inventory.countables.draftPapers - 1,
									journalPapers: inventory.countables.journalPapers + 1,
								},
							});
						} else {
							setDisplayMessage((displayMessage) =>
								displayMessage.concat([
									"Your paper was rejected from the journal. " +
										comment +
										"We can learn from the reviews to see how we can improve.",
								])
							);
						}
					}
				}
			}

			setSubmissionCounter(submissionCounter - 1);
		}
	}

	function socialMediaLogic() {
		let followerVal = inventory.outreach.followers;
		let log = 1;
		if (followerVal > 0) {
			log = Math.log10(followerVal) / 2;
		}

		let rand = randomValue(Math.floor(10 ** log));
		setInventory({
			...inventory,
			outreach: {
				...inventory.outreach,
				followers: followerVal + rand,
			},
		});

		buttonHandler(
			"You make a post about your research on social media. You gained " + rand + " followers."
		);
	}

	function randomEventLogic() {
		// You have a paper

		if (inventory.countables.journalPapers > 0 || inventory.countables.conferencePapers > 0) {
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
								setSocialKnowledge(socialKnowledge + randomValue(2));
								buttonHandler("You dive into the pile of papers on your desk.");
							}}>
							Read Papers
						</button>
						<button
							onClick={() => {
								setDomainKnowledge(domainKnowledge + randomValue(3));
								setSocialKnowledge(socialKnowledge + randomValue(10));
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
								onClick={() => {
									buttonHandler(
										"You sit down to consider the potential social implications of your research idea. How can this work benefit society?"
									);
									setSocialKnowledge(randomValue(3, 3));
								}}>
								Consider Social Implications
							</button>
							<button
								onClick={() => {
									buttonHandler(
										"Research is not always ethical. You think about the ways how the research process and implications could be harmful, and seek ways to prevent itd."
									);
									setEthicsKnowledge(randomValue(3, 2));
								}}>
								Consider Ethical Implications
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
										buttonHandler("You need some more time to develop this idea.");
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
									inventory.status.IRBWaiting ||
									inventory.status.IRBRecieved ||
									inventory.countables.researchQuestion === 0
								}
								onClick={() => {
									buttonHandler("You have submitted your IRB. Fingers Crossed.");
									setInventory({ ...inventory, status: { ...inventory.status, IRBWaiting: true } });
									setIRBCounter(randomValue(3, randomValue(3, 1)));
									setIRBTimes(irbCounter + 1);
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

											inventory,
											setInventory,
											setQualCounter,
											setQuantCounter
										)
									);
								}}>
								Select Method
							</button>
							{inventory.booleans.qualMethod && (
								<button
									disabled={inventory.status.studyRunning || !inventory.status.usingQual}
									onClick={() => {
										setModalActive(true);

										setModalContent(
											SelectQual(
												buttonHandler,
												setModalActive,
												inventory,
												setInventory,
												setQualCounter,
												qualCounter
											)
										);
									}}>
									Choose Qualitative Method
								</button>
							)}
							{inventory.booleans.quantMethod && (
								<button
									disabled={inventory.status.studyRunning || !inventory.status.usingQuant}
									onClick={() => {
										setModalActive(true);

										setModalContent(
											SelectQuant(
												buttonHandler,
												setModalActive,
												inventory,
												setInventory,
												setQuantCounter,
												quantCounter
											)
										);
									}}>
									Choose Quantitative Method
								</button>
							)}
							<button
								disabled={inventory.status.studyRunning || !inventory.status.IRBRecieved}
								onClick={() => {
									buttonHandler("You begin to run your study.");
									if (inventory.status.methodSelected === "Qualitative") {
										setStudyCounter(qualCounter);
									} else if (inventory.status.methodSelected === "Quantitative") {
										setStudyCounter(quantCounter);
									} else if (inventory.status.methodSelected === "Mixed Methods") {
										setStudyCounter(qualCounter + quantCounter);
									} else {
										buttonHandler("You were unable to run your study.", true);
										return;
									}

									setInventory({
										...inventory,
										status: { ...inventory.status, studyRunning: true },
									});
								}}>
								Run Study
							</button>
							{inventory.status.studyRunning && (
								<button
									onClick={() => {
										setStudyCounter(studyCounter - 1);
										buttonHandler("You put in more effort into running the study.");
									}}>
									Work on Study
								</button>
							)}
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
				{showSection[2] && (
					<div className="section" id="Outreach">
						<div className="section-title title">Outreach</div>
						<div className="button-wrapper">
							<button
								disabled={inventory.countables.studyResults === 0 || inventory.status.paperWriting}
								onClick={() => {
									buttonHandler("You start writing up the paper based on your results.");
									setPaperCounter(randomValue(6, 3));
									setInventory({
										...inventory,
										status: { ...inventory.status, paperWriting: true },
									});
								}}>
								Write paper
							</button>
							<button
								disabled={inventory.countables.draftPapers === 0}
								onClick={() => {
									buttonHandler(
										"You need to choose a venue to which you want to publish your work.",
										true
									);

									setModalActive(true);
									setModalContent(
										SelectVenue(buttonHandler, setModalActive, inventory, setInventory)
									);
								}}>
								Select Venue
							</button>
							<button
								disabled={inventory.countables.draftPapers === 0 || submissionCounter > 0}
								onClick={() => {
									let [range, min] = [0, 0];

									if (inventory.status.venueSelected === "Conference") {
										[range, min] = [2, 3];
									} else if (inventory.status.venueSelected === "Journal") {
										[range, min] = [8, 2];
									} else {
										buttonHandler("You need to select a venue that to submit your paper to.", true);
										return;
									}

									buttonHandler(
										"You submit your draft to a " +
											inventory.status.venueSelected +
											". Let's hope it gets accepted."
									);

									setSubmissionCounter(randomValue(range, min));
								}}>
								Submit Paper
							</button>

							{inventory.countables.conferencePapers + inventory.countables.journalPapers > 1 && (
								<button
									onClick={() => {
										socialMediaLogic();
									}}>
									Post on Social Media
								</button>
							)}
							{inventory.countables.conferencePapers + inventory.countables.journalPapers > 3 && (
								<button
									onClick={() => {
										buttonHandler(
											"Writing a book about your research seems like a good way to share knowledge"
										);
									}}>
									Write Book
								</button>
							)}
						</div>
					</div>
				)}
			</div>

			<div id="inventory">
				{showSection[0] && (
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
						<div className="inventory-item">
							<div className="inventory-item-name">Draft Papers</div>
							<div className="inventory-item-value">{inventory.countables.draftPapers}</div>
						</div>
						{inventory.countables.conferencePapers > 0 && (
							<div className="inventory-item">
								<div className="inventory-item-name">Conference Papers</div>
								<div className="inventory-item-value">{inventory.countables.conferencePapers}</div>
							</div>
						)}
						{inventory.countables.journalPapers > 0 && (
							<div className="inventory-item">
								<div className="inventory-item-name">Journal Papers</div>
								<div className="inventory-item-value">{inventory.countables.journalPapers}</div>
							</div>
						)}
					</div>
				)}

				{showSection[1] && (
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
							{inventory.status.usingQual ? (
								inventory.status.usingQuant ? (
									<div className="inventory-item-value">Mixed Methods</div>
								) : (
									<div className="inventory-item-value">Qualitative</div>
								)
							) : (
								<div className="inventory-item-value">Quantitative</div>
							)}
						</div>
						<div className="inventory-item">
							<div className="inventory-item-name">Venue</div>
							<div className="inventory-item-value">{inventory.status.venueSelected}</div>
						</div>
						{inventory.status.studyRunning && (
							<div className="inventory-item">Study in Progress</div>
						)}
					</div>
				)}

				{showSection[2] && (
					<div className="inventory-section">
						<div className="inventory-title title">Public Outreach</div>
						<div className="inventory-item">
							<div className="inventory-item-name">Citations</div>
							<div className="inventory-item-value">{inventory.outreach.citations}</div>
						</div>
						<div className="inventory-item">
							<div className="inventory-item-name">Followers</div>
							<div className="inventory-item-value">{inventory.outreach.followers}</div>
						</div>
					</div>
				)}
			</div>
			{modalActive && <Modal setModalActive={setModalActive} modalContent={modalContent}></Modal>}
		</div>
	);
};

export default Sim;
