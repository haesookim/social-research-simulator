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
							qualitative: methodKnowledge.qualitative + randomValue(5, 3),
						});
					}}>
					Qualitative Methods
				</button>
				<button
					onClick={() => {
						select("You decide to study more on quantitative methods.");
						setMethodKnowledge({
							...methodKnowledge,
							quantitative: methodKnowledge.quantitative + randomValue(5, 3),
						});
					}}>
					Quantitative Methods
				</button>
			</div>
		</div>
	);
};

const SelectMethods = (
	buttonHandler,
	setModalActive,
	inventory,
	setInventory,
	setQualCounter,
	setQuantCounter
) => {
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
						setQualCounter(randomValue(6, 6));
						setInventory({
							...inventory,
							status: {
								...inventory.status,
								methodSelected: "Qualitative",
								usingQuant: false,
								usingQual: true,
							},
						});
					}}>
					Qualitative Methods
				</button>
				<button
					onClick={() => {
						select("You decide it would be best if you use quantitative methods.");
						setQuantCounter(randomValue(6, 3));
						setInventory({
							...inventory,
							status: {
								...inventory.status,
								methodSelected: "Quantitative",
								usingQual: false,
								usingQuant: true,
							},
						});
					}}>
					Quantitative Methods
				</button>

				<button
					onClick={() => {
						select(
							"Doing more work is obvious solution. You decide that mixed methods is the way."
						);
						setQualCounter(randomValue(6, 6));
						setQuantCounter(randomValue(6, 3));
						setInventory({
							...inventory,
							status: {
								...inventory.status,
								methodSelected: "Mixed Methods",
								usingQual: true,
								usingQuant: true,
							},
						});
					}}>
					Mixed Methods
				</button>
			</div>
		</div>
	);
};

const SelectQual = (
	buttonHandler,
	setModalActive,
	inventory,
	setInventory,
	setStudyCounter,
	studyCounter
) => {
	const select = (message) => {
		buttonHandler(message);
		setModalActive(false);
	};

	return (
		<div className="modal-content">
			<div className="modal-title title">Design Your Study</div>
			<div className="modal-message">
				Based on your knowledge of qualitative methods, you think about how exactly you want to run
				the study.
				<br />
				<br />
				What method or design do you want to use?
			</div>

			<div className="button-wrapper">
				<button
					onClick={() => {
						select("You decide to run an ethnographic study.");
						setInventory({
							...inventory,
							status: { ...inventory.status, qualSelected: "Ethnography" },
						});
						setStudyCounter(randomValue(6, 12));
					}}>
					Ethnography
				</button>
				<button
					onClick={() => {
						select("You decide to run an interview study.");
						setInventory({
							...inventory,
							status: { ...inventory.status, qualSelected: "Interview" },
						});
						setStudyCounter(randomValue(4, 3));
					}}>
					Interview Study
				</button>

				<button
					onClick={() => {
						select("You decide to conduct a focus group interview.");
						setInventory({
							...inventory,
							status: { ...inventory.status, qualSelected: "Focus Group" },
						});
						setStudyCounter(randomValue(4, 2));
					}}>
					Focus Group
				</button>
			</div>
		</div>
	);
};

const SelectQuant = (
	buttonHandler,
	setModalActive,
	inventory,
	setInventory,
	setStudyCounter,
	studyCounter
) => {
	const select = (message) => {
		buttonHandler(message);
		setModalActive(false);
	};

	return (
		<div className="modal-content">
			<div className="modal-title title">Design Your Study</div>
			<div className="modal-message">
				Based on your knowledge of quantitative methods, you think about how exactly you want to run
				the study.
				<br />
				<br />
				What method or design do you want to use?
			</div>

			<div className="button-wrapper">
				<button
					onClick={() => {
						select("You decide to run a computational analysis.");
						setInventory({
							...inventory,
							status: { ...inventory.status, quantSelected: "Computational Analysis" },
						});
						setStudyCounter(randomValue(6, 12));
					}}>
					Computational Analysis
				</button>
				<button
					onClick={() => {
						select("You decide to run an survey.");
						setInventory({
							...inventory,
							status: { ...inventory.status, quantSelected: "Survey" },
						});
						setStudyCounter(randomValue(4, 3));
					}}>
					Survey
				</button>

				<button
					onClick={() => {
						select("You decide to conduct an experiment.");
						setInventory({
							...inventory,
							status: { ...inventory.status, quantSelected: "Experiment" },
						});
						setStudyCounter(randomValue(4, 6));
					}}>
					Experiment
				</button>
			</div>
		</div>
	);
};

const SelectVenue = (buttonHandler, setModalActive, inventory, setInventory) => {
	const select = (message) => {
		buttonHandler(message);
		setModalActive(false);
	};

	return (
		<div className="modal-content">
			<div className="modal-title title">Select Venue for Paper</div>
			<div className="modal-message">
				You need to choose a venue to which you want to publish your work.
				<br />
				<br />
				Where do you want to submit your paper?
			</div>

			<div className="button-wrapper">
				<button
					onClick={() => {
						select("You decide to submit your work to a conference.");
						setInventory({
							...inventory,
							status: { ...inventory.status, venueSelected: "Conference" },
						});
					}}>
					Conference
				</button>
				<button
					onClick={() => {
						select("You decide to submit your work to a journal.");
						setInventory({
							...inventory,
							status: { ...inventory.status, venueSelected: "Journal" },
						});
					}}>
					Journal
				</button>
			</div>
		</div>
	);
};

const FakeResults = (
	buttonHandler,
	setModalActive,
	inventory,
	setInventory,
	unethicalCounter,
	setUnethicalCounter
) => {
	const select = (message) => {
		buttonHandler(message);
		setModalActive(false);
	};

	return (
		<div className="modal-content">
			<div className="modal-title title">Ethical Conundrum</div>
			<div className="modal-message">
				You realize that there was a critical error in your data collection process, and that your
				results are all useless. You could start again, but it will take a long time.
				<br />
				<br />
				How do you want to proceed?
			</div>

			<div className="button-wrapper">
				<button
					onClick={() => {
						select(
							"You ignored the problem and finished writing the paper. Nobody's going to know."
						);
						setInventory({
							...inventory,
							countables: {
								...inventory.countables,
								studyResults: inventory.countables.studyResults - 1,
								draftPapers: inventory.countables.draftPapers + 1,
							},
							status: { ...inventory.status, paperWriting: false },
						});
						setUnethicalCounter(unethicalCounter + 1);
					}}>
					Ignore the Problem
				</button>
				<button
					onClick={() => {
						select("There's nothing you can do. Back to the lab it is.");
						setInventory({
							...inventory,
							countables: {
								...inventory.countables,
								studyResults: inventory.countables.studyResults - 1,
							},
							status: { ...inventory.status, paperWriting: false },
						});
					}}>
					Trash the Data and Start Over
				</button>
			</div>
		</div>
	);
};

const Cancelled = (
	buttonHandler,
	setModalActive,
	unethicalCounter,
	setUnethicalCounter,
	inventory,
	setInventory
) => {
	const select = (message) => {
		buttonHandler(message);
		setModalActive(false);
	};

	return (
		<div className="modal-content">
			<div className="modal-title title">#Cancelled</div>
			<div className="modal-message">
				Someone posts on social media calling you out on your unethical research practices: deep
				down, you know it's true. You just never thought anyone would find out.
				<br />
				<br />
				There really isn't much you can do.
			</div>

			<div className="button-wrapper">
				<button
					onClick={() => {
						select(
							"There's nothing you can do. You gracefully accept the fallout to the best of your ability."
						);
						setUnethicalCounter(unethicalCounter - 1);
						setInventory({
							...inventory,
							outreach: {
								...inventory.outreach,
								followers:
									inventory.outreach.followers - randomValue(inventory.outreach.followers / 3),
							},
						});
					}}>
					Oh no
				</button>

				<button
					onClick={() => {
						select(
							"Despite your better judgement, you throw a tantrum on social media. It did not go well."
						);
						setInventory({
							...inventory,
							outreach: {
								...inventory.outreach,
								followers: randomValue(inventory.outreach.followers / 3),
							},
						});
					}}>
					This is a conspiracy!
				</button>
			</div>
		</div>
	);
};

export {
	Modal,
	LearnMethods,
	SelectMethods,
	SelectVenue,
	FakeResults,
	SelectQual,
	SelectQuant,
	Cancelled,
};
